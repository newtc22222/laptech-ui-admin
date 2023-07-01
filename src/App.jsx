import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import AppRoute from './routes';

import AppProvider from './components/context/AppContext';

/**
 * @since 2022-12-23
 */

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppProvider>
          <AppRoute />
        </AppProvider>
      </Router>
    </Provider>
  );
};

export default App;
