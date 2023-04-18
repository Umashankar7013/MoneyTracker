/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';

const ReduxedApp = () => (
  <Provider {...{store}}>
    <App />
  </Provider>
);
AppRegistry.registerComponent(appName, () => ReduxedApp);
