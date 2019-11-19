import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Picker } from 'react-native';
import { FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons';
import {
    Card, CardItem, Thumbnail, Body, Left, Right,
    Header, Container, Content,

} from 'native-base'


export default class Rank extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            rank_list: [],
            rank_list_praise: [],
            rank_list_achievement: [],
            prefix_word: 'http://lff-production.linxnote.club/profile/',
            selected: "key1"

        }
    }

    addSection_rank = (index) => { // 前三名是獎盃       
        if (index == 0) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 30, marginRight: 2 }}>
                    <Image source={require('../../../IMG/first.png')} style={{ width: '100%', height: '100%' }} />
                </View>
            )
        }
        else if (index == 1) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 30, marginRight: 2 }}>
                    <Image source={require('../../../IMG/second.png')} style={{ width: '100%', height: '100%' }} />
                </View>
            )
        }
        else if (index == 2) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', width: 30, height: 30, marginRight: 2 }}>
                    <Image source={require('../../../IMG/third.png')} style={{ width: '100%', height: '100%' }} />
                </View>
            )
        }

        else {
            return (
                <View style={{ alignItems: 'center', width: 30, marginRight: 2 }}>
                    <Text>{index + 1}.</Text>
                </View>

            )
        }
    }


    componentDidMount() {

        console.log(this.props.navigation.state.params.user)
        fetch('http://lff-production.linxnote.club/api_get_rank_info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: this.props.navigation.state.params.user
            })
        }).then(res => res.json())
            .then((jsonData) => {
                for (var i = 0; i < jsonData.obj.length; i++) {
                    this.state.rank_list_achievement.push(jsonData.obj[i])
                }
                for (var i = 0; i < jsonData.obj2.length; i++) {
                    this.state.rank_list_praise.push(jsonData.obj2[i])
                }
                this.setState({
                    rank_list: this.state.rank_list_achievement
                })
            })
            .catch((err) => {
                console.log('錯誤 : Rank', err)
            })
    }


    onValueChange(value) {
        console.log(value)
        if (value == 'support') {
            this.setState({
                rank_list: this.state.rank_list_praise
            })
        }
        if (value == "achievement") {
            console.log(value)
            this.setState({
                rank_list: this.state.rank_list_achievement
            })

        }
    }

    render() {
        return (
            <Container>
                <View style={{ flex: 1 }}>
                    <Header transparent 
                    >
                        <Left>
                            <AntDesign name="left" style={{ paddingLeft: 10 }} size={25}
                                onPress={() => this.props.navigation.navigate('Achievement')}
                            ></AntDesign>
                        </Left>
                        <Body style={{ alignItems: 'flex-end' }} ><Text>排行榜</Text></Body>
                        <Right><Text>tips</Text></Right>

                    </Header>


                    <Content>
                        <ImageBackground style={styles.center} source={require('../../../IMG/rank-background.jpg')}>


                            <Card style={{ flex: 0, backgroundColor:"transparent" }} >
                                <View style={{flex: 1, alignItems:'flex-end'}}>
                                    <Picker
                                        note
                                        mode="dropdown"
                                        style={{ width: 150 }}
                                        selectedValue={this.state.selected}
                                        onValueChange={this.onValueChange.bind(this)}
                                    >
                                        <Picker.Item label=""/>
                                        <Picker.Item label="以成就排名" value="achievement" />
                                        <Picker.Item label="以支持排名" value="support" />

                                    </Picker>
                                </View>
                                {

                                    this.state.rank_list.map((val, index) => {

                                        return (
                                            <CardItem key={index} style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                                                <Left>
                                                    {this.addSection_rank(index)}
                                                    <Thumbnail source={{ uri: this.state.prefix_word + val.head_sticker }} />
                                                    <Text style={{ marginLeft: 12 }}>{val.user_id}</Text>
                                                </Left>

                                                <Right style={{ 
                                                    flexDirection: 'row', position: 'absolute', right: 25
                                                }}>
                                                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                                        <Text>{val.num}</Text>
                                                        <Image style={{}} source={require('../../../IMG/scroll.png')} />
                                                    </View>
                                                </Right>
                                            </CardItem>

                                        )
                                    })
                                }
                            </Card>
                        </ImageBackground>
                    </Content>
                </View>
            </Container>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    center: {
        flex: 1,

    },
    backgroundColor: {
    }
});


