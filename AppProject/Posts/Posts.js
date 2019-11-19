import React, { Component } from 'react';
import { Image, AsyncStorage, TouchableOpacity, View, RefreshControl, ScrollView, Dimensions } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Right, Left, Body, Button } from 'native-base';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { createAppContainer, createDrawerNavigator, } from 'react-navigation'
import Journal from '../Achievement/Journal/Journal'
let width = Dimensions.get('window').width * 0.9;
let height = width;

class Pack extends Component { 
    static navigationOptions = {       
        tabBarIcon: ({ tintColor }) => (
            <FontAwesome name="pencil-square-o" size={20} style={{ color: tintColor }} />
        )
    }

    render() {
        return (
            <AppContainer />
        )
    }
}



class Posts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            get_posts: [],
            prefix_word: 'http://lff-production.linxnote.club/profile/',
            clicked: [], //使用者點擊過哪些文章讚
            refreshing: false,
            reload_head_sticker: {}
        }
    }


    async componentDidMount() {

        var value = await AsyncStorage.getItem('@username')

        if (value !== null) {
            this.setState({
                user: value
            })
        }
        else {
            console.log("value is null")
        }

        fetch('http://lff-production.linxnote.club/api_get_random_post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: this.state.user
            })
        }).then(res => res.json())
            .then((jsonData) => {
                this.state.clicked = []
                for (var i = 0; i < jsonData.clicked.length; i++) {
                    this.state.clicked.push(jsonData.clicked[i])
                }
                for (var i = 0; i < jsonData.obj.length; i++) {
                    if (this.state.clicked.indexOf(jsonData.obj[i].post_id) != -1) {
                        jsonData.obj[i].flag = true; //代表文章按過讚了
                    }
                    else {
                        jsonData.obj[i].flag = false; 
                    }
                }

                this.state.get_posts = [];
                this.state.get_posts = jsonData.obj;
                this.setState({
                    get_posts: this.state.get_posts,
                    reload_head_sticker: new Date()
                })
            })
            .catch((err) => {
                console.log('錯誤: Posts ', err);
            })
    }

    like = (post_id, praise, index) => {
        var set_praise_flag = this.state.get_posts;
        if (this.state.get_posts[index].flag == false) {//按讚         
            set_praise_flag[index].praise = set_praise_flag[index].praise + 1;
            set_praise_flag[index].flag = true
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
        else {//取消讚 > DELETE
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
            this.setState({
                refreshing: false,
                reload_head_sticker: new Date()
            })
        })
    }
    async log_out(key) {
        console.log('log out')
        try {
            await AsyncStorage.removeItem('@' + key);

        }
        catch (exception) {
            return false;
        }
    }


    render() {  
        let display;
        return (
            <Container>
                <Header transparent style={{ alignItems: 'space-between' }}
                >
                    <View style={{flex:1 }}></View>
                    <Body style={{ alignItems: 'center', flex:1 }} ><TouchableOpacity   onPress={() => this.log_out('username')} ><Text>貼文區塊</Text></TouchableOpacity></Body>
                    <View style={{flex:1 }}></View>
                </Header>

                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >

                    <Content>
                        {
                            this.state.get_posts.map((val, index) => {    
                                if(val.activity_id==0){
                                    display="flex";
                                }else{
                                    display="none";
                                }                               
                                
                                return (
                                    <Card key={index} >
                                        <CardItem bordered>
                                            <Left>
                                                <Thumbnail source={{ uri: this.state.prefix_word + val.head_sticker + '?date=' + this.state.reload_head_sticker }} />

                                                <Body>
                                                    <Text>{val.user_id}</Text>

                                                    <Text note>{val.date}</Text>
                                                </Body>
                                                <TouchableOpacity style={{position: 'absolute', right: 10}}
                                                     onPress={() => { this.props.navigation.navigate("Journal", { source:'Post_page' , title: val.title, user: this.state.user }) }}
                                                >
                                                     <Image source={require('../../IMG/journal.png')} style={{width:28, height:28, display: display}}/>
                                                </TouchableOpacity>                                    
                                            </Left>
                                        </CardItem>
                                        <CardItem >

                                            <Body>
                                                <View style={{ marginBottom: 12 }}>
                                                    <Text>{'主題 : ' + val.title}</Text>
                                                </View>
                                                <Image source={{ uri: this.state.prefix_word + val.image_uri }} style={{ height: height, width: width, flex: 1, alignSelf: 'center', marginBottom: 20 }} />

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
                    </Content>
                </ScrollView>
            </Container>
        );
    }
}



export default Pack



const AppDrawerNavigator = createDrawerNavigator({
    貼文區: Posts,
    我的貼文: Posts,
    Journal: Journal,
    Post: Posts
}, {
    contentOptions: {
        activeTintColor: 'orange'
    }
})



const AppContainer = createAppContainer(AppDrawerNavigator); 

