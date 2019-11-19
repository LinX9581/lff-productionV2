import React, { Component } from "react";
import { Image,  TouchableOpacity,  RefreshControl, ScrollView, Dimensions } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Left, Right, View, Icon, Thumbnail } from "native-base";
import { AntDesign, } from '@expo/vector-icons';
let width = Dimensions.get('window').width * 0.9;
let height = width;

export default class CardItemBordered extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pressed: [],       
            get_posts: [],      
            refreshing: false,
            prefix_word: 'http://lff-production.linxnote.club/profile/',
            user: ''

        }
    }


    //componentDidMount = async () => {
    async componentDidMount() {       
        if (this.props.navigation.state.params.display == 'Display_Btn_Look_Post_Processing') 
        {
            this.setState({
                source: 'Processing'
            })
        }
        if (this.props.navigation.state.params.display == 'Display_Btn_Look_Post_Complete') 
        {
            this.setState({
                source: 'Complete'

            })
        }
            
            fetch('http://lff-production.linxnote.club/api_get_Specific_article_in_progress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: this.props.navigation.state.params.user,
                    activity_id: this.props.navigation.state.params.val.activity_id
                })
            }).then(res => res.json())
                .then((jsonData) => {
                    this.state.get_posts = []                
                    this.state.get_posts.push(jsonData.message[0])
                    this.setState({
                        get_posts: this.state.get_posts,                     
                    })
                    fetch('http://lff-production.linxnote.club/api_get_head_sticker', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            user: this.props.navigation.state.params.user
                        })
                    }).then(res => res.json())
                        .then((jsonData) => {                           
                            this.setState({
                                banana: jsonData.success // 設置頭貼 uri
                            })                          
                        })
                        .catch((err) => {
                            console.log('錯誤 watch_the_post: ', err);
                        })
                })
                .catch((err) => {
                    console.log('錯誤watch_the_post:', err);
                })

        // });
    }


    like = (post_id, praise) => {
        var set_praise_flag = this.state.get_posts;
        if (this.state.get_posts[0].flag == false) { 
            set_praise_flag[0].praise = set_praise_flag[0].praise + 1;
            set_praise_flag[0].flag = true 
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
                    giver: this.props.navigation.state.params.user
                })
            }).then(res => res.json())
                .then((jsonData) => {

                })
                .catch((err) => {
                    console.log('錯誤:', err);
                })
        }
        else {//取消讚 
            set_praise_flag[0].praise = set_praise_flag[0].praise - 1;
            set_praise_flag[0].flag = false
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
                    giver: this.props.navigation.state.params.user
                })
            }).then(res => res.json())
                .then((jsonData) => {

                })
                .catch((err) => {
                    console.log('錯誤 watch_the_post:', err);
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
        return (
            <Container>
                <Header transparent 
                >
                    <Left>
                        <AntDesign name="left" style={{ paddingLeft: 10 }} size={25}
                            onPress={() => this.props.navigation.navigate(this.state.source, { user: this.props.navigation.state.params.user })}
                        ></AntDesign>
                    </Left>
                    <Body style={{ alignItems: 'flex-end' }} ><Text>活動專區</Text></Body>
                    <Right />
                </Header>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >

                    <Content padder>
                        {

                            this.state.get_posts.map((val, index) => {                                
                                return (
                                    <View key={index} >
                                        <Card>
                                            <CardItem bordered={true} style={{ justifyContent: 'space-between' }}>
                                                <Left>
                                                    <Image
                                                        style={{ marginHorizontal: 5, width: 60, height: 60, borderRadius: 30, }} 
                                                        source={{ uri: this.state.prefix_word + this.state.banana }}
                                                    />
                                                    <Body>
                                                        <Text>{val.user_id}</Text>
                                                        <Text>{val.title}</Text>
                                                    </Body>
                                                </Left>
                                            </CardItem>
                                            <CardItem bordered={true} >
                                                <Body>
                                                    <Image   source={{ uri: this.state.prefix_word + val.image_uri }} style={{ height: height, width: width, flex: 1, alignSelf: 'center', marginBottom: 20 }} />
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
                                                    <Text style={[val.flag == true ? { color: 'skyblue' } :  //成立就什麼都不做，不成立顏色變成grey
                                                        { color: 'grey' }]}>支持 </Text>

                                                </TouchableOpacity>
                                                <View style={[val.flag == true ? { display: 'flex' } :  
                                                    { display: 'none' }]}>
                                                    <Text >(已給予支持) </Text>
                                                </View>

                                            </View>
                                        </Card>
                                    </View>
                                )
                            })
                        }

                    </Content>
                </ScrollView>
            </Container>
        );
    }
}











