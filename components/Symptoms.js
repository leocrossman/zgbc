import React from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import Constants from 'expo-constants';

function Symptoms({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text>Watch for symptoms</Text>
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
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
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
});

export default Symptoms;
