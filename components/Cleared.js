import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements';

import { TouchableHighlight } from 'react-native-gesture-handler';

const currentDay = new Date();

function Cleared({ props }) {
  //   console.log('here is the props/nav object:\n');
  const { navigation } = props;
  const firstName = navigation.state.params.firstName;

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
        office today, {currentDay.toDateString()}.
      </Text>
      <Icon name='check-circle' color='#00FF00' size={100} />
      <TouchableHighlight
        style={styles.button}
        onPress={onPressCancel}
        underlayColor='#99d9f4'
      >
        <Text style={styles.buttonText}>Sign in for a different day</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  infoText: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 10,
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
