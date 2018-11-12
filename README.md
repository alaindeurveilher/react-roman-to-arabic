# React Roman <-> Arabic

Converts a Roman number into its Arabic number, and vice-versa

## Motivation

This project was part a challenge set with some friends and collegue to build the best Roman number to Arabic converter.

## Limitation

 Only numbers in a range of 1 to 4999 are supported

 ## Principle

My solution is based on the construction of a dictionnary of Roman numbers from numeric Arabic numbers. Typed in Roman numbers are then searched in that dictionnary.

All the algorithm is included in the [convert.jsx](./src/convert.jsx) file.

## Implemented rules

1. Only the following characters are allowed: `IVXLCDM`
1. To build the dictionnary, a for loop from `1` to `4999` is used
1. To transform the Arabic number into Roman we divide first by `1000`, then `500`, `100`, `50`, `10`, `5` and finally by `1`
1. For each step, for the number of times the number is divisible we replace by the corresponding Roman letter:
  1. `1000` -> `M`
  1. `500` -> `D`
  1. `100` -> `C`
  1. `50` -> `L`
  1. `10` -> `X`
  1. `5` -> `V`
  1. `1` -> `I`
1. After that some convertion rules are applied, because in Roman numbers, sometimes a substraction is written. For instance instead of writting four like this `IIII` Roman writes **five minus one** like this `IV`.
1. The convertion from Roman number to Arabic is then just checking its existence in the dictionnary

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
