import React, { Component } from 'react';
import { Text, Button, TextInput } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, View } from 'native-base';
import { AntDesign } from '@expo/vector-icons';




class Signup extends Component {

   constructor(props) {
      super(props)
      this.state = ({
         account: '',
         password: '',
         alert: '',

      })
   }


   checkpwd = (checkpwd) => {
      if (this.state.password != checkpwd) {
         this.setState({
            alert: "Check Password must be the same as Password",
         });
      }
      else {
         this.setState({
            alert: ""
         });
      }
   }

   UserSignup = () => {
      fetch('http://lff-production.linxnote.club/api_signup', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            account: this.state.account,
            password: this.state.password
         })

      }).then(res => res.json())
         .then((jsonData) => {
            if (jsonData.success === true) {
               this.props.navigation.navigate('Login')
            }
            else {
               alert(jsonData.message)
            }

         })

         .catch((err) => {
            console.log('連線錯誤:', err);
         })
   }


   render() {
      return (
         <Container>
            <Header transparent style={{ alignContent: 'flex-end', alignItems: 'center' }}
            >
               <View style={{ flex: 1 }}>
                  <AntDesign name="left" size={25}
                     onPress={() => this.props.navigation.navigate('Start')}
                  ></AntDesign></View>
               <View style={{ alignItems: 'flex-end', alignItems: 'center' }} ><Text>註冊</Text></View>
               <View style={{ flex: 1 }}></View>
            </Header>

            <Content>
               <Form>
                  <Item stackedLabel
                  >
                     <Label>UserId</Label>
                     <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={(account) => this.setState({ account })}
                     />
                  </Item>
                  <Item stackedLabel >
                     <Label>Password</Label>
                     <Input
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({ password })}
                     />
                  </Item>
                  <Item stackedLabel >
                     <Label>Check Password</Label>
                     <Input secureTextEntry={true}
                        onChangeText={(checkpwd) => this.checkpwd(checkpwd)}
                     />
                  </Item>
                  <View style={{ marginTop: 30, alignItems: 'center', color: 'red' }}>
                     <Text style={[this.state.alert == "" ? {} : { color: 'red' }]}>

                        {this.state.alert}
                     </Text>
                  </View>


               </Form>
               <View style={{ flex: 1, alignSelf: 'center', marginTop: 40, width: 200 }}>
                  <Button
                     onPress={() => this.UserSignup()}
                     title="註冊"
                     color="#841584"
                  />
               </View>
            </Content>
         </Container>
      );
   }
}

export default Signup


