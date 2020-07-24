import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Switch,
  Image,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { getFirstName, getLastName } from './Home';

import { TouchableHighlight } from 'react-native-gesture-handler';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

import axios from 'axios';

function Symptoms({ navigation }) {
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);

  const radio_props = [
    { label: 'No', value: 0 },
    { label: 'Yes', value: 1 },
  ];

  const firstName = navigation.state.params.firstName;
  const lastName = navigation.state.params.lastName;
  const email = navigation.state.params.email;

  console.log('here is the nav object on the Symptoms screen:\n');
  console.log(navigation);

  const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);
  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);
  const toggleSwitch3 = () => setIsEnabled3((previousState) => !previousState);

  const cleared = !isEnabled1 && !isEnabled2 && !isEnabled3;

  const responses = {
    firstName,
    lastName,
    email,
    q1: isEnabled1,
    q2: isEnabled2,
    q3: isEnabled3,
    cleared,
  };
  // alert(JSON.stringify(responses));

  const onPressSubmit = async () => {
    if (Platform.OS === 'web') {
      alert('on web');
      // const xhr = new XMLHttpRequest();
      // xhr.open(
      //   'POST',
      //   'https://us-central1-zgbc-267b9.cloudfunctions.net/submitSymptoms'
      // );
      // //Send the proper header information along with the request
      // xhr.setRequestHeader('Accept', 'application/json');
      // xhr.setRequestHeader('Content-Type', 'application/json');

      // xhr.send(JSON.stringify(responses));
      // try {
      //   await axios.post(
      //     `https://us-central1-zgbc-267b9.cloudfunctions.net/submitSymptoms`,
      //     responses
      //   );
      // } catch (error) {
      //   alert(JSON.stringify(error));
      // }
      fetch(
        'https://us-central1-zgbc-267b9.cloudfunctions.net/submitSymptoms',
        {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(responses),
        }
      );
    } else {
      alert('not web');
      fetch(
        'https://us-central1-zgbc-267b9.cloudfunctions.net/submitSymptoms',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(responses),
        }
      );
    }
    navigation.navigate('SubmitScreen', {
      firstName: getFirstName(email),
      lastName: getLastName(email),
      email: email,
      cleared,
    });
  };

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
        // showsVerticalScrollIndicator={false}
      >
        <Image
          style={styles.logo}
          source={require('../assets/ZGBC_logo.png')}
        ></Image>
        <Text style={styles.name}>Hello {firstName},</Text>
        <Text style={styles.headerText}>Watch for symptoms</Text>
        <Text style={styles.infoText}>
          People with COVID-19 have had a wide range of symptoms reported -
          ranging from mild symptoms to severe illness.
        </Text>
        <Text style={styles.infoText}>
          Symptoms may appear 2-14 days after exposure to the virus. People with
          these symptoms may have COVID-19:
        </Text>
        <View style={styles.list}>
          <Text style={styles.bullet}>- Fever or chills</Text>
          <Text style={styles.bullet}>- Cough</Text>
          <Text style={styles.bullet}>
            - Shortness of breath or difficulty breathing
          </Text>
          <Text style={styles.bullet}>- Fatigue</Text>
          <Text style={styles.bullet}>- Muscle or body aches</Text>
          <Text style={styles.bullet}>- Headache</Text>
          <Text style={styles.bullet}>- New loss of taste or smell</Text>
          <Text style={styles.bullet}>- Sore Throat</Text>
          <Text style={styles.bullet}>- Congestion or runny nose</Text>
          <Text style={styles.bullet}>- Nausea or vomiting</Text>
        </View>
        <Text style={styles.infoText}>
          This list does not include all possible symptoms. The CDC will
          continue to update this list as we learn more about COVID-19.
        </Text>
        <Text style={styles.headerText}>
          When to Seek Emergency Medical Attention
        </Text>
        <View style={styles.list}>
          <Text style={styles.bullet}>- Trouble breathing</Text>
          <Text style={styles.bullet}>
            - Persistent pain or pressure in the chest
          </Text>
          <Text style={styles.bullet}>- New confusion</Text>
          <Text style={styles.bullet}>- Inability to wake or stay awake</Text>
          <Text style={styles.bullet}>- Bluish lips or face</Text>
        </View>

        <Text style={styles.headerText}>Employee Screening Questions</Text>
        <Text style={styles.question}>
          1. Have you have experienced any COVID-19 symptoms in the past 14
          days?
        </Text>
        <View style={styles.switchView}>
          {/* <Text style={styles.answer}>{isEnabled1 ? 'Yes' : 'No'}</Text> */}
          <RadioForm
            radio_props={radio_props}
            // initial={0}
            onPress={toggleSwitch1}
            // value={isEnabled1}
          />
          {/* <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled1 ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor='#3e3e3e'
            onValueChange={toggleSwitch1}
            value={isEnabled1}
          /> */}
        </View>

        <Text style={styles.question}>
          2. Have you had any positive COVID-19 tests in the past 14 days?
        </Text>
        <View style={styles.switchView}>
          <RadioForm
            radio_props={radio_props}
            // initial={0}
            onPress={toggleSwitch2}
            // value={isEnabled2}
          />
        </View>
        <Text style={styles.question}>
          3. Have you had close contact with confirmed or suspected COVID-19
          cases in the past 14 days?
        </Text>
        <View style={styles.switchView}>
          <RadioForm
            radio_props={radio_props}
            // initial={0}
            onPress={toggleSwitch3}
            // value={isEnabled3}
          />
        </View>
        <TouchableHighlight
          style={styles.button}
          onPress={onPressSubmit}
          underlayColor='#99d9f4'
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={onPressCancel}
          underlayColor='#99d9f4'
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableHighlight>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  scrollView: {
    backgroundColor: '#F5FCFF',
    marginHorizontal: 20,
  },
  name: {
    textAlign: 'left',
    fontSize: 18,
  },
  headerText: {
    fontSize: 32,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 18,
  },
  list: {
    marginTop: 10,
    marginBottom: 10,
  },
  bullet: {
    padding: 5,
    fontSize: 16,
  },
  question: {
    marginTop: 20,
    fontSize: 18,
    marginBottom: 20,
  },
  switchView: {
    alignItems: 'flex-end',
    marginRight: 30,
  },
  answer: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  logo: {
    width: null,
    height: 200,
    resizeMode: 'contain',
    margin: 10,
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
});

export default Symptoms;
