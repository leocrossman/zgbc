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
// import Constants from 'expo-constants';

import { TouchableHighlight } from 'react-native-gesture-handler';
// import { Switch } from 'react-native-switch';

// disable warnings - DANGEROUS!
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);
console.disableYellowBox = true;

function Symptoms({ navigation }) {
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);

  const firstName = navigation.state.params.firstName;
  const lastName = navigation.state.params.lastName;
  const email = navigation.state.params.email;

  console.log('here is the nav object:\n');
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

  const onPress = () => {
    fetch('https://us-central1-zgbc-267b9.cloudfunctions.net/submitSymptoms', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(responses),
    });

    // if any response is `Yes`, do not allow into the office
    if (isEnabled1 || isEnabled2 || isEnabled3) {
      alert(
        'Responses submitted.\nDo not proceed to the office.\n Call ### for more info.'
      );
    } else {
      alert('Responses submitted.\nAll clear to proceed to the office.');
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
        <Text style={styles.name}>Hello {firstName},</Text>
        <Text style={styles.headerText}>Watch for symptoms</Text>
        <Text style={styles.infoText}>
          People with COVID-19 have had a wide range of symptoms reported -
          ranging from mild symptoms to severe illness.
        </Text>
        <Text style={styles.infoText}>
          Symptoms may appear 2-14 days after exposure to the vlrus. People with
          these symptoms may have COVID-19:
        </Text>
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
        <Text style={styles.infoText}>
          This list does not include all possible symptoms. CDC will continue to
          update this list as we learn more about COVID-19.
        </Text>
        <Text style={styles.headerText}>
          When to Seek Emergency Medical Attention
        </Text>
        <Text style={styles.bullet}>- Trouble breathing</Text>
        <Text style={styles.bullet}>
          - Persistent pain or pressure in the chest
        </Text>
        <Text style={styles.bullet}>- New confusion</Text>
        <Text style={styles.bullet}>- Inability to wake or stay awake</Text>
        <Text style={styles.bullet}>- Bluish lips or face</Text>

        <Text style={styles.headerText}>Employee Screening Questions</Text>
        <Text style={styles.question}>
          1. Have you have experienced any COVID-19 symptomps in the past 14
          days?
        </Text>
        <View style={styles.switchView}>
          <Text style={styles.answer}>{isEnabled1 ? 'Yes' : 'No'}</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled1 ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch1}
            value={isEnabled1}
          />
        </View>

        <Text style={styles.question}>
          2. Have you had any positive COVID-19 tests in the past 14 days?
        </Text>
        <View style={styles.switchView}>
          <Text style={styles.answer}>{isEnabled2 ? 'Yes' : 'No'}</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled2 ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch2}
            value={isEnabled2}
          />
        </View>
        <Text style={styles.question}>
          3. Have you had close contact with confirmed or suspected COVID-19
          cases in the past 14 days?
        </Text>
        <View style={styles.switchView}>
          <Text style={styles.answer}>{isEnabled3 ? 'Yes' : 'No'}</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled3 ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch3}
            value={isEnabled3}
          />
        </View>
        <TouchableHighlight
          style={styles.button}
          onPress={onPress}
          underlayColor="#99d9f4"
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
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
  name: {
    textAlign: 'left',
    fontSize: 24,
    // marginTop: 10,
  },
  headerText: {
    fontSize: 32,
    // padding: 50,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 18,
    marginTop: 20,
  },
  bullet: {
    padding: 5,
    fontSize: 16,
  },
  question: {
    marginTop: 20,
    fontSize: 24,
    marginBottom: 20,
  },
  switchView: {
    // backgroundColor: 'black',
    alignItems: 'flex-end',
    marginRight: 30,
  },
  answer: {
    fontSize: 32,
    fontWeight: 'bold',
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

export default Symptoms;
