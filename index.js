/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { DesignSystem } from './src/constants';

DesignSystem.configure()

AppRegistry.registerComponent(appName, () => App);
