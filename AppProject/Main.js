
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createSwitchNavigator, createAppContainer,  createBottomTabNavigator } from 'react-navigation'
import Achievement from './Achievement/Achievement'
import Home from './Home/Profile';
import Posts from './Posts/Posts';
import Notification from './Notification/Notification'
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import Rank from './Achievement/Rank/Rank'

export default class App extends React.Component {

   constructor(props) {
      super(props)
      this.state = ({
         username: [],
      })
   }


   render() {
      return (
         <AppContainer />
      )
   }
}
 
class IconWithBadge extends React.Component {
   render() {
     const { name, badgeCount, color, size } = this.props;
     return (
       <View style={{ width: 24, height: 24, margin: 5 }}>
         <Ionicons name={name} size={size} color={color} />
         {badgeCount > 0 && (
           <View
             style={{
               position: 'absolute',
               right: -6,
               top: -3,
               backgroundColor: 'red',
               borderRadius: 6,
               width: 12,
               height: 12,
               justifyContent: 'center',
               alignItems: 'center',
             }}>
             <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
               {badgeCount}
             </Text>
           </View>
         )}
       </View>
     );
   }
 }


 const HomeIconWithBadge = props => { 
   return <IconWithBadge  {...props} />; 
 };
 


 const getTabBarIcon = (navigation, focused, tintColor) => {
   const { routeName } = navigation.state;
   let IconComponent = Ionicons;
   let iconName;  
   if (routeName === '討論區') {     
    
      iconName = `md-notifications`;
     IconComponent = HomeIconWithBadge;
   } 
   
   return <IconComponent name={iconName} size={25} color={tintColor} />;
 };




const AppTabNavigator = createBottomTabNavigator({
  
   成就區塊: {
      screen: Achievement
   },
   個人頁面: {
      screen: Home
   },
   貼文: {
      screen: Posts
   },
  
   討論區: {
      screen: Notification
   },

}, {

   defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor),
    }),
   animationEnabled: true, 
   swipeEnable: true,
   tabBarPosition: "bottom",
   tabBarOptions: {
      style:{height:55},
      inactiveTintColor: '#d1cece', 
      showIcon: true  
   }


},)

const AppSwitchNavigator = createSwitchNavigator({
   Main:{screen: AppTabNavigator},
   Rank: { screen: Rank },
   Posts:{screen: Posts},
})



const AppContainer = createAppContainer(AppSwitchNavigator); 



