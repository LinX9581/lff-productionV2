import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, TouchableOpacity, Button } from 'react-native';
import { Container, Header, Body, Left, Right, Content } from "native-base";
import { AntDesign } from '@expo/vector-icons'
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { Dialog } from "react-native-simple-dialogs";

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    componentDidMount() {
        fetch('http://lff-production.linxnote.club/api_get_simulation_info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: this.props.navigation.state.params.user
            })
        }).then(res => res.json())
            .then((jsonData) => {
                jsonData.num_of_complete = 24
                if (jsonData.num_of_complete == 0) {
                    this.setState({
                        no_data: true
                    })
                    return
                }

                else {
                    if (jsonData.num_of_complete < 5) {
                        this.state.egg_level = 0
                    }
                    else if (jsonData.num_of_complete < 10) {
                        jsonData.num_of_complete = jsonData.num_of_complete % 5 //因為會用 5 當分母
                        this.state.egg_level = 1
                    }
                    else if (jsonData.num_of_complete < 15) {
                        jsonData.num_of_complete = jsonData.num_of_complete % 5
                        this.state.egg_level = 2
                    }
                    else if (jsonData.num_of_complete < 20) {
                        jsonData.num_of_complete = jsonData.num_of_complete % 5
                        this.state.egg_level = 3
                    }
                    else if (jsonData.num_of_complete < 25) {
                        jsonData.num_of_complete = jsonData.num_of_complete % 5
                        this.state.egg_level = 4
                    }


                    this.setState({
                        num_of_complete: jsonData.num_of_complete,
                        egg_level: this.state.egg_level
                    })
                }

            })
            .catch((err) => {
                console.log('錯誤: Simulation ', err);
            })
    }
    openDialog = (show) => {
        this.setState({ showDialog: show });
    }






    render() {
        const images = {
            '0': require('../../../IMG/egg_init.png'),
            '1': require('../../../IMG/egg_step1.png'),
            '2': require('../../../IMG/egg_step2.png'),
            '3': require('../../../IMG/egg_step3.png'),
            '4': require('../../../IMG/egg_step4.png')
        }

        if (this.state.no_data != true) {

            return (
                <Container >
                    <Image style={styles.background} source={require('../../../IMG/background_profile.png')} />


                    <Header transparent 
                    >
                        <Left>
                            <AntDesign name="left" style={{ paddingLeft: 10 }} size={25}
                                onPress={() => this.props.navigation.navigate('Achievement')}
                            ></AntDesign>
                        </Left>

                        <Body style={{ alignItems: 'flex-end' }} ><Text>寵物專區</Text></Body>
                        <Right>
                            <TouchableOpacity
                                onPress={() => this.openDialog(true)}
                            >
                                <Text>tips</Text>
                            </TouchableOpacity>
                        </Right>
                    </Header>
                    <View style={styles.container}>
                        <View style={{ marginBottom: 10 }}>
                            <Image source={images[this.state.egg_level]}
                                style={{ width: 120, height: 120, }}
                            />
                        </View>
                        <Text>Level {this.state.egg_level}</Text>
                        <View style={{ marginTop: 15 }}>
                            <ProgressBarAnimated
                                width={100}
                                value={(this.state.num_of_complete / 5) * 100}
                                backgroundColorOnComplete="#6CC644"
                            />
                        </View>

                    </View>
                    <Dialog
                        title="提示"
                        animationType="fade"
                        contentStyle={
                            {
                                alignItems: "center",
                                justifyContent: "center",
                            }
                        }
                        onTouchOutside={() => this.openDialog(false)}
                        visible={this.state.showDialog}
                    >
                       
                        <Text style={{ marginBottom: 30 }}>
                            每完成五個成就即可將寵物升級
                        </Text>
                        <Text style={{ marginBottom: 30 }}>
                            目前已完成成就數量 : {this.state.egg_level * 5 + this.state.num_of_complete}
                        </Text>
                        <Button
                            onPress={() => this.openDialog(false)}
                            style={{ marginTop: 10 }}
                            title="CLOSE"
                        />
                    </Dialog>

                </Container>


            );
        }
        if (this.state.no_data == true) {
            return (
                <Container>
                    <Header transparent 
                    >
                        <Left>
                            <AntDesign name="left" style={{ paddingLeft: 10 }} size={25}
                                onPress={() => this.props.navigation.navigate('Achievement')}
                            ></AntDesign>
                        </Left>

                        <Body style={{ alignItems: 'flex-end' }} ><Text>寵物專區</Text></Body>
                        <Right />
                    </Header>
                    <View style={styles.container}>
                        <Text>請先完成任一成就以解鎖此功能</Text>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        height: 800,
        width: 600,
        position: 'absolute',
    }
})