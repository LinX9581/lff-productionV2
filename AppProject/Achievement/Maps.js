import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity, CameraRoll, Alert } from "react-native";

import * as Location from 'expo-location'
import * as Permissions from "expo-permissions";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from '@expo/vector-icons';

let pointAddress = [
    { "世新大學管理學院": [24.987589, 121.547918] },
    { "公館夜市": [25.013886, 121.534669] },
    { "景美夜市": [24.990821, 121.541741] },
    { "臺北市立動物園": [24.998359, 121.581029] },
    { "中正紀念堂": [25.034615, 121.521752] },
    { "台北101": [25.033851, 121.564537] },
    { "國立國父紀念館": [25.040347, 121.560254] },
    { "松山文創園區": [25.043767, 121.560589] },
    { "華山文創園區": [25.044146, 121.529392] },
    { "台北市兒童新樂園": [25.097262, 121.514915] },
    { "國立灣科學教育館": [25.096143, 121.516688] },
    { "國立故宮博物院": [25.102360, 121.548485] },
    { "士林花園官邸": [25.091548, 121.527368] },
    { "三角冰": [25.00481, 121.53804] },

];

let upload_time = 0;
let num = 0;
const locations = require("../locations.json");
const { width, height } = Dimensions.get("screen");

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            locations: locations,
            serverUserAddressInfo: [],
            target_geographic_location: '',
            display: true,
            clicked_location: {},
            image_display: 'flex'
        };
    }

    async componentDidMount() {
        this.check_landmark();

        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            console.log('please')
        }
        try {
            await Permissions.askAsync(Permissions.LOCATION);
            let location = await Location.getCurrentPositionAsync({});

            this.setState({
                longitude: location.coords.longitude, //經度(垂直) //1XX
                latitude: location.coords.latitude //緯度(水平) //25XX
            })
        }
        catch{
            alert('您必須使用定位功能才能使用成就地圖')
        }

    }

    check_landmark = () => {
        let target = this.props.navigation.state.params.val.location


        fetch('http://lff-production.linxnote.club/api_get_location_info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: this.props.navigation.state.params.user
            })
        }).then(res => res.json())
            .then((jsonData) => {
                let finished_place = []
                for (let i = 0; i < jsonData.success.length; i++) {
                    finished_place.push(jsonData.success[i].location)// 使用者目前完成的點
                }

                let completion_status = [];
                let target_geographic_location = ''
                for (let i = 0; i < pointAddress.length; i++) {
                    completion_status[i] = 0;
                    if (Object.keys(pointAddress[i]) == target) { //抓出這次任務的目標地理位址                            
                        target_geographic_location = pointAddress[i][target].toString()
                    }
                    for (let j = 0; j < finished_place.length; j++) {
                        if (Object.keys(pointAddress[i]).indexOf(finished_place[j]) != -1) {
                            completion_status[i] = 1;
                        }
                    }
                }

                this.setState({
                    serverUserAddressInfo: completion_status,
                    target_geographic_location: target_geographic_location
                })
            })
            .catch((err) => {
                console.log('錯誤: Maps ', err);
            })


    }

    //#################################   底下兩個Button start  ######################################


    successful_verification = async () => {
        if (upload_time == 0) {
            upload_time++;
            fetch('http://lff-production.linxnote.club/api_set_achievement_compelted', {
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

                    if (this.state.clicked_location != {}) {
                        this.markerclick(this.state.clicked_location); //模擬使用者點擊來更新圖片
                    }
                    this.check_landmark();
                })
                .catch((err) => {
                    console.log('錯誤: Maps', err);
                })

        }
        else {
            if (this.state.clicked_location != {}) {
                console.log('complete')
                this.markerclick(this.state.clicked_location);
            }
        }
        await uploadImageAsync(this.state.take_photo_uri, this.props.navigation.state.params.user, this.props.navigation.state.params.val.activity_id, this.props.navigation.state.params.val.title, this.props.navigation.state.params.val.content)
            .then((success) => {
                console.log('upload success')
            })

    }

    //拍照解成就
    _takePhoto = async () => {

        const { serverUserAddressInfo } = this.state;
        const { status: cameraPerm } = await Permissions.askAsync(
            Permissions.CAMERA
        );
        const { status: cameraRollPerm } = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );
        let result;
        if (cameraPerm === "granted" && cameraRollPerm === "granted") {
            result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [3, 3],
            });
        }

        if (result.cancelled) {
            console.log("cancelled")
            return;
        }
        else {
            CameraRoll.saveToCameraRoll(result.uri);
            this.setState({
                take_photo_uri: result.uri

            })
            const getCertainPointUrl =
                // `https://maps.googleapis.com/maps/api/directions/json?origin=24.987589,121.547918&destination=` +
                `https://maps.googleapis.com/maps/api/directions/json?origin=` + this.state.latitude + ',' + this.state.longitude + `&destination=` + //這個是目前的(定位)位置、STEP2
                this.state.target_geographic_location +
                `&key=AIzaSyA6aaKBA92hNkTGwdJGEs1QAIbjGoixmQI`;
            const getCertainPoint = await fetch(getCertainPointUrl);
            const getCertainPointJson = await getCertainPoint.json();
            const distance = getCertainPointJson.routes[0].legs[0].distance.value

            if (distance < 300) {
                Alert.alert(
                    "恭喜完成成就!",
                    "請前往下一個成就",
                    [{ text: "Next", onPress: () => console.log("完成") }],
                    { cancelable: false }
                );
                this.successful_verification();
            }
            else {
                Alert.alert(
                    "地點不符合",
                    "請前往目的地",
                    [{ text: "Next", onPress: () => console.log("失敗") }],
                    { cancelable: false }
                );
            }
        }
    };

    display_mark = () => {
        if (num % 2 == 0) {
            this.setState({
                display: false
            })
        }
        else {
            this.setState({
                display: true
            })
        }
        num++;
    }

    markerclick = (location) => {
        let instead_of_pictures = "";
        fetch('http://lff-production.linxnote.club/api_confirm_this_location', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: this.props.navigation.state.params.user,
                location: location.name
            })
        }).then(res => res.json())
            .then((jsonData) => {
                if (jsonData.result.length == 0) {
                    console.log('尚未完成')
                }
                else {
                    instead_of_pictures = jsonData.result[0].activity_id;
                }

                const {
                    coords: { latitude, longitude },
                } = location;
                console.log(location)

                if (instead_of_pictures != "") {
                    location.image_url = "http://lff-production.linxnote.club/profile/" + this.props.navigation.state.params.user + '/' + instead_of_pictures + "_" + this.props.navigation.state.params.user + '.jpg' + "?time=" + new Date();
                }

                this.setState(
                    {
                        clicked_location: location, //更新位置
                        desLatitude: latitude,
                        desLongitude: longitude,
                        image_display: 'flex'
                    },
                );
            })
            .catch((err) => {
                console.log('錯誤: Maps', err);
            })
    }

    renderMarkers = () => {
        const { locations } = this.state;
        const { serverUserAddressInfo } = this.state;
        return (
            <View>
                {locations.map((location, idx) => {

                    const {
                        coords: { latitude, longitude },
                    } = location;
                    if (serverUserAddressInfo[idx] == "1") {
                        return (
                            <Marker
                                key={idx}
                                title={location.name}
                                coordinate={{ latitude, longitude }}
                                onPress={() => this.markerclick(location)}//傳送這個座標的loaction
                            >
                                <Image
                                    source={require("../../IMG/finish_mark.png")}
                                    style={[this.state.display ? { height: 35, width: 35, display: 'flex' } : { height: 35, width: 35, display: 'none' }]}
                                />
                            </Marker>
                        );
                    } else {
                        return (
                            <Marker
                                key={idx}
                                title={location.name}
                                coordinate={{ latitude, longitude }}
                                onPress={() => this.markerclick(location)}
                            >
                                <Image
                                    source={require("../../IMG/mark.png")}
                                    style={[this.state.display == true ? { height: 35, width: 35, display: 'flex' } : { height: 35, width: 35, display: 'none' }]}
                                />
                            </Marker>
                        );
                    }
                })}
            </View>
        );
    };


    render() {
        if (this.state.latitude) {
            return (
                <View>
                    <MapView
                        showsUserLocation
                        style={styles.mapStyle}
                        initialRegion={{
                            // latitude: 24.988076,
                            // longitude: 121.547923,
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: 0.0922, //縮放用
                            longitudeDelta: 0.0421,
                        }}
                    >
                        {this.renderMarkers()}
                    </MapView>
                    <MaterialCommunityIcons onPress={() => { this.props.navigation.navigate('Achievement') }} style={{ position: "absolute", top: 35, right: 20, color: '#5599FF' }} name="arrow-left-bold-circle" size={35} />
                    <View style={{ display: this.state.image_display, backgroundColor: 'orange' }}>
                        <Image
                            source={{ uri: this.state.clicked_location.image_url + "?time=" + new Date() }}
                            style={{
                                flex: 1,
                                marginHorizontal: 10,
                                width: width * 0.95, //螢幕寬
                                alignSelf: "center",
                                height: height * 0.3, //螢幕高
                                position: "absolute",
                                bottom: 0

                            }}
                        ></Image>
                    </View>
                    <View style={naviStyle.bottmContainer}>
                        <TouchableOpacity
                            style={[naviStyle.button, { backgroundColor: "#53423D" }]}
                        >
                            <Text onPress={this._takePhoto} style={naviStyle.buttonText}>
                                拍照解成就{" "}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[naviStyle.button, { backgroundColor: "#A58987" }]}
                        >
                            <Text onPress={() => this.setState({
                                image_display: 'none'
                            })} style={naviStyle.buttonText}>
                                隱藏圖片
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <Text> 取得定位中 </Text>
            </View>
        );
    }
}

async function uploadImageAsync(uri, user, activity_id, title, content) {
    return new Promise(resolve => {

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
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ecf0f1",
    },
    mapStyle: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height - 100,
    },
});

const naviStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    bottmContainer: {
        height: 60,
        flexDirection: "row",
    },
    button: {
        height: 40,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
    },
});