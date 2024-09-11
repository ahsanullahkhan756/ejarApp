import React, { useEffect } from 'react';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import MainNavigation from './src/navigation/MainNavigation';
import { I18nManager } from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};

export default App;
