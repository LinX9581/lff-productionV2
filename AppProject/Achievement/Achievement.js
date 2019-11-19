import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Dimensions, TouchableOpacity, Image, RefreshControl, ScrollView, ActivityIndicator } from 'react-native';
import { Container, Content, } from 'native-base'
import { createAppContainer, createSwitchNavigator, } from 'react-navigation'
import { MaterialCommunityIcons, AntDesign, Ionicons, MaterialIcons, createIconSetFromIcoMoon } from '@expo/vector-icons';

import Undertake from './Undertake/Undertake'
import Detail from './Common/Detail'
import Food_Undertake from './Undertake/Food_Undertake'
import Tourism_Undertake from './Undertake/Tourism_Undertake'
import Puzzle_Undertake from './Undertake/Puzzle_Undertake'
import Puzzle_illustration from './Undertake/Puzzle_illustration'
import AddPost from './Undertake/AddPost'
import Processing from './Processing/Processing'
import Watch_the_post from './Common/Watch_the_post'
import Complete from './Complete/Complete'
import Simulation from './Simulation/Simulation'
import Rank from './Rank/Rank'
import Puzzle_topic from './Undertake/Puzzle_topic'
import Puzzle_Complete from './Complete/Puzzle_Complete'
import Maps from './Maps'
import Journal from './Journal/Journal'

var width = Dimensions.get('window').width * 0.8
var height = width * 0.4 * 0.82
var get_parent_navigation;
var update_head_sticker = {};

class Pack extends Component { 

    static navigationOptions = {        

        tabBarIcon: ({ tintColor }) => (
            <MaterialCommunityIcons name="medal" size={20} style={{ color: tintColor }} />
        ),
    }
    componentDidMount() {
        get_parent_navigation = this.props.navigation.dangerouslyGetParent();
    }

    render() {

        return (
            <AppContainer />
        )
    }
}


