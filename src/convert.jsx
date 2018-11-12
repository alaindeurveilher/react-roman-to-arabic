import React, { Component } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import './convert.css';

class Convert extends Component {
  state = {
    romanDictionnary: {},
    roman: '',
    romanErrorMessage: '',
    arabic: '',
    arabicErrorMessage: ''
  }

  romanNumbers = 'IVXLCDM';
  allowedRegExp = /^[IVXLCDM]+$/i;

  arabicGetDivisibleBy = (value, romChar, arabRange) => {
    const replicant = Math.floor(value / arabRange);
    const convert = romChar.repeat(Math.floor(value / arabRange));
    const remain = value - replicant * arabRange;
    return {convert, remain};
  };

  specialRomanRules = (roman) => {
    let transformed = roman;
    transformed = transformed.replace('DCCCC', 'CM'); // 900
    transformed = transformed.replace('CCCC', 'CD'); // 400
    transformed = transformed.replace('LXXXX', 'XC'); // 90
    transformed = transformed.replace('XXXX', 'XL'); // 40
    transformed = transformed.replace('VIIII', 'IX'); // 9
    transformed = transformed.replace('IIII', 'IV'); // 4
    return transformed;
  };

  arabicConvert = (value) => {
    let data = {
      convert: '',
      remain: parseInt(value)
    };
    let result = '';

    data = this.arabicGetDivisibleBy(data.remain, 'M', 1000);
    result += data.convert;
    data = this.arabicGetDivisibleBy(data.remain, 'D', 500);
    result += data.convert;
    data = this.arabicGetDivisibleBy(data.remain, 'C', 100);
    result += data.convert;
    data = this.arabicGetDivisibleBy(data.remain, 'L', 50);
    result += data.convert;
    data = this.arabicGetDivisibleBy(data.remain, 'X', 10);
    result += data.convert;
    data = this.arabicGetDivisibleBy(data.remain, 'V', 5);
    result += data.convert;
    data = this.arabicGetDivisibleBy(data.remain, 'I', 1);
    result += data.convert;

    return this.specialRomanRules(result);
  };

  initRomanDictionnary = () => {
    const max = 5000;
    const romanDictionnary = {};
    for (let i = 1; i < max; i++) {
      const roman = this.arabicConvert(i);
      romanDictionnary[roman] = i;
    }
    this.setState({romanDictionnary});
  };

  errorMessage = (message) => {
    if (!!message) return <Message severity="error" text={message} />;
    return null;
  };

  invalidRomanNumber = (input) => {
    let error = 'This is not a valid Roman number.';
    const transformed = this.specialRomanRules(input);
    if (transformed in this.state.romanDictionnary) error = `${error} Did you mean '${transformed}' instead?`;

    return error;
  };

  handleChangeRoman = (e) => {
    const input = e.target.value.toUpperCase();
    const roman = input;
    let arabic = '';
    let romanErrorMessage = '';

    if (!input.trim()) return this.setState({roman: '', arabic, romanErrorMessage});;

    if (!this.allowedRegExp.test(input)) romanErrorMessage = `Only ${this.romanNumbers} are valid.`;
    
    if (!(input in this.state.romanDictionnary)) romanErrorMessage = this.invalidRomanNumber(input);
    else arabic = this.state.romanDictionnary[roman];

    this.setState({roman, arabic, romanErrorMessage});
  };

  handleChangeArabic = (e) => {
    const value = e.target.value;
    let arabic = parseInt(value);
    let roman = '';
    let arabicErrorMessage = '';

    if (!value) arabic = '';
    else if (arabic < 0 || arabic >= 5000) arabicErrorMessage = 'Only positive number lower than 5000 are allowed.';
    else roman = this.arabicConvert(arabic);

    this.setState({arabic, roman, arabicErrorMessage});
  };

  componentDidMount() {
    this.initRomanDictionnary();
  }

  render() { 
    return (
      <Card title="Convertion" subTitle="Roman <-> Arabic">
        <div className="p-grid p-justify-between p-fluid app-converter">
          <div className="p-col-3">
            <span className="p-float-label">
              <InputText
                id="roman"
                className={{'p-error': !!this.state.romanErrorMessage}}
                value={this.state.roman}
                onChange={this.handleChangeRoman}
                keyfilter={this.allowedRegExp}
              />
              <label htmlFor="roman">Roman</label>
            </span>
            {this.errorMessage(this.state.romanErrorMessage)}
          </div>
          <div className="p-col-1">
            <span className="pi pi-pw pi-chevron-left"></span>
            <span className="pi pi-pw pi-minus"></span>
            <span className="pi pi-pw pi-chevron-right"></span>
          </div>
          <div className="p-col-3">
            <span className="p-float-label">
              <InputText
                id="arabic"
                className={{'p-error': !!this.state.arabicErrorMessage}}
                value={this.state.arabic}
                onChange={this.handleChangeArabic}
                keyfilter="pint"
              />
              <label htmlFor="arabic">Arabic</label>
            </span>
            {this.errorMessage(this.state.arabicErrorMessage)}
          </div>
        </div>
      </Card>
    );
  }
}
 
export default Convert;