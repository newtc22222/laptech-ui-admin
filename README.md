# LAPTECH UI **ADMIN**

## Project Overview

- Name: **Laptech UI Administrator System**
- Author: [Nhật Phi Võ](https://www.facebook.com/fi.fine.21/)
- Collaborator: [Quang Sang Nguyễn](https://www.facebook.com/quangsang2001)
- Main tech: **Webpack**, **ReactJS**, **Redux**, **Bootstrap**

### Build and run project

1. Install this project in zip and unzip it, or just clone with git
2. Open project with your IDE (I recommend **Visual Studio Code**)
3. Open Terminal in root folder and run `npm install`
4. Run project with command `npm start`

**NOTE**: This project need to run with api in server. You can find [`here`](#another-resources)

**OPTION**: You can build with `npm run build` and use file in folder **build**

### Dependencies

| package                                                                               | type                    | description                                                  |
| ------------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------ |
| [**react**](https://beta.reactjs.org/reference/react)                                 | `main` - ui             | main ui build and control                                    |
| [**react-dom**](https://reactjs.org/docs/react-dom.html)                              | `main` - ui             | render ui in browser                                         |
| [**react-router-dom**](https://reactrouter.com/en/main)                               | `main` - router         | navigate and routing                                         |
| [**react-redux**](https://www.npmjs.com/package/react-redux)                          | `main` - manager        | _state managerment_ instead of `React`                       |
| [**@reduxjs/toolkit**](https://www.npmjs.com/package/@reduxjs/toolkit)                | support - manager       | create **slide** for **redux**                               |
| [**bootstrap**](https://www.npmjs.com/package/bootstrap)                              | `main` - ui - css       | **css library** of `bootstrap`                               |
| [**react-bootstrap**](https://react-bootstrap.github.io/)                             | `main` - ui - framework | using **Component** of `bootstrap` in `React`                |
| [**bootstrap-icons**](https://icons.getbootstrap.com/)                                | `main` - ui - icon      | using **icons** of `bootstrap`                               |
| [**@popperjs/core**](https://www.npmjs.com/package/@popperjs/core)                    | `main` - support        | using `bootstrap` js bundle                                  |
| [**lodash**](https://www.npmjs.com/package/lodash)                                    | _option_ - support      | a lots of function deal with _array_ and _object_            |
| [**react-bootstrap-typeahead**](https://ericgio.github.io/react-bootstrap-typeahead/) | _option_ - support      | select Component with custom multiple choice                 |
| [**react-hook-form**](https://react-hook-form.com/)                                   | _option_ - system       | create **validation** for `form`                             |
| [**react-quill**](https://www.npmjs.com/package/react-quill)                          | _option_ - system       | build basic **text editor**                                  |
| [**react-toastify**](https://www.npmjs.com/package/react-toastify)                    | _option_ - system       | create **notification**                                      |
| [**react-apexchart**](https://www.npmjs.com/package/react-apexcharts)                 | _option_ - system       | build figures with image                                     |
| [**classnames**](https://www.npmjs.com/package/classnames)                            | _option_ - system       | make **string** form multiple objects for option `className` |
| [**prop-types**](https://www.npmjs.com/package/prop-types)                            | _option_ - system       | create constraint for `React props`                          |
| [**_typescipt_**](https://www.npmjs.com/package/typescript)                           | _option_ - support      | create constraint for `js` (and `jsx` file)                  |

### Dev-dependencies

| package                    | type                | description |
| -------------------------- | ------------------- | ----------- |
| **@babel/core**            | main - convert      |
| **@babel/preset-env**      | main - build        |
| **@babel/preset-react**    | main - build        |
| **babel-loader**           | main - build        |
| **html-webpack-plugin**    | `webpack` - build   |
| **css-loader**             | `webpack` - build   |
| **sass-loader**            | `webpack` - build   |
| **style-loader**           | `webpack` - build   |
| **webpack**                | `webpack` - main    |
| **webpack-cli**            | `webpack` - support |
| **webpack-dev-server**     | `webpack` - support |
| **prettier**               | main - format       |
| **eslint-config-prettier** | support - format    |
| **eslint-plugin-prettier** | support - inspect   |
| **jest**                   | test - main         |
| **babel-jest**             | test - build        |
| **react-test-renderer**    | test - `React`      |

## Main Resources

- [Document](https://drive.google.com/drive/folders/1QeuA0jng2ANcQ92gs_uupGr8-Ka_bMli?usp=sharing)
- [Diagram]()

## Another Resources

- [**Laptech API (JDBC - MySQL)**](https://github.com/newtc22222/laptech-rest-api-jdbc)
- [Laptech API (JPA - MySQL)](https://github.com/newtc22222/laptech-rest-api-jpa)
- [**Laptech UI Customer**](https://github.com/newtc22222/laptech-ui-customer)
- [**Laptech UI Mobile**](https://github.com/newtc22222/laptech-ui-mobile)
