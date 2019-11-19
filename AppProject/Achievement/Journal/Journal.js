import React, { Component } from "react";
import { Text, Button, TouchableOpacity, Image, StyleSheet, CameraRoll, TextInput, Dimensions } from 'react-native';
import { Container, Header, Content, Icon, Picker, Form, Left, Right, Body, Item, Input, View, DatePicker } from "native-base";
import { FontAwesome, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants"; 

let hit_count;
let get_day;
let width = Dimensions.get('window').width*0.9 
export default class PickerWithIconStyle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: '',
            content: '',
        };

    }

    componentDidMount() {  
        get_day = new Date();      
        this.setState({
            date: get_day.getFullYear() + "-" + (get_day.getMonth() + 1) + "-" + get_day.getDate() 
        })     
        if (this.props.navigation.state.params.source == "Post_page") {
            this.setState({
                source: "Post",
                theme : this.props.navigation.state.params.title
            })
        }
        else {
            this.setState({
                source: "Achievement"
            })
        }
        hit_count = 0;
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => { //官方的 > 取得授權
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
            allowsEditing: true, 
            aspect: [3, 3], 
        });

        if (!result.cancelled) { 
            this.setState({ banana: result.uri });                       
        }
        if (result.cancelled) {
            return;
        }
    }

    CreateJoural = async () => {
        if (hit_count == 0) {
            await uploadImageAsync(this.state.banana, this.props.navigation.state.params.user, this.state.theme, this.state.date, this.state.content)
                .then((success) => {
                    if (success == true) {                 
                        alert("發布成功");
                        this.props.navigation.navigate(this.state.source);
                    }
                    else {
                        console.log("not complete")
                    }
                })
        }
        else {
            console.log('more than once')
        }
    }




    render() {            
        let { banana } = this.state;
        return (
            <Container>
                <Image style={styles.background} source={require('../../../IMG/background_profile.png')} />
                <Header transparent 
                >
                    <Left>
                        <AntDesign name="left" style={{ paddingLeft: 10 }} size={25}
                            onPress={() => this.props.navigation.navigate(this.state.source)}
                        ></AntDesign>
                    </Left>
                    <Body style={{ alignItems: 'flex-end' }} ><Text>新增紀錄</Text></Body>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }} onPress={() => this.CreateJoural()}>
                        <View>
                            <Text>Post</Text>
                        </View>
                    </TouchableOpacity>
                </Header>

                <Content>
                   
                    <Form style={[this.props.navigation.state.params.source == "Post_page" ? { marginVertical: 20, display: 'flex' } : { marginVertical: 20, display: 'none' }]}>
                        <Item inlineLabel style={{ borderColor: '#DDDDDD', marginRight:10 }}>
                            <TextInput placeholder="請輸入主題"
                                value={this.props.navigation.state.params.title}                                
                            />
                        </Item>
                    </Form>
                    <Form style={[this.props.navigation.state.params.source == undefined ? { marginVertical: 10, display: 'flex' } : { marginVertical: 20, display: 'none' }]}>
                        <Item inlineLabel style={{ borderColor: '#DDDDDD', marginRight:10  }}>
                            <Input placeholder="請輸入主題"
                                onChangeText={(theme) => this.setState({ theme })}
                                value={this.props.navigation.state.params.title}
                            />
                        </Item>
                    </Form>
                    <Item regular style={{ marginTop: 15, height: 140, marginLeft: 10, marginRight: 10 }} >
                        <Input placeholder="想記錄什麼"
                            onChangeText={(content) => this.setState({ content })}
                        />
                    </Item>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 8 }}>
                        <AntDesign name="picture" style={{ paddingLeft: 10 }} size={25}
                            onPress={this._pickImage}
                        ></AntDesign>
                        <AntDesign name="camerao" style={{ paddingLeft: 10 }} size={25}
                            onPress={this._takePhoto}
                        ></AntDesign>
                    </View>       
                    <View style={{alignItems: 'center'}}>
                        <Image source={{ uri: banana }} style={{ width: width, height: width-10, marginVertical: 15}} />                                 
                    </View>
                </Content>
            </Container>
        );
    }
}

async function uploadImageAsync(uri, user, title, date, content) { 
    return new Promise(resolve => {

        if (title == "") {
            alert("請輸入主題");
            return;
        }
        if (uri == undefined) {
            alert("請上傳圖片");
            return;
        }

        hit_count++;
        let fileType = uri.substring(uri.lastIndexOf(".") + 1);  
        let formData = new FormData(); 

        formData.append("myImage", {
            uri,
            name: `photo.${fileType}`,       
            type: `image/${fileType}`      
        });

        formData.append("account", user);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("date", date);
        formData.append("function", "journal_post");

        fetch("http://lff-production.linxnote.club/api_uploadphoto", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        }).then(res => res.json())
            .then((jsonData) => {
                resolve(true)
            })

            .catch(function (error) {
                console.log(
                    "There has been a problem with your fetch operasdation: " + error.messagemimetype
                );
            });
    })

}

const styles = StyleSheet.create({
    background: {
        height: 800,
        width: 600,
        position: 'absolute',
    }
});
