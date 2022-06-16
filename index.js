/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { UpdateLocation } from './App';
import Roam from 'roam-reactnative';

function registerListener(){
    console.log('index register')
    Roam.startListener('location', locations => {
        console.log(JSON.stringify(locations))
        //UpdateLocation({location: JSON.stringify(locations)})
      })
    
}

AppRegistry.registerHeadlessTask('RoamHeadlessService', registerListener())
AppRegistry.registerComponent(appName, () => App);
