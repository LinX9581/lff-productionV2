
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import React, { Component } from 'react';
import { Container, Header, Body, Left, Right, Content, Card, CardItem, Icon } from "native-base";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

var question_history = [
    ["帆布鞋是時下年輕人的鞋子首選，下列何者為帆布鞋開始流行的年代?", "1. 1920年代", "2. 1940年代", "3. 1820年代", "4. 1890年代", "2"],
    ["西裝是現代商業人士必備服飾，然而在18世紀初就誕生了，請問下列何者為當時穿著西裝的由來? ", "1. 結婚", "2. 教師授課", "3. 表演使用", "4. 歐洲皇室聚會", "4"],
    ["1917年7月斐迪南大公被暗殺，開始爆發第一次世界大戰，請問此戰役結束時間為何?", "1. 1918年", "2. 1923年", "3. 1928年", "4. 1933年", "1"],
    ["越南位於東南亞，亞洲四小虎之一，由越南共產黨一黨專制，請問在越戰中擊敗哪個國家並成立越南社會主義共和國?", "1. 英國", "2. 日本", "3. 美國", "4. 中國", "3"],
    ["相傳珍珠奶茶的創始店是春水堂，那麼全台灣第一間春水堂位於何處呢?", "1. 台北市", "2. 台中市", "3. 高雄市", "4. 台南市", "2"],
    ["旗袍為中國古典衣飾，發源地為上海，請問當時是哪個始發群體?", "1. 舞者", "2. 學生", "3. 醫生", "4. 護士", "2"],
    ["韓戰是朝鮮民主主義人民共和國政權與大韓民國政權的戰役，兩邊對稱對朝鮮半島的控制權，然而在1953年簽訂停戰協議，並於哪個位置設為領導邊境?", "1. 北緯38度線", "2. 南緯38度線", "3. 北緯83度線", "4. 南緯83度線", "1"],
    ["2019年為中共建國70周年，於1949年成立中國人民共和國，請問中國共產黨成立於何時?", "1. 1921年", "2. 1931年", "3. 1941年", "4. 1891年", "1"]

]

var question_science=[
    ["下列那一種大氣成分能吸收紫外線?", "1. 氧氣", "2. 氮氣", "3. 臭氧", "4. 氯氣", "3"],
    ["光纖通訊是利用下列那個原理?", "1. 反射", "2. 繞射", "3. 全反射", "4. 干涉", "3"],
    ["下列那一種核融合反應，使星球離開主序帶，形成紅巨星 ?", "1. 氫融合成氦", "2. 氦融合成碳", "3. 碳融合成氧", "4. 氧融合成氖", "2"],
    ["粉筆與豆腐，均含有下列何種礦物?", "1. 石英", "2. 滑石", "3. 石膏", "4. 雲母", "3"],
    ["俗稱電木的材料是", "1. 聚乙烯", "2. 酚甲醛樹脂", "3. 聚苯乙烯", "4. 聚丙烯", "2"],
    ["常在很陡的懸崖底部見到因重力而堆成的堆積物是", "1. 礫岩", "2. 角礫岩", "3. 冰磧岩", "4. 砂岩", "2"],
    ["下列各種電磁波中.何者頻率最高?", "1. 微波", "2. 紅外線", "3. 紫外線", "4. 藍色光", "3"],
    ["引起破傷風的病原菌，其形狀屬於下列那一類?", "1. 球菌", "2. 螺旋菌", "3. 桿菌", "4. 螺旋體", "3"],
    ["下列人類的血管，何者循流的血液為缺氧血", "1. 主動脈", "2. 肺動脈", "3. 肺靜脈", "4. 冠狀動脈", "2"],
    ["下列何元素具有半導體之性質", "1. 碳", "2. 氧", "3. 硼", "4. 矽", "4"]   

]

var get_type_of_question ={
    "question_history": question_history,
    "question_science": question_science
}


export default class App extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            message: "進入下一題",
            question_history: question_history,
            get_list: []
        }
    }


    componentDidMount() {   
   
        fetch('http://lff-production.linxnote.club/api_achievement_list_undertake', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: this.props.navigation.state.params.user,
                category: '益智類'
            })
        }).then(res => res.json())
            .then((jsonData) => {              
                this.state.get_list = []
                if (jsonData.message.length == 0) {
                    this.setState({
                        no_data: true
                    })
                    return;
                }
                for (var i = 0; i < jsonData.message.length; i++) {
                    this.state.get_list.push(jsonData.message[i])
                }
                this.setState({
                    get_list: this.state.get_list
                })
            })
            .catch((err) => {
                console.log('錯誤: Puzzle_Undertake ', err);
            })

    }

    render() {
        if (this.state.get_list.length != 0) {
            return (

                <Container>
                    <Header transparent 
                    >
                        <Left>
                            <AntDesign name="left" style={{ paddingLeft: 10 }} size={25}
                                onPress={() => this.props.navigation.navigate('Achievement')}
                            ></AntDesign>
                        </Left>
                        <Body style={{ alignItems: 'flex-end' }} ><Text>可參與</Text></Body>
                        <Right />

                    </Header>
                    <Content padder>
                        <Card>
                            {
                                this.state.get_list.map((val, index) => {
                                    return (
                                        <TouchableOpacity key={index} onPress={() => this.props.navigation.navigate('Puzzle_topic'
                                            , { question_topic: get_type_of_question[val.content], user: this.props.navigation.state.params.user, activity_id: val.activity_id })

                                        }>
                                            <CardItem bordered={true} style={{ justifyContent: 'space-between' }}>
                                                <Image style={{width: 50, height: 50}} source={require('../../../IMG/question.png')}/>
                                                <Text>{val.title}</Text>
                                                <Right>
                                                    <Icon name="arrow-forward" />
                                                </Right>
                                            </CardItem>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </Card>
                    </Content>
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
                                onPress={() => this.props.navigation.navigate('Undertake', {user: this.props.navigation.state.params.user} )}
                            ></AntDesign>
                        </Left>

                        <Body style={{ alignItems: 'flex-end' }} ><Text>可參與</Text></Body>
                        <Right>
                         
                        </Right>
                    </Header>
                    <View style={styles.container}>
                        <Text>目前未有可參與的成就</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
      
    }
})

