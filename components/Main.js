import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import * as firebase from 'firebase';
import 'firebase/auth';
import config from '../firebaseCredentials';
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

// import './components/Loading';
// import Loading from './Loading';

function App() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const login = (email, pass) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then((res) => {
        alert(res.user.email);
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error.message);
      });
  };

  const handleEmail = (text) => {
    setEmail(text);
  };

  const handlePass = (text) => {
    setPass(text);
  };

  return (
    <View style={styles.container}>
      <Loading></Loading>
      <Text style={styles.title}>Welcome to the ZGBC App</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid='transparent'
        placeholder=' Email'
        placeholderTextColor='black'
        autoCapitalize='none'
        onChangeText={handleEmail}
      />
      <TextInput
        style={styles.input}
        underlineColorAndroid='transparent'
        placeholder=' Password'
        placeholderTextColor='black'
        autoCapitalize='none'
        onChangeText={handlePass}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => login(email[0], pass[0])}
      >
        <Text style={styles.submitButtonText}> Submit </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: '#F5FCFF',
  },
  input: {
    justifyContent: 'center',
    margin: 15,
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
    marginTop: 50,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
});

export default App;
