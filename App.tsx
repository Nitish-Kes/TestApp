import React, { useEffect } from 'react';
import Navigation from './src/navigation';
import { Provider } from 'react-redux';
import store from './src/store';
import { LogBox } from 'react-native';

function App(): React.JSX.Element {

  useEffect(()=>{
    LogBox.ignoreAllLogs();
  },[])


  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  );
}

export default App;
