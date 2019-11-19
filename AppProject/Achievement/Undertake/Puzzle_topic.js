import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React, { Component } from 'react';
import { Container, Header, Body, Left, Right, Content } from "native-base";
import { Ionicons, AntDesign } from '@expo/vector-icons';

var correct_answer;
var count;
var question_topic;
var random_num_array;

function getRandom(x) {
    return Math.floor(Math.random() * x)
}


function get_order() {
    var n = 0;
    var result = []

    for (i = 0; i < 4; i++) {//抓多少個數字
        n = getRandom(8) //參數是準備的題目數量+1，n 是random 出來的值	
        if (result.indexOf(n) > -1) {
            i -= 1;
            continue;
        }
        else {
            result.push(n)
        }
    }

    return (result)
}

export default class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }


    next(message) {
        if (count == 3) {
            var correct_rate = correct_answer / 4
            var next_step;
            if (correct_rate > 0.7) {
                next_step = "恭喜完成此成就，請至已完成區塊確認"
            }
            else {
                next_step = "您的正確率不及70%，請繼續加油!"
            }
            Alert.alert(
                'Alert',
                message,
                [
                    {
                        text: '觀看結果', onPress: () =>

                            Alert.alert(
                                'Alert',
                                '您的答對率 : ' + correct_rate * 100 + "%\n" + next_step,
                                [
                                    { text: '前往已完成頁面', onPress: () => this.props.navigation.navigate("Complete", { user: this.props.navigation.state.params.user }) },
                                    { text: 'ok', onPress: () => null }
                                ]
                            )
                    },

                ],
                { cancelable: false }
            );
            if (correct_rate >= 0.7) {

                fetch('http://lff-production.linxnote.club/api_set_achievement_compelted', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user: this.props.navigation.state.params.user,
                        activity_id: this.props.navigation.state.params.activity_id,

                    })
                }).then(res => res.json())
                    .then((jsonData) => {
                        console.log(jsonData.success)
                    })
                    .catch((err) => {
                        console.log('錯誤: Puzzle_topic', err);
                    })
            }

            this.props.navigation.navigate('Undertake', { user: this.props.navigation.state.params.user })

            return;
        }
        alert(message)
        count++;
        curret_question = question_topic[random_num_array[count]]
        console.log(curret_question)
        this.setState({
            curret_question: curret_question
        })
    }


    componentWillMount() {
        console.log(this.props.navigation.state.params.question_topic)


        correct_answer = 0
        count = 0;
        random_num_array = get_order()
        question_topic = this.props.navigation.state.params.question_topic;
        console.log(question_topic[random_num_array[count]])
        this.setState({
            curret_question: question_topic[random_num_array[count]],  //抓現在該在哪一題 
            no_data: false
        })
    }


    render() {
        if (this.state.curret_question != undefined)
            return (
                <Container style={{ marginBottom: 10 }}>
                    <Header transparent
                    >
                        <Left>
                            <AntDesign name="left" style={{ paddingLeft: 10 }} size={25}
                                onPress={() => this.props.navigation.navigate('Undertake', { user: this.props.navigation.state.params.user })}
                            ></AntDesign>
                        </Left>

                        <Body style={{ alignItems: 'flex-end' }} ><Text>歷史類</Text></Body>
                        <Right>

                        </Right>
                    </Header>
                    <Content>
                        <View style={styles.container}>
                            <View style={{ marginHorizontal: 25, marginBottom: 25, }}>
                                <Text style={{ lineHeight: 40, fontSize: 18 }}>{this.state.curret_question[0]}</Text>

                            </View>
                            {/*  split 用在答案 3. XXX 中間的空格 */}
                            <TouchableOpacity style={styles.button} onPress={() => [this.state.curret_question[5] == "1" ? correct_answer++ & this.next("答對了") : this.next("答錯了! 正確答案是 : " + this.state.curret_question[this.state.curret_question[5]].split(' ')[1])]} >
                                <Text style={{ lineHeight: 30, fontSize: 16 }}>{this.state.curret_question[1]}</Text>

                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => [this.state.curret_question[5] == "2" ? correct_answer++ & this.next("答對了") : this.next("答錯了! 正確答案是 : " + this.state.curret_question[this.state.curret_question[5]].split(' ')[1])]} >
                                <Text style={{ lineHeight: 30, fontSize: 16 }}>{this.state.curret_question[2]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => [this.state.curret_question[5] == "3" ? correct_answer++ & this.next("答對了") : this.next("答錯了! 正確答案是 : " + this.state.curret_question[this.state.curret_question[5]].split(' ')[1])]} >
                                <Text style={{ lineHeight: 30, fontSize: 16 }}>{this.state.curret_question[3]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => [this.state.curret_question[5] == "4" ? correct_answer++ & this.next("答對了") : this.next("答錯了! 正確答案是 : " + this.state.curret_question[this.state.curret_question[5]].split(' ')[1])]} >
                                <Text style={{ lineHeight: 30, fontSize: 16 }}>{this.state.curret_question[4]}</Text>
                            </TouchableOpacity>
                        </View>
                    </Content>
                </Container >

            );
        else {
            return (
                <Container>
                    <Header transparent
                    >
                        <Left>
                            <AntDesign name="left" style={{ paddingLeft: 10 }} size={25}
                                onPress={() => this.props.navigation.navigate('Achievement')}
                            ></AntDesign>
                        </Left>

                        <Body style={{ alignItems: 'flex-end' }} ><Text>歷史類</Text></Body>
                        <Right>

                        </Right>
                    </Header>
                    <View style={styles.container}>
                        <ActivityIndicator size="small" color="gray" />
                    </View>
                </Container>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 10
    },
    button: {
        margin: 5,
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#77DDFF',
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },

})

