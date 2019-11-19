import React from 'react';
import { AsyncStorage,StyleSheet, Text, View, Button, TextInput, TouchableHighlight } from 'react-native';

export default class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = ({
            account: '',
            password: '',
            alert: '',            
        })
    }
    

    UserLogin = () => {     
        fetch('http://lff-production.linxnote.club/api_login', { 
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
                if(jsonData.success===true){
                  var username = jsonData.message
                  AsyncStorage.setItem('@username', username)
                  this.props.navigation.navigate('Main') 
              }
              else{
                alert(jsonData.message)
              }
         
            })   
           .catch((err) => {
              console.log('錯誤:', err);
           })     
     }

    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.InputContainer}>
                    <TextInput
                        placeholder="Email"
                        style={styles.Input} 
                        onChangeText={(account) => this.setState({ account })}
                        >            
                    </TextInput>

                </View>
                <View style={styles.InputContainer}>
                    <TextInput
                        placeholder="Passwords"
                        secureTextEntry={true}
                        style={styles.Input} 
                        onChangeText={(password) => this.setState({ password })}
                        >
                            
                    </TextInput>
                </View>
                <TouchableHighlight
                    style={styles.Login_btn}                 
                  onPress={() => this.UserLogin()}
                >
                    <Text style={{ color: 'white' }}>Login</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={{ marginBottom: 20, marginTop: 10 }}
                >
                    <Text>Forget Password</Text>
                </TouchableHighlight>
                <TouchableHighlight                    
                    onPress={() => this.props.navigation.navigate('Signup')}
                >
                    <Text>Register</Text>
                </TouchableHighlight>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DCDCDC',
        alignItems: 'center',
        justifyContent: 'center',

    },
    InputContainer: {
        width: 250,
        height: 45,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 30,
        marginBottom: 20
    },
    Input: {
        marginLeft: 25,
        height: 45,
    },
    Login_btn: {
        backgroundColor: '#00b5ec',
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        height: 45,
        marginBottom: 20,
        borderRadius: 30,

    }

})



