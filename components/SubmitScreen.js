import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';

import Cleared from './Cleared';
import NotCleared from './NotCleared';

function SubmitScreen({ navigation }) {
  const cleared = navigation.state.params.cleared;

  //   console.log('here is the nav object on SubmitScreen:\n',navigation);

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
    backgroundColor: '#F5FCFF',
  },
  scrollView: {
    backgroundColor: '#F5FCFF',
    marginHorizontal: 20,
  },
  switchView: {
    alignItems: 'flex-end',
    marginRight: 30,
  },
  logo: {
    width: null,
    height: 200,
    resizeMode: 'contain',
    margin: 10,
  },
});

export default SubmitScreen;
