import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  View,
} from 'react-native';
// import Constants from 'expo-constants';

import { TouchableHighlight } from 'react-native-gesture-handler';
import { Switch } from 'react-native-switch';

// disable warnings - DANGEROUS!
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);
console.disableYellowBox = true;

function Symptoms({ navigation }) {
  console.log('here is the nav object:\n');
  console.log(navigation);

  const onPress = () => {
    alert('Pressed!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.name}>Hello {navigation.state.params.name}</Text>
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
        <Switch
          value={true}
          onValueChange={(val) => console.log(val)}
          disabled={false}
          activeText={'On'}
          inActiveText={'Off'}
          backgroundActive={'green'}
          backgroundInactive={'gray'}
          circleActiveColor={'#30a566'}
          circleInActiveColor={'#000000'}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={onPress}
          underlayColor='#99d9f4'
        >
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={onPress}
          underlayColor='#99d9f4'
        >
          <Text style={styles.buttonText}>No</Text>
        </TouchableHighlight>

        <Text style={styles.question}>
          2. Have you had any positive COVID-19 tests in the past 14 days?
        </Text>
        <Text style={styles.question}>
          3. Have you had close contact with confirmed or suspected COVID-19
          cases in the past 14 days?
        </Text>
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
    textAlign: 'center',
    fontSize: 24,
    marginTop: 20,
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
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
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
