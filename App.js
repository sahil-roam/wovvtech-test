/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableHighlight, Platform
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { useState, useEffect } from 'react';
import Roam from 'roam-reactnative';



function App(){
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [userId, setUserId] = useState('')
  const [response, setResponse] = useState('Response: ')

  useEffect(() => {
    if(Platform.OS === 'android'){
      Roam.allowMockLocation(true)
      Roam.disableBatteryOptimization()
      
    }
    Roam.offlineLocationTracking(true)
    
  }, [])

  

  const permissionRequest = () => {
    Roam.requestLocationPermission()
  }

  const createUser = () => {
    Roam.createUser('test User', success => {
      console.log(JSON.stringify(success))
      setUserId(success.userId)
      setResponse('User Response: '+JSON.stringify(success))
    }, error => {
      setResponse('User Response: '+JSON.stringify(error))
      console.log(JSON.stringify(error))
    })
  }

  const getUser = () => {
    Roam.getUser(userId, success => {
      console.log(JSON.stringify(success))
      setUserId(success.userId)
      setResponse('User Response: '+JSON.stringify(success))
    }, error => {
      setResponse('User Response: '+JSON.stringify(error))
      console.log(JSON.stringify(error))
    })
  }

  const toggleListener = () => {
    Roam.toggleListener(true, true, success => {
      console.log(JSON.stringify(success))
      setResponse(JSON.stringify(success))
      Roam.subscribe('LOCATION', userId)
    }, error => {
      console.log(JSON.stringify(error))
      setResponse(JSON.stringify(error))
    })
  }


  const startTracking = () => {
    if(Platform.OS === 'android'){
      Roam.setForegroundNotification(true,
        "Wovvtech Issue",
        "Testing app",
        "mipmap/ic_launcher",
        "com.wovvtechissue.MainActivity",
        "com.wovvtechissue.LocationService"
        )
      Roam.startTrackingTimeInterval(5, Roam.DesiredAccuracy.HIGH);
    } else {
      Roam.startTrackingCustom(
        true,
        false,
        Roam.ActivityType.FITNESS,
        Roam.DesiredAccuracyIOS.BEST,
        true,
        0,
        100,
        5
      );
    }
    Roam.publishAndSave(null);
  }

  const stopTracking = () => {
    // Roam.setForegroundNotification(false,
    //   "Wovvtech Issue",
    //   "Testing app",
    //   "mipmap/ic_launcher",
    //   "com.wovvtechissue.MainActivity",
    //   "com.wovvtechissue.LocationService"
    //   )
    Roam.stopTracking();
  }

  const unsubscribe = () => {
    Roam.unSubscribe('LOCATION', userId)
  }




  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        
        <TouchableHighlight
        style={styles.button}
        onPress={() => permissionRequest()}
        >
          <Text style={styles.text}>Location Permission</Text>
        </TouchableHighlight>

        <Text style={styles.sectionDescription}>User id: {userId}</Text>


        <Text style={styles.sectionDescription}>{response}</Text>

        <View
        style={styles.line}
        />

        <Text style={styles.sectionTitle}>Case 1</Text>
        <Text style={styles.sectionDescription}>Create User -&gt; Toggle listener {'&'} Subscribe -&gt; Start Tracking -&gt; Tracking running -&gt; Stop tracking -&gt; get user -&gt; start tracking -&gt; Toggle listener {'&'} subscribe {'\n'} Location coming twice {'\n'} Check location count</Text>
        
        
        <TouchableHighlight
        style={styles.button}
        onPress={() => createUser()}
        >
          <Text style={styles.text}>Create User</Text>
        </TouchableHighlight>

        <TouchableHighlight
        style={styles.button}
        onPress={() => getUser()}
        >
          <Text style={styles.text}>Get User</Text>
        </TouchableHighlight>
        
        <TouchableHighlight
        style={styles.button}
        onPress={() => toggleListener()}
        >
          <Text style={styles.text}>Toggle listener {'&'} Subscribe</Text>
        </TouchableHighlight>

        <TouchableHighlight
        style={styles.button}
        onPress={() => startTracking()}
        >
          <Text style={styles.text}>Start Tracking</Text>
        </TouchableHighlight>

        <TouchableHighlight
        style={styles.button}
        onPress={() => stopTracking()}
        >
          <Text style={styles.text}>Stop Tracking</Text>
        </TouchableHighlight>

        <View style={styles.line} />

        <Text style={styles.sectionTitle}>Case 2</Text>
        <Text style={styles.sectionDescription}>Create User -&gt; Toggle listener {'&'} Subscribe -&gt; Start Tracking -&gt; Tracking running -&gt; Stop tracking -&gt; Unsubscribe -&gt; get user -&gt; start tracking -&gt; Toggle listener {'&'} subscribe  {'\n'} Check if location coming</Text>
        
        <TouchableHighlight
        style={styles.button}
        onPress={() => createUser()}
        >
          <Text style={styles.text}>Create User</Text>
        </TouchableHighlight>

        <TouchableHighlight
        style={styles.button}
        onPress={() => getUser()}
        >
          <Text style={styles.text}>Get User</Text>
        </TouchableHighlight>
        
        <TouchableHighlight
        style={styles.button}
        onPress={() => toggleListener()}
        >
          <Text style={styles.text}>Toggle listener {'&'} Subscribe</Text>
        </TouchableHighlight>

        <TouchableHighlight
        style={styles.button}
        onPress={() => startTracking()}
        >
          <Text style={styles.text}>Start Tracking</Text>
        </TouchableHighlight>

        <TouchableHighlight
        style={styles.button}
        onPress={() => stopTracking()}
        >
          <Text style={styles.text}>Stop Tracking</Text>
        </TouchableHighlight>
        
        <TouchableHighlight
        style={styles.button}
        onPress={() => unsubscribe()}
        >
          <Text style={styles.text}>Unsubscribe</Text>
        </TouchableHighlight>


        

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    marginVertical: 20,
    fontWeight: 'bold',
    marginHorizontal: 20
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  
  button: {
    height: 40,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#646FD4',
    marginVertical: 20,
  },
  text: {
    fontSize: 16,
    color: 'white',
    
  },
  response: {
    width: '80%',
    alignSelf: 'center',
    marginVertical: 20
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: 'black',
    marginTop: 30,
  }
});

export default App;
