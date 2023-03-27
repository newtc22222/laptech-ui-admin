import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import router from './routes';

import AppProvider from './components/context/AppContext';

import './styles/css/laptech.css';

/**
 * @since 2022-12-23
 */

const App = () => {
  return (
    <Provider store={store}>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </Provider>
  );
};

export default App;
