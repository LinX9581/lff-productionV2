import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Content } from 'native-base';
import { AntDesign } from '@expo/vector-icons';


export default class App extends React.Component {
    render (){
        return(
            <Container>
            <Header transparent style={{ alignContent: 'flex-end', alignItems: 'center' }}//預設是藍色加transparent讓它變透明
            >
               <View style={{ flex: 1 }}>
                  <AntDesign name="left" size={25}
                     onPress={()=> this.props.navigation.navigate('Notification')}                   
                  ></AntDesign></View>
               <View style={{ alignItems: 'flex-end', alignItems: 'center' }} ><Text>Message</Text></View>
               <View style={{ flex: 1 }}></View>
            </Header>
            <Content>
            <View style={styles.container}>
                <Text>Open up App.js to start working on your app!!!</Text>
            </View>
            </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})