class Achievement extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: '',
            prefix_word: 'http://lff-production.linxnote.club/profile/',
        }
    }

    async componentDidMount() {
        update_head_sticker = new Date();
        var value = await AsyncStorage.getItem('@username')


        if (value !== null) {
            this.setState({ user: value })

        }
        else {
            console.log("value is null")
        }


        fetch('http://lff-production.linxnote.club/api_get_head_sticker', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: this.state.user
            })
        }).then(res => res.json())
            .then((jsonData) => {
                this.setState({
                    head_sticker_name: jsonData.success
                })
            })
            .catch((err) => {
                console.log('錯誤: Achievement ', err);
            })


        fetch('http://lff-production.linxnote.club/api_get_completion_rate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: this.state.user
            })
        }).then(res => res.json())
            .then((jsonData) => {
                this.setState({
                    completion_rate: Math.round(parseFloat(jsonData.success)),
                    init: true //完成初始化
                })
            })
            .catch((err) => {
                console.log('錯誤: Achievement ', err);
            })

    }

    _onRefresh = () => {
        this.setState({ refreshing: true })
        this.componentDidMount().then(() => {
            this.setState({
                refreshing: false,
            })
        })
    }

    render() {
        if (this.state.init == true) {
            return (

                <Container style={styles.container}>
                    <Image style={styles.background} source={require('../../IMG/profile-background2.jpg')} />
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                    >
                        <Content >
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity style={styles.big_section}
                                    onPress={() => get_parent_navigation.navigate('首頁')}
                                >

                                    <Image
                                        style={{ marginHorizontal: 5, width: 120, height: 120, borderRadius: 30, }}  
                                        source={{ uri: this.state.prefix_word + this.state.head_sticker_name + '?time=' + update_head_sticker }}
                                    />
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{this.state.user}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Ionicons name="ios-star" size={20} style={{ color: '#FFFFBB' }}></Ionicons>
                                        <Text> 成就達成率:{this.state.completion_rate + '%'} </Text>
                                    </View>
                                </TouchableOpacity>

                                <View style={[styles.section, { justifyContent: 'space-around', marginTop: 10 }]}>
                                    <TouchableOpacity style={[styles.box, { backgroundColor: '#F66032', }]}
                                        onPress={() => { this.props.navigation.navigate("Undertake", { user: this.state.user, }) }}
                                    >
                                        <View style={{ height: height, justifyContent: 'center', flex: 1 }}>
                                            <MaterialCommunityIcons name="bell-plus" size={50}></MaterialCommunityIcons>
                                        </View>
                                        <View style={{ width: '100%', backgroundColor: '#356d99', alignItems: 'center', paddingVertical: 5 }}>
                                            <Text style={{ color: 'white' }}>可參與</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.box, { backgroundColor: '#95B6C5', }]}
                                        onPress={() => { this.props.navigation.navigate("Processing", { user: this.state.user }) }}
                                    >
                                        <View style={{ height: height, justifyContent: 'center' }}>
                                            <MaterialCommunityIcons name="run" size={50}></MaterialCommunityIcons>
                                        </View>
                                        <View style={{ width: '100%', backgroundColor: '#356d99', alignItems: 'center', paddingVertical: 5 }}>
                                            <Text style={{ color: 'white' }}>進行中</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={[styles.section, { justifyContent: 'space-around' }]}>
                                    <TouchableOpacity style={[styles.box, { backgroundColor: '#F1BB5B', }]}
                                        onPress={() => { this.props.navigation.navigate("Complete", { user: this.state.user }) }}
                                    >
                                        <View style={{ height: height, justifyContent: 'center' }}>
                                            <AntDesign name="checkcircle" size={50}></AntDesign>
                                        </View>
                                        <View style={{ width: '100%', backgroundColor: '#356d99', alignItems: 'center', paddingVertical: 5 }}>
                                            <Text style={{ color: 'white' }}>已完成</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.box, { backgroundColor: '#867692', }]}
                                        onPress={() => { this.props.navigation.navigate("Rank", { user: this.state.user }) }}
                                    >
                                        <View style={{ height: height, justifyContent: 'center' }}>
                                            <MaterialCommunityIcons name="medal" size={50}></MaterialCommunityIcons>
                                        </View>
                                        <View style={{ width: '100%', backgroundColor: '#356d99', alignItems: 'center', paddingVertical: 5 }}>
                                            <Text style={{ color: 'white' }}>排行榜</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>


                                <View style={[styles.section, { justifyContent: 'space-around' }]}>
                                    <TouchableOpacity style={[styles.box, { backgroundColor: '#8E4027', }]}
                                        onPress={() => { this.props.navigation.navigate("Journal", { user: this.state.user }) }}
                                    >
                                        <View style={{ height: height, justifyContent: 'center' }}>
                                            <Ionicons name="ios-journal" size={50}></Ionicons>
                                        </View>
                                        <View style={{ width: '100%', backgroundColor: '#356d99', alignItems: 'center', paddingVertical: 5 }}>
                                            <Text style={{ color: 'white' }}>生活點滴</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.box, { backgroundColor: '#DDA0DD', }]}
                                        onPress={() => { this.props.navigation.navigate("Simulation", { user: this.state.user }) }}
                                    >
                                        <View style={{ height: height, justifyContent: 'center' }}>
                                            <MaterialIcons name="pets" size={50}></MaterialIcons>
                                        </View>
                                        <View style={{ width: '100%', backgroundColor: '#356d99', alignItems: 'center', paddingVertical: 5 }}>
                                            <Text style={{ color: 'white' }}>寵物專區</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Content>
                    </ScrollView>
                </Container>

            )
        }
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="small" color="gray" />
            </View>


        )

    }
}

export default Pack


const AppSwitchNavigator = createSwitchNavigator({
    Achievement: { screen: Achievement },
    Undertake: { screen: Undertake },
    Detail: { screen: Detail },
    Food_Undertake: { screen: Food_Undertake },
    Tourism_Undertake: { screen: Tourism_Undertake },
    Puzzle_Undertake: { screen: Puzzle_Undertake },
    AddPost: { screen: AddPost },
    Processing: { screen: Processing },
    Watch_the_post: { screen: Watch_the_post },
    Complete: { screen: Complete },
    Simulation: { screen: Simulation },
    Rank: { screen: Rank },
    Puzzle_topic: { screen: Puzzle_topic },
    Puzzle_illustration: { screen: Puzzle_illustration },
    Puzzle_Complete: { screen: Puzzle_Complete },
    Maps: { screen: Maps },
    Journal: {screen: Journal}
});



const AppContainer = createAppContainer(AppSwitchNavigator);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
    },
    big_section: {
        width: width,
        height: width * 0.6,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 10
    },
    section: {
        width: width + 80,
        flexDirection: 'row',
        marginBottom: 10
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '47%',
    },
    background: {
        height: 800,
        width: 600,
        position: 'absolute',
    }
});


