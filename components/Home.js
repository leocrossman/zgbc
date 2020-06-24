import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import * as firebase from 'firebase';
import 'firebase/auth';
import config from '../firebaseCredentials';
import { NavigationEvents } from 'react-navigation';
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const employeeList = require('../EmployeeInfo.json');

// import './components/Loading';
// import Loading from './Loading';

const _storeData = async (data) => {
  try {
    // data is email here
    if (data) {
      await AsyncStorage.setItem('userEmail', data);
      console.log(`AsyncStorage data "${data}" set successfuly.`);
    } else {
      alert('Please enter your ZGBC email.');
    }
  } catch (error) {
    console.log('Something went wrong storing the data...\n', error);
  }
};

const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('userEmail');
    if (value !== null) {
      // We have data!!
      console.log(`Here is the retreived data: ${value}`);
      return value;
    }
    return '';
  } catch (error) {
    console.log('Something went wrong getting the data...\n', error);
  }
};

// check if email is a valid ZGBC email
function validateName(email) {
  for (let i = 0; i < employeeList.length; i++) {
    if (employeeList[i].Email === email) {
      return true;
    }
  }
  return false;
}

// get the firstname associated with a valid ZGBC email
function getName(email) {
  for (let i = 0; i < employeeList.length; i++) {
    if (employeeList[i].Email === email) {
      return employeeList[i].FirstName;
    }
  }
}

(async () => {
  if (await _retrieveData()) {
    let storedEmail = await _retrieveData();
    console.log('the stored email is: ', storedEmail);
    const isKnown = validateName(storedEmail);
    console.log(isKnown);
  }
})();

function Home({ navigation }) {
  console.log(navigation);
  // state hook declarations
  const [email, setEmail] = useState('');

  let emailIsValid = validateName(email);
  console.log('emailIsValid:', emailIsValid);

  const login = async (email) => {
    if (validateName(email)) {
      // store the email
      await _storeData(email);
      // take them to the next page here!
      // alert(`Hello ${getName(email)}.`);
      navigation.navigate('Symptoms');
    } else {
      alert('Please enter a valid ZGBC email.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        // resizeMode='cover'
        // source={require('./assets/ZG_1024x1024.t.png')}
        source={require('../assets/ZGBC_logo.png')}
      ></Image>
      <Text style={styles.title}>Welcome to the ZGBC App</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid='transparent'
        placeholder='Email'
        placeholderTextColor='black'
        autoCapitalize='none'
        onChangeText={(text) => setEmail(text)}
        value={email}
        onSubmitEditing={() => login(email)}
        returnKeyType='done'
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          login(email);
        }}
      >
        <Text style={styles.submitButtonText}> Check in </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    // justifyContent: 'center',
    margin: 15,
    padding: 8,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
  },
  submitButton: {
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: 10,
    margin: 15,
    alignItems: 'center',
    height: 40,
  },
  submitButtonText: {
    color: 'white',
  },
  title: {
    fontSize: 25,
    padding: 40,
    textAlign: 'center',
    // marginTop: 50,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  logo: {
    // flex: 1,
    width: null,
    height: 200,
    resizeMode: 'contain',
    margin: 10,
    // borderColor: 'black',
    // borderWidth: 5,
    // backgroundColor: 'orange',
  },
});

export default Home;
