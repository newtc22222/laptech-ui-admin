# LAPTECH UI **ADMIN**

## Project Overview

- Name: **Laptech UI Administrator System**
- Author: [Nhật Phi Võ](https://www.facebook.com/fi.fine.21/)
- Collaborator: [Quang Sang Nguyễn](https://www.facebook.com/quangsang2001)
- Main tech: **Webpack**, **ReactJS**, **Redux**, **Bootstrap**, **React-table**

### Build and run project

1. Install this project in zip and unzip it, or just clone with git
2. Open project with your IDE (I recommend **Visual Studio Code**)
3. Open Terminal in root folder and run `npm install`
4. Run project with command `npm start`

**NOTE**: This project need to run with api in server. You can find [`here`](#another-resources)

**OPTION**: You can build with `npm run build` and use file in folder **build**

### Folder Structure

- public
- resources
- src
  - `apis`
  - `assets`
  - `components`
  - `config`
  - `hooks`
  - `pages`
  - `routes`
  - `services`
  - `store`
  - `styles`
  - `utils`
  - `App.jsx`
  - `index.js`
- `.editorconfig`
- `.gitignore`
- `.package.json`

## Project package

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
| [**react-hook-form**](https://react-hook-form.com/)                                   | _option_ - system       | create **validation** for `form`                             |
| [**react-day-picker**](https://ericgio.github.io/react-day-picker/)                   | _option_ - support      | select `date-time` Component                                 |
| [**react-bootstrap-typeahead**](https://ericgio.github.io/react-bootstrap-typeahead/) | _option_ - support      | select Component with `bootstrap` base                       |
| [**react-select**](https://www.npmjs.com/package/react-select)                        | _option_ - support      | Select Component with multiple choice and more features      |
| [**react-quill**](https://www.npmjs.com/package/react-quill)                          | _option_ - system       | build basic **text editor**                                  |
| [**react-table**](https://www.npmjs.com/package/react-table)                          | _option_ - system       | support build table with filter, sort, paging and more...    |
| [**react-toastify**](https://www.npmjs.com/package/react-toastify)                    | _option_ - system       | create **notification**                                      |
| [**chart.js**](https://www.npmjs.com/package/chart.js)                                | _option_ - system       | build figures with image                                     |
| [**react-chartjs-2**](https://www.npmjs.com/package/react-chartjs-2)                  | _option_ - system       | support Chart Component in React                             |
| [**classnames**](https://www.npmjs.com/package/classnames)                            | _option_ - system       | make **string** form multiple objects for option `className` |
| [**jwt-decode**](https://www.npmjs.com/package/jwt-decode)                            | _option_ - system       | decode jwt token to handle information                       |

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
- [Diagram](https://drive.google.com/drive/folders/1gxrdYrkOvd9DBtzYfW9iIXivY2u4qXmk?usp=sharing)

## Another Resources

- [**Laptech API (JDBC - MySQL)**](https://github.com/newtc22222/laptech-rest-api-jdbc)
- [Laptech API (JPA - MySQL)](https://github.com/newtc22222/laptech-rest-api-jpa)
- [**Laptech UI Client**](https://github.com/newtc22222/laptech-ui-client)
- [**Laptech UI Mobile**](https://github.com/newtc22222/laptech-ui-mobile)

## IMAGES

### Login page

![Login page](./resources/images/Login.png)

### Profile

![Profile](./resources/images/Profile.png)

### Dashboard

![Dashboard1](./resources/images/Dashboard1.png)
![Dashboard2](./resources/images/Dashboard2.png)

### Banner

![Banner Table](./resources/images/BannerPage.png)
![Banner Form](./resources/images/BannerForm.png)

### Brand

![Brand Table](./resources/images/BrandTable.png)
![Brand Form](./resources/images/BrandForm.png)

### Category

![Category Table](./resources/images/CategoryTable.png)
![Category Form](./resources/images/CategoryForm.png)

### Label

![Label Table](./resources/images/LabelTable.png)
![Label Form](./resources/images/LabelForm.png)

### Product

![Product Table](./resources/images/ProductTable.png)
![Product Form1](./resources/images/ProductForm1.png)
![Product Form2](./resources/images/ProductForm2.png)
![Product Image](./resources/images/ProductImageForm.png)
![Product Label](./resources/images/ProductLabelForm.png)
![Product Discount](./resources/images/ProductDiscountForm.png)

### Comment

![Comment List](./resources/images/CommentList.png)
![Comment Form](./resources/images/CommentReplyForm.png)

### Feedback

![Feedback List](./resources/images/FeedbackList.png)

### Import Product Ticket

![Import Product Table](./resources/images/ImportTable.png)
![Import Product Form](./resources/images/ImportForm.png)

### Order Ticket

![Order Table](./resources/images/OrderTable.png)
![Order View](./resources/images/OrderView.png)

### Import Product Ticket

![Import Product Table](./resources/images/ImportTable.png)
![Import Product Form](./resources/images/ImportForm.png)

### Role

![Role Table](./resources/images/RoleTable.png)

### User

![User Table](./resources/images/UserTable.png)
![User Form](./resources/images/UserForm.png)

# Confirm Dialog

![Confirm Dialog](./resources/images/ConfirmDialog.png)

# Statistic

![Statistic Product](./resources/images/StatisticProduct.png)
![Statistic Profits](./resources/images/StatisticProfits.png)
