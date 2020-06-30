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

import { TouchableHighlight } from 'react-native-gesture-handler';

import Cleared from './Cleared';
import NotCleared from './NotCleared';

// disable warnings - DANGEROUS!
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);
console.disableYellowBox = true;

function SubmitScreen({ navigation }) {
  const firstName = navigation.state.params.firstName;
  const lastName = navigation.state.params.lastName;
  const email = navigation.state.params.email;
  const cleared = navigation.state.params.cleared;

  console.log('here is the nav object on SubmitScreen:\n');
  console.log(navigation);

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
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Image
          style={styles.logo}
          source={require('../assets/ZGBC_logo.png')}
        ></Image>
        {cleared ? (
          <Cleared props={{ navigation }} />
        ) : (
          <NotCleared props={{ navigation }} />
        )}
      </ScrollView>
    </SafeAreaView>
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
  scrollView: {
    backgroundColor: '#F5FCFF',
    marginHorizontal: 20,
  },
  //   name: {
  //     textAlign: 'left',
  //     fontSize: 24,
  //     // marginTop: 10,
  //   },
  //   headerText: {
  //     fontSize: 32,
  //     // padding: 50,
  //     marginTop: 20,
  //     marginBottom: 20,
  //     fontWeight: 'bold',
  //   },
  switchView: {
    // backgroundColor: 'black',
    alignItems: 'flex-end',
    marginRight: 30,
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
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 0,
    padding: 10, // 20
    backgroundColor: '#881124',
    textAlignVertical: 'top',
  },
});

export default SubmitScreen;
