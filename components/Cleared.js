import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  // KeyboardAvoidingView,
  View,
  Switch,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements';

import { TouchableHighlight } from 'react-native-gesture-handler';

// disable warnings - DANGEROUS!
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);
console.disableYellowBox = true;

function Cleared({ props }) {
  console.log('here is the props/nav object:\n');
  const { navigation } = props;
  const firstName = navigation.state.params.firstName;
  const lastName = navigation.state.params.lastName;
  const email = navigation.state.params.email;
  const cleared = navigation.state.params.cleared;

  const onPressCancel = async () => {
    try {
      await AsyncStorage.removeItem('userEmail');
      console.log('ASyncStorage Cleared (Email Removed).');
      navigation.navigate('Home');
    } catch (error) {
      console.log('Something went wrong clearing the ASyncStorage...', error);
    }
  };

  return (
    <View styles={styles.container}>
      <Text style={styles.infoText}>Thank you {firstName}. </Text>
      <Text style={styles.infoText}>
        Your responses have been submitted and you are clear to proceed to the
        office.
      </Text>
      <Icon name="check-circle" color="#00FF00" size={100} />
      <TouchableHighlight
        style={styles.button}
        onPress={onPressCancel}
        underlayColor="#99d9f4"
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
    // marginTop: Constants.statusBarHeight,
  },
  infoText: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 10,
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
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 40,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
});

export default Cleared;
