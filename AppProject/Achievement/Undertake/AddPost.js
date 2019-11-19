import React, { Component } from "react";
import { View, Text, TouchableOpacity, AsyncStorage, CameraRoll, Image } from 'react-native';
import { Container, Header, Content, Body, Input, Item } from "native-base";
import { Ionicons,  AntDesign } from '@expo/vector-icons';
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants"; // 常數


let hit_count;
let get_day;

export default class AddPosts extends Component {
    static navigationOptions = { //不讓此頁出現在drawer
        drawerLabel: () => null
    }

    constructor(props) {
        super(props)

        this.state = {
            content: '',
            user: ''
        }
    }

 
    componentDidMount() {
        get_day = new Date();    
        this.setState({
            date: get_day.getFullYear() + "-" + (get_day.getMonth() + 1) + "-" + get_day.getDate() 
        })         
        hit_count=0;      
        this._loadInitalState().done();
        this.getPermissionAsync(); //取得授權
    }

    _loadInitalState = async () => {
        var value = await AsyncStorage.getItem('@username')

        if (value !== null) {
            this.setState({ user: value })
        }
        else {
            console.log("value is null")
        }
    }


    CreatePost = async() => {
        if(hit_count==0){
            console.log('first click')        
            await uploadImageAsync(this.state.banana, this.state.user, this.props.navigation.state.params.val.activity_id, this.props.navigation.state.params.val.title, this.state.date ,this.state.content)
            .then((success)=>{
                if(success == true ){
                this.props.navigation.navigate('Achievement')
                }
                else{
                    console.log("not complete")
                }
            })        
        }
        else{
            console.log('more than once')
        }               
    }

    getPermissionAsync = async () => { 
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== "granted") { 
                alert("Sorry, we need camera roll permissions to make this work!");
            }
        }
    }

    _takePhoto = async () => {       
        const { status: cameraPerm } = await Permissions.askAsync(
            Permissions.CAMERA  
        );

        const { status: cameraRollPerm } = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );

        if (cameraPerm === "granted" && cameraRollPerm === "granted") {
            var result = await ImagePicker.launchCameraAsync({ 
                allowsEditing: true,
                aspect: [3, 3],
            });

        }

        if (result.cancelled) {      
            return;
        }
        else {
            CameraRoll.saveToCameraRoll(result.uri);
        }
    };

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({ 
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, //是否能編輯圖片
            aspect: [3, 3], //比例
        });     

        if (!result.cancelled) { 
            this.setState({ banana: result.uri });                   
        }
        if (result.cancelled) {    
            return;
        }
    };


  

    render() {
        let { banana } = this.state;// URL
        return (
            <Container>
                <Header transparent
                >
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <AntDesign name="left" style={{ paddingLeft: 10 }} size={25}
                            onPress={() => this.props.navigation.navigate('Detail',{val: this.props.navigation.state.params.val, user: this.state.user,  display: 'Display_Btn_Add_Post'}  )}></AntDesign>
                    </View>
                    <Body style={{ flex: 1, alignItems: 'center' }} ><Text>新增貼文</Text></Body>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }} onPress={() => this.CreatePost(hit_count)}>
                        <View>
                            <Text>Post</Text>
                        </View>
                    </TouchableOpacity>
                </Header>

                <Content padder>
                    <Item regular style={{ marginTop: 20, height: 250, marginLeft: 10, marginRight: 10 }} >
                        <Input placeholder="請輸入內容" multiline={true}
                            onChangeText={(content) => this.setState({ content })}
                        />
                    </Item>
                    <Image source={{ uri: banana }} style={{ width: 50, height: 50, marginLeft: 10, marginTop: 15 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 12 }}>
                        <AntDesign name="picture" style={{ paddingLeft: 10 }} size={25}
                            onPress={this._pickImage}
                        ></AntDesign>
                        <AntDesign name="camerao" style={{ paddingLeft: 10 }} size={25}
                            onPress={this._takePhoto}
                        ></AntDesign>
                    </View>                 
                </Content>
            </Container>
        );
    }
}


async function uploadImageAsync(uri, user, activity_id, title, date, content) {
    return new Promise(resolve => {
    if (uri == undefined) {
        alert("請上傳圖片")
    }
    else {  
        hit_count++;    
        let fileType = uri.substring(uri.lastIndexOf(".") + 1);   
        let formData = new FormData();

        formData.append("myImage", {
            uri,
            name: `photo.${fileType}`, 
            type: `image/${fileType}` 
        });

        formData.append("account", user);
        formData.append("activity_id", activity_id);   
        formData.append("function", "image_for_post");

        fetch("http://lff-production.linxnote.club/api_uploadphoto", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body:  formData,
        }).then(res => res.json())
            .then((jsonData) => {
                console.log("結果" + jsonData.success)
                fetch('http://lff-production.linxnote.club/api_create_post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        activity_id: activity_id,
                        user: user,
                        title: title,
                        content: content,
                        date: date
                    })
                })
                    .then(res => res.json())
                    .then((jsonData) => {
                        if (jsonData.success === true) {
                            alert("發文成功!")     
                            resolve(true)                                     
                        }
                        else {
                            alert("請稍後再嘗試")
                        }
                    })
                    .catch((err) => {
                        console.log('錯誤: AddPosts', err);
                    })        
            })

            .catch(function (error) {
                console.log(
                    "There has been a problem with your fetch operasdation: " + error.messagemimetype
                );
            });
    }
})

}