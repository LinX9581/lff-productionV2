import React from 'react';
import { Text, ActivityIndicator, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Container, Right, Content, Card, CardItem, Icon } from "native-base";


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

        fetch('http://lff-production.linxnote.club/api_achievement_list_undertake', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: this.state.user,
                category: '美食類'
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
                console.log('錯誤: Food_Undertake ', err);
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

                                        <TouchableOpacity key={index} onPress={() => this.props.navigation.navigate('Detail'
                                            , { val: val, user: this.state.user, display: 'Display_Btn_Add_Post' }
                                        )

                                        }>
                                            <CardItem bordered={true} style={{ justifyContent: 'space-between' }}>
                                                <Image style={{ width: 50, height: 50 }} source={require('../../../IMG/food_icon.png')} />
                                                <Text>{val.title}</Text>
                                                <Right>
                                                    <Icon name="arrow-forward" />
                                                </Right>
                                            </CardItem>
                                        </TouchableOpacity>
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
                        <Text>目前未有可參與的成就</Text>
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
