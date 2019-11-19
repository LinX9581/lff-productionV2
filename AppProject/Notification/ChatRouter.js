// Import the screens
import Chatname from "./Chatname";
import Chat from "./Chat";
// import Chat from './components/Chat';

import React from "react";
// Import React Navigation
import { createSwitchNavigator, createAppContainer } from "react-navigation";

// Create the navigator
const AppSwitchNavigator = createSwitchNavigator({
  Chatname: { screen: Chatname },
  Chat: { screen: Chat },
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

// Export it as the root component12121
export default class Chatrouter extends React.Component {
    static navigationOptions = {
        tabBarVisble:false,
     }
  render() {
    return <AppNavigator />;
  }
}
