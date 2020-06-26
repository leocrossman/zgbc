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

import t from 'tcomb-form-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

// disable warnings. DANGEROUS!
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);
console.disableYellowBox = true;

const Form = t.form.Form;

const Questions = t.struct({
  q1: t.String,
  q2: t.String,
  q3: t.String,
});

function Symptoms({ navigation }) {
  console.log('here is the nav object:\n');
  console.log(navigation);
  // console.log();
  // declare a new state variable which we'll call 'value'
  const [value, setValue] = useState('');

  useEffect(() => {
    // let mounted = true;
    // if (mounted) {
    setValue(''); // Set field values to empty string
    // }
    // return () => (mounted = false);
    // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour
  }, []); // this empty array is crucial.

  const clearForm = () => {
    // clear content from all fields
    setValue();
  };

  const onPress = () => {
    // call getValue() to get the values of the form
    const value = this.form.getValue();

    if (value) {
      // if validation fails, value will be null
      console.log(value); // value here is an instance of Order
      //   fetch(
      //     'https://us-central1-bobcat-den-delivery.cloudfunctions.net/order',
      //     {
      //       method: 'POST',
      //       headers: {
      //         Accept: 'application/json',
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify(value),
      //     }
      //   );
      this.clearForm();
      // order confirmation only if form is complete
      Alert.alert('Order Received', 'See you soon!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.name}>Hello {navigation.state.params.name}.</Text>
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
        <Text style={styles.theList}>
          1. Have you have experienced any COVID-19 symptomps in the past 14
          days? If so, please list them.
        </Text>

        <KeyboardAvoidingView
          style={styles.formContainer}
          behavior='padding'
          keyboardDismissMode={'on-drag'}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            <Form
              ref={(c) => (this.form = c)} // assign a ref
              type={Questions}
              options={options} // pass the options via props
            />
            <TouchableHighlight
              style={styles.button}
              onPress={this.onPress}
              underlayColor='#99d9f4'
            >
              <Text style={styles.buttonText}>Submit Order</Text>
            </TouchableHighlight>
          </View>
        </KeyboardAvoidingView>
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
  },
  infoText: {
    fontSize: 18,
    marginTop: 20,
  },
  bullet: {
    padding: 5,
    fontSize: 16,
  },
  theList: {
    marginTop: 20,
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

const formStyles = {
  ...Form.stylesheet,
  textbox: {
    // the style applied without errors
    normal: {
      color: '#000000',
      fontSize: 17,
      height: 36,
      padding: 7,
      borderRadius: 4,
      borderColor: '#696969', // relevant style here
      backgroundColor: '#fff',
      borderWidth: 1,
      marginBottom: 5,
    },

    // the style applied when a validation error occures
    error: {
      color: '#000000',
      fontSize: 17,
      height: 36,
      padding: 7,
      borderRadius: 4,
      borderColor: '#696969', // <= relevant style here
      backgroundColor: '#ffffff',
      borderWidth: 1,
      marginBottom: 5,
    },
  },
  controlLabel: {
    normal: {
      color: 'white',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600',
    },
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600',
    },
  },
};

const options = {
  fields: {
    q1: {
      // removed error messages due to clutter and are unnecessary/redundant
      // error: 'Enter your name',
      returnKeyType: 'next',
      keyboardAppearance: 'dark',
      onSubmitEditing: () => this.form.getComponent('q2').refs.input.focus(),
    },
    q2: {
      // error: 'Enter your dorm or house',
      returnKeyType: 'next',
      keyboardAppearance: 'dark',
      onSubmitEditing: () => this.form.getComponent('q3').refs.input.focus(),
    },
    q3: {
      returnKeyType: 'return',
      autoCorrect: true,
      keyboardAppearance: 'dark',
      maxLength: 300, // no spam
      multiline: true,
      stylesheet: {
        ...formStyles,
        textbox: {
          ...formStyles.textbox,
          normal: {
            ...formStyles.textbox.normal,
            height: 108,
          },
          error: {
            ...formStyles.textbox.error,
            height: 108,
          },
        },
      },
      // onSubmitEditing: () => this.onPress(),
    },
  },
  stylesheet: formStyles,
};

export default Symptoms;
