import React, { useState } from "react";
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

import * as firebase from 'firebase';
import config from './firebaseCredentials';
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}



export default function App() {
  const date = new Date();
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Welcome to the ZGBC App</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder=" Email"
          placeholderTextColor="black"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder=" Password"
          placeholderTextColor="black"
          autoCapitalize="none"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.login(this.state.email, this.state.password)}
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
    backgroundColor: "#F5FCFF"
  },
  input: {
    justifyContent: "center",
    margin: 15,
    height: 40,
    borderColor: "black",
    borderWidth: 1
  },
  submitButton: {
    justifyContent: "center",
    backgroundColor: "black",
    padding: 10,
    margin: 15,
    alignItems: "center",
    height: 40
  },
  submitButtonText: {
    color: "white"
  },
  title: {
    fontSize: 25,
    padding: 40,
    marginTop: 50,
    // justifyContent: 'center',
    // alignItems: 'center'
  }
});