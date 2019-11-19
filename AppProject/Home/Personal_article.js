import React, { Component } from "react";
import { Image, Button, TouchableOpacity, AsyncStorage, Dimensions, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Left, Right, View, Icon, Thumbnail } from "native-base";
import { FontAwesome, MaterialCommunityIcons, Ionicons, } from '@expo/vector-icons';
var navigation_listener;
let width = Dimensions.get('window').width * 0.9;
let height = width - 10;

export default class CardItemBordered extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pressed_which: [],
            get_posts: [],
            user: '',
            refreshing: false,
            prefix_word_for_bodyIMG: '',
            prefix_word_for_header: '',
            init: false,
            empty: false
        }
    }

    async componentDidMount() {
        var value = await AsyncStorage.getItem('@username')
        if (value !== null) {
            this.setState({ user: value })
        }
        else {
            console.log("value is null")
        }
        this._loadInitalState().done();


        navigation_listener = this.props.navigation.addListener(
            'didFocus',
            reload => {
                this.setState({
                    init: false,
                    reload_head_sticker: new Date()
                })
                this._loadInitalState().done();

            }
        )
    }
    componentWillUnmount() {
        navigation_listener.remove();
    }

    _loadInitalState = async () => {
        console.log('listen')
        fetch('http://lff-production.linxnote.club/api_get_personal_post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: this.state.user,
            })
        }).then(res => res.json())
            .then((jsonData) => {

                if (jsonData.message.length == 0) {
                    this.setState({
                        empty: true
                    })
                }

                this.state.pressed_which = []
                for (var i = 0; i < jsonData.pressed_which.length; i++) {
                    this.state.pressed_which.push(jsonData.pressed_which[i]);
                }
                this.state.get_posts = []
                for (var i = 0; i < jsonData.message.length; i++) {

                    if (jsonData.message[i].activity_id == 0) {
                        continue;
                    }

                    if (this.state.pressed_which.indexOf(jsonData.message[i].post_id) != -1) {
                        jsonData.message[i].flag = true
                    }

                    this.state.get_posts.push(jsonData.message[i])
                }

                this.setState({
                    get_posts: this.state.get_posts,
                    prefix_word_for_bodyIMG: 'http://lff-production.linxnote.club/profile/',
                    prefix_word_for_header: 'http://lff-production.linxnote.club/profile/'
                })

                if (this.props.uri != '') {
                    this.setState({
                        prefix_word_for_header: '',
                        head_sticker_name: this.props.uri

                    })
                }
                else {
                    this.setState({
                        head_sticker_name: this.props.head_sticker_name

                    })

                }
                this.setState({
                    init: true
                })

            })
            .catch((err) => {
                console.log('錯誤:', err);
            })
    }

    like = (post_id, praise, index) => {
        var set_praise_flag = this.state.get_posts;
        if (this.state.get_posts[index].flag == false) {
            set_praise_flag[index].praise = set_praise_flag[index].praise + 1;
            set_praise_flag[index].flag = true
            this.setState({
                get_posts: set_praise_flag, //現有讚數+1                
            })
            fetch('http://lff-production.linxnote.club/api_set_praise', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    post_id: post_id,
                    action: "increase", // 讚數 +1
                    giver: this.state.user
                })
            }).then(res => res.json())
                .then((jsonData) => {

                })
                .catch((err) => {
                    console.log('錯誤:', err);
                })
        }
        else {//取消讚 
            set_praise_flag[index].praise = set_praise_flag[index].praise - 1;
            set_praise_flag[index].flag = false
            this.setState({
                get_posts: set_praise_flag,
            })
            fetch('http://lff-production.linxnote.club/api_set_praise', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    post_id: post_id,
                    action: "reduce",
                    giver: this.state.user
                })
            }).then(res => res.json())
                .then((jsonData) => {

                })
                .catch((err) => {
                    console.log('錯誤:', err);
                })
        }
    }

    _onRefresh = () => {
        this.setState({ refreshing: true })
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false })
        })
    }

    render() {
        if (this.state.empty == true) {
            return (
                <View style={styles.container}>
                    <Text>您沒有任何文章</Text>
                </View>
            )
        }
        if (this.state.init == true) {
            return (
                <View>
                    {
                        this.state.get_posts.map((val, index) => {

                            if (this.state.pressed_which.indexOf(val.post_id.toString()) != "-1") {

                            }
                            return (
                                <Card key={index}
                                >

                                    <CardItem bordered={true} style={{ justifyContent: 'space-between' }}>
                                        <Left>
                                            <Thumbnail source={{ uri: this.state.prefix_word_for_header + this.state.head_sticker_name + '?date=' + this.state.reload_head_sticker }} />

                                            <Body>
                                                <Text>{val.user_id}</Text>
                                                <Text note>{val.date}</Text>

                                            </Body>
                                        </Left>
                                    </CardItem>
                                    <CardItem bordered={true} >
                                        <Body>
                                            <View style={{ marginBottom: 12 }}>
                                                <Text>{'主題 : ' + val.title}</Text>
                                            </View>
                                            <Image source={{ uri: this.state.prefix_word_for_bodyIMG + val.image_uri + '?date=' + this.state.reload_head_sticker }} style={{ height: width, width: height, flex: 1, alignSelf: 'center', marginBottom: 20 }} />
                                            <Text>
                                                {val.content}
                                            </Text>
                                        </Body>
                                    </CardItem>
                                    <View style={{ flexDirection: 'row', paddingLeft: 20, alignItems: 'center' }}>
                                        <Text>{val.praise}</Text>
                                        <TouchableOpacity
                                            style={{ width: 80, height: 40, alignItems: 'center', justifyContent: 'center', margin: 3 }}
                                            onPress={() => this.like(val.post_id, val.praise, index)}
                                        >
                                            <Text style={[val.flag == true ? { color: '#FFB7DD' } :  //成立就什麼都不做，不成立顏色變成grey
                                                { color: 'grey' }]}>
                                                <Ionicons name="ios-heart-empty" size={24} />
                                            </Text>

                                        </TouchableOpacity>
                                        <View style={[val.flag == true ? { display: 'flex' } :
                                            { display: 'none' }]}>
                                            <Text >(已給予支持) </Text>
                                        </View>
                                    </View>

                                </Card>

                            )
                        })
                    }
                </View>
            );
        }


        return (
            <View style={styles.container}>
                <ActivityIndicator size="small" color="gray" />
            </View>
        )


    }
}


const test2 = new CardItemBordered();
const Detail = props => (
    <View style={{ flexDirection: 'row', paddingLeft: 20, alignItems: 'center' }}>
        <Text>{props.val.praise}</Text>
        <TouchableOpacity
            style={{ width: 80, height: 40, alignItems: 'center', justifyContent: 'center', margin: 3 }}
            onPress={() => console.log(test2.like(props.val.post_id, props.val.praise, props.index))}
        >
            <Text style={[props.val.flag == true ? { color: 'skyblue' } :  //成立就什麼都不做，不成立顏色變成grey
                { color: 'grey' }]}>
                <Ionicons name="ios-heart-empty" />
            </Text>

        </TouchableOpacity>
        <View style={[props.val.flag == true ? { display: 'flex' } :
            { display: 'none' }]}>
            <Text >(已給予支持) </Text>
        </View>
    </View>
)





const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 250
    }
})






