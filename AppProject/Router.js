import React, { Component } from 'react';
import {  createAppContainer,  createSwitchNavigator } from 'react-navigation'
import Start from './Start/Start'
import Login from './Login/Login'
import Main from './Main';
import Signup from './Signup/Signup'

export default class Router extends React.Component {  

   render() {     
      return (
         <AppContainer />
     
      )
   }
}

const AppSwitchNavigator = createSwitchNavigator({
   Start: { screen: Start },
   Login: { screen: Login },
   Signup: { screen: Signup },
   Main: { screen: Main },
},
   { initialRouteName: "Start"}

);


const AppContainer = createAppContainer(AppSwitchNavigator); 




