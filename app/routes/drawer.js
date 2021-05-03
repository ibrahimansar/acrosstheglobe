import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import ImagesScreen from "../screens/ImagesScreen";

const RootDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: ImagesScreen
  }
});

export default createAppContainer(RootDrawerNavigator);