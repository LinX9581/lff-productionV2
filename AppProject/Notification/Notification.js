import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right } from 'native-base';
import { createAppContainer, createDrawerNavigator, createSwitchNavigator } from 'react-navigation'
import { Button, View } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Message from './Message'

export default class Pack extends Component {
   static navigationOptions = {   
      tabBarIcon: ({ tintColor }) => (
         <Ionicons name="md-notifications" size={20} style={{ color: tintColor }} />
      )
   }

   render() {
      return (
         <AppContainer />      
      );
   }
}



class Notification extends Component {
   render() {
      return (
         <Container>
            <Header transparent style={{ alignItems: 'space-between' }}
            >
               <View style={{ flex: 1 }} />
               <Body style={{ flex: 1, alignItems: 'center' }} ><Text>通知</Text></Body>
               <View style={{ flex: 1 }} />
            </Header>
            <Content>
               <List>
                  <ListItem thumbnail>
                     <Left>
                        <Thumbnail square source={require('../IMG/shirt.png')} />
                     </Left>
                     <Body>
                        <Text>Sankhadeep</Text>
                        <Text note numberOfLines={1}>Its time to build a difference  . .</Text>
                     </Body>
                     <Right>

                        <Button
                           onPress={()=>this.props.navigation.navigate('Message')}
                           title="view"
                           color="#841584"
                        />
                     </Right>
                  </ListItem>
                  <ListItem thumbnail>
                     <Left>
                        <Thumbnail square source={require('../IMG/shirt.png')} />
                     </Left>
                     <Body>
                        <Text>ARod</Text>
                        <Text note numberOfLines={1}>Its time to build a difference  . .</Text>
                     </Body>
                     <Right>

                        <Button                            
                           onPress={()=>this.props.navigation.navigate('Message')}
                           title="view"
                           color="#841584"
                        />
                     </Right>
                  </ListItem>
               </List>
            </Content>
         </Container>
      )
   }
}

const AppSwitchNavigator = createSwitchNavigator({
   Notification: {screen: Notification},
   Message: { screen: Message }, 
 },
 { initialRouteName: "Notification" }
 );

const AppContainer = createAppContainer(AppSwitchNavigator); 
