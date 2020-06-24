import { createStackNavigator } from 'react-navigation-stack';
import Home from './components/Home';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: { headerShown: false },
  },
});

export default AppNavigator;
