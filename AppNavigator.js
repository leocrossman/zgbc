import { createStackNavigator } from 'react-navigation-stack';
import Home from './components/Home';
import Loading from './components/Loading';
import Example from './components/Example';
import Symptoms from './components/Symptoms';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: { headerShown: false },
  },
  Example: {
    screen: Example,
    navigationOptions: { headerShown: false },
  },
  Loading: {
    screen: Loading,
    navigationOptions: { headerShown: false },
  },
  Symptoms: {
    screen: Symptoms,
    navigationOptions: { headerShown: false },
  },
});

export default AppNavigator;
