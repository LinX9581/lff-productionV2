import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, AsyncStorage, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
import { MaterialIcons, AntDesign, Feather, Ionicons, } from '@expo/vector-icons';
import { Container, Content, Header, Left, Body, Right, Button } from 'native-base'
import * as ImagePicker from "expo-image-picker";
import Personal_article from './Personal_article'
import Personal_journal from './Personal_journal'


var images = [ //匯入圖片(第一個icon頁面用的)
    require('../../IMG/book.jpg'),
    require('../../IMG/hat.png'),
    require('../../IMG/hat1.png'),
    require('../../IMG/hat2.png'),
    require('../../IMG/shirt2.png'),
    require('../../IMG/shirt3.png'),
    require('../../IMG/shirt3.png'),
]

var { width, height } = Dimensions.get('window')

class ProfileTab extends Component {

    static navigationOptions = {   

        tabBarIcon: ({ tintColor }) => (//底部BottomTabIcon
            <MaterialIcons name="person-outline" size={20} style={{ color: tintColor }} />
        )
    }
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 1,   
            prefix_word: 'http://lff-production.linxnote.club/profile/',
            init: false,
            transfer_param: '',
            time: {},
            complted:'',
            num_of_postm:'',
            statistics_praise:''
        }
    }

    componentDidMount() {
        this._loadInitalState().then(()=>{
            this.focusListener =this.props.navigation.addListener('didFocus', () => {              
                 this.checkUserInfo();
            });
        });
      
        this.setState({
            prefix_word: 'http://lff-production.linxnote.club/profile/',
            time: new Date()
        })
    }
    
    checkUserInfo(){       
        fetch('http://lff-production.linxnote.club/api_check_user_info', {
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
                    complted: jsonData.complted,
                    num_of_post: jsonData.num_of_post,
                    statistics_praise: jsonData.statistics_praise
                })             
            })
            .catch((err) => {
                console.log('錯誤: ProfileTab ', err);
            })
    }

    componentWillUnmount() {
        console.log('Unmount ProfileTab Listener')
    }

    _loadInitalState = async () => {
        this.setState({
            reload: 'start'
        })

        var value = await AsyncStorage.getItem('@username')

        if (value !== null) {
            this.setState({
                user: value
            })
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
                    head_sticker_name: jsonData.success,
                    init: true
                })
                this.checkUserInfo();

            })
            .catch((err) => {
                console.log('錯誤: ProfileTab ', err);
            })
    }

    segmentClicked = (index) => { 
        this.setState({
            activeIndex: index
        })
    }

    renderSectionOne = () => {
        return images.map((image, banana) => {
            return (
                <View key={banana} style={[{ width: (width) / 3 }, { height: (width) / 3 }, { marginBottom: 2 }, 
                banana % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }    
                ]}
                >
                    <Image style={{ flex: 1, width: undefined, height: undefined }}
                        source={image}
                    />
                </View>
            )
        })

    }

    renderSection = () => {
        if (this.state.activeIndex == 0) {
            return (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}
                >
                    {this.renderSectionOne()}
                </View>
            )
        }
        else if (this.state.activeIndex == 1) {
            return (
                <View >
                    <Personal_article head_sticker_name={this.state.head_sticker_name} uri={this.state.transfer_param} navigation={this.props.navigation} />
                </View>
            )
        }
        else if (this.state.activeIndex == 2) {
            return (
                <View >
                    <Personal_journal head_sticker_name={this.state.head_sticker_name} uri={this.state.transfer_param} navigation={this.props.navigation} />
                </View>
            )
        }
    }
    callback_upload = () => {
        this.setState({
            init: true,
        });
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({ 
            mediaTypes: ImagePicker.MediaTypeOptions.Images, 
            allowsEditing: true, 
            aspect: [3, 3], //比例
        });

        if (!result.cancelled) {
            this.setState({
                head_sticker_name: result.uri,
                transfer_param: result.uri,
                prefix_word: '', 
                init: false
            });                             
            uploadImageAsync(result.uri, this.state.user, this.callback_upload);


        }
        if (result.cancelled) {
            console.log("cancelled")
            return;
        }

    };
    async log_out(key) {
     
        try {
            await AsyncStorage.removeItem('@' + key);

        }
        catch (exception) {
            return false;
        }
    }

    render() {

        if (this.state.init == true) {
            return (
                <Container style={{
                    flex: 1, backgroundColor: 'white'
                }}>
                    <Header transparent 
                        style={{ alignItems: 'center', backgroundColor: '#F5F5F5' }}
                    >
                        <View style={{ flex: 1 }}></View>
                        <Body style={{ alignItems: 'center', flex: 1 }}><Text>{this.state.user}</Text></Body>
                        <View style={{ flex: 1 }}>
                          
                        </View>
                    </Header>
                    <Content>
                        <View style={{ paddingTop: 10 }}
                        >
                            <View>
                                <View style={styles.coverContainer}>
                                    <ImageBackground
                                        source={{
                                            uri:
                                                "https://images.unsplash.com/photo-1573544906585-9a3dd2a99ba9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                                        }}
                                        style={styles.coverImage}
                                    >
                                    </ImageBackground>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', position: 'absolute', bottom: 0, left: 10 }}
                                >
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            onPress={this._pickImage}
                                        >
                                            <Image source={{ uri: this.state.prefix_word + this.state.head_sticker_name + '?time=' + this.state.time }}
                                                style={{ width: 100, height: 100, borderRadius: 50, borderColor: '#FFF', borderWidth: 2 }} />
                                        </TouchableOpacity>
                                        <Text style={styles.coverName}>{this.state.user}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 3, marginVertical: 20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <View style={{ alignItems: 'center' }} >
                                        <Text>{this.state.complted}</Text>
                                        <Text style={{ fontSize: 15, color: '#888888' }}>成就完成數</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }} >
                                        <Text>{this.state.num_of_post}</Text>
                                        <Text style={{ fontSize: 15, color: '#888888' }}>貼文數</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }} >
                                        <Text>{this.state.statistics_praise}</Text>
                                        <Text style={{ fontSize: 15, color: '#888888' }}>獲得讚數</Text>
                                    </View>
                                </View>
                            </View>

                        

                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#eae5e5' }}
                                >
                               
                                    <Button
                                        transparent
                                        onPress={() => this.segmentClicked(1)
                                        }
                                        active={this.state.activeIndex == 1}
                                    >
                                        <Ionicons name="ios-list"
                                            style={[this.state.activeIndex == 1 ? { color: '#77DDFF', fontSize: 25 } :  //成立就什麼都不做，不成立顏色變成grey
                                                { color: 'grey', fontSize: 25 }]}
                                        />
                                    </Button>

                                    <Button
                                        transparent
                                        onPress={() => this.segmentClicked(2)
                                        }
                                        active={this.state.activeIndex == 2}
                                    >
                                        <AntDesign name="book" style={{ fontSize: 25 }}
                                            style={[this.state.activeIndex == 2 ? { color: '#77DDFF', fontSize: 25 } : 
                                                { color: 'grey', fontSize: 25 }]}
                                        />
                                    </Button>
                                </View>
                            </View>

                            {this.renderSection()}

                        </View>
                    </Content>
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


async function uploadImageAsync(uri, username, callback

) { 
    let fileType = uri.substring(uri.lastIndexOf(".") + 1); 
    let formData = new FormData(); 

    formData.append("myImage", {
        uri,
        name: `photo.${fileType}`, 
        type: `image/${fileType}` 
    });
    console.log(JSON.stringify(formData))
    formData.append("account", username);

    fetch("http://lff-production.linxnote.club/api_uploadphoto", {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    }).then(res => res.json())
        .then((jsonData) => {

            console.log(jsonData.success)
            callback();

        }).catch(function (error) {
            console.log(
                "There has been a problem with your fetch operasdation: " + error.messagemimetype
            );
        });

}

export default ProfileTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    coverImage: {
        height: Dimensions.get('window').width * (3 / 4),
        width: Dimensions.get('window').width,
    },
    coverContainer: {
        marginBottom: 55,
        position: 'relative',
    },
    coverName: {
        color: '#FFF',
        fontSize: 28,
        fontWeight: 'bold',
        paddingBottom: 2,
        marginLeft: 5
    },
})