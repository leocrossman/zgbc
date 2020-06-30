import { createStackNavigator } from 'react-navigation-stack';
import Home from './components/Home';
import Symptoms from './components/Symptoms';
import SubmitScreen from './components/SubmitScreen';
import Cleared from './components/Cleared';
import NotCleared from './components/NotCleared';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: { headerShown: false },
  },
  Symptoms: {
    screen: Symptoms,
    navigationOptions: { headerShown: false },
  },
  SubmitScreen: {
    screen: SubmitScreen,
    navigationOptions: { headerShown: false },
  },
  Cleared: {
    screen: Cleared,
    navigationOptions: { headerShown: false },
  },
  NotCleared: {
    screen: NotCleared,
    navigationOptions: { headerShown: false },
  },
});

export default AppNavigator;
