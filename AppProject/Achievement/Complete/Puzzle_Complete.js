import React,{Component} from 'react';
import { Text, ActivityIndicator, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Container, Right, Content, Card, CardItem, Icon } from "native-base";
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default class App extends React.Component {



    constructor(props) {
        super(props)
        this.state = {
            user: '',
            get_list: [],
            no_data: false 
        }
    }


    
    componentDidMount() {

        this.state.user = this.props.user

        fetch('http://lff-production.linxnote.club/api_achievement_list_complete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: this.state.user,
                category: '益智類'
            })
        }).then(res => res.json())
            .then((jsonData) => {
                this.state.get_list = []
                if (jsonData.message.length == 0) {
                    this.setState({
                        no_data: true
                    })
                    return;
                }
                for (var i = 0; i < jsonData.message.length; i++) {
                    this.state.get_list.push(jsonData.message[i])
                }
                this.setState({
                    get_list: this.state.get_list
                })
            })
            .catch((err) => {
                console.log('錯誤: Puzzle_Complete ', err);
            })
    }



    render() {
        if (this.state.get_list.length != 0) {
            return (
                <Container>
                    <Content padder>
                        <Card>
                            {
                                this.state.get_list.map((val, index) => {
                                    return (

                                        <View key={index} >
                                            <CardItem bordered={true} style={{ justifyContent: 'space-between' }}>
                                                <Image style={{width: 50, height: 50}} source={require('../../../IMG/question.png')}/>
                                                <Text>{val.title}</Text>
                                                <Right>
                                                <Image
                                                    style={{width: 20, height: 20}}
                                                    source={require('../../../IMG/correct.png')}
                                                />
                                                </Right>
                                            </CardItem>
                                        </View>
                                    )
                                })

                            }
                        </Card>
                    </Content>
                </Container>
            );
        }


        if (this.state.no_data == true) {
            return (
                <Container>
                    <View style={styles.container}>
                        <Text>目前未有已完成的成就</Text>
                    </View>
                </Container>
            );

        }

        return (
            <View style={styles.container}>
                <ActivityIndicator size="small" color="gray" />
            </View>
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
