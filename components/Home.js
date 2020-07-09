import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// import Geolocation from '@react-native-community/geolocation';

// Geolocation.getCurrentPosition((info) => console.log(info));

// look at this...
// docs.expo.io/versions/latest/sdk/location/

import * as firebase from 'firebase';
import 'firebase/auth';
import config from '../firebaseCredentials';

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const employeeList = require('../EmployeeInfo.json');

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

// grab passcode from super secret file
const { SECRET_PASS } = require('../SECRET_PASS.json');
function validatePass(pass) {
  return pass === SECRET_PASS;
}

// get the firstname associated with a valid ZGBC email
function getFirstName(email) {
  for (let i = 0; i < employeeList.length; i++) {
    if (employeeList[i].Email === email) {
      return employeeList[i].FirstName;
    }
  }
}

// get the firstname associated with a valid ZGBC email
function getLastName(email) {
  for (let i = 0; i < employeeList.length; i++) {
    if (employeeList[i].Email === email) {
      return employeeList[i].LastName;
    }
  }
}

const isLoggedIn = (email) => validateName(email);

function Home({ navigation }) {
  // state hook declarations
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [button, setButton] = useState(isLoggedIn);

  // let emailIsValid = validateName(email);
  // console.log('emailIsValid:', emailIsValid);
  const login = async (email, pass) => {
    if (validateName(email) && validatePass(pass)) {
      // store the email
      await _storeData(email);
      // take them to the next page here!
      navigation.navigate('Symptoms', {
        firstName: getFirstName(email),
        lastName: getLastName(email),
        email,
      });
    } else {
      alert('Please enter a valid ZGBC email and passcode.');
    }
  };

  // if the user has logged in before, just skip to check-in (no auto submit)
  // if (isLoggedIn && validateName(email) && button) {
  //   console.log('email is:', email);
  //   console.log('first name is:', getFirstName(email));
  //   navigation.navigate('Symptoms', { name: getFirstName(email) });
  // }
  //  else if (isLoggedIn && validateName(email)) {
  //   navigation.navigate('Symptoms', { name: getFirstName(email) });
  // }

  // if the user has logged in before, just skip to check-in (no auto submit)
  (async () => {
    const email = await _retrieveData();
    if (email) {
      navigation.navigate('Symptoms', {
        firstName: getFirstName(email),
        lastName: getLastName(email),
        email: email,
      });
    }
  })();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode={'on-drag'}
      >
        <Image
          style={styles.logo}
          // resizeMode='cover'
          // source={require('./assets/ZG_1024x1024.t.png')}
          source={require('../assets/ZGBC_logo.png')}
        ></Image>
        <Text style={styles.title}>Welcome to the ZGBC App</Text>
        <TextInput
          style={styles.input}
          // returnKeyType='done'
          underlineColorAndroid='transparent'
          placeholder='Email'
          placeholderTextColor='black'
          autoCapitalize='none'
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          returnKeyType='done'
          underlineColorAndroid='transparent'
          placeholder='Passcode'
          placeholderTextColor='black'
          autoCapitalize='none'
          onChangeText={(text) => setPass(text)}
          value={pass}
          onSubmitEditing={() => login(email, pass)}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            login(email, pass);
          }}
        >
          <Text style={styles.submitButtonText}> Check in </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
    // padding: 40,
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

export { getFirstName, getLastName };
export default Home;
