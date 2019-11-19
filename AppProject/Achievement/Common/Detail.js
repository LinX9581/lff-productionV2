import React, { Component } from "react";
import { Image, Button, StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Left, Right, View } from "native-base";
import { AntDesign } from '@expo/vector-icons';

export default class CardItemBordered extends Component {
    static navigationOptions = { //不讓此頁出現在drawer
        drawerLabel: () => null
    }

    constructor(props) {
        super(props)
        this.state = {
            user: '',
            Display_Btn_Look_Post: 'none',
            Display_Btn_Add_Post: 'none',
            Display_Map: 'none',
            source: '' //是從哪個頁面來的 > 用在返回
        }
    }

    componentWillMount() {
        console.log(this.props.navigation.state.params.display)
        if (this.props.navigation.state.params.display == 'Display_Btn_Add_Post')
        {
            console.log('true')
            this.setState({
                Display_Btn_Add_Post: 'flex',
                source: 'Undertake'
            })
        }
        if (this.props.navigation.state.params.display == 'Display_Btn_Look_Post_Processing') 
        {
            this.setState({
                Display_Btn_Look_Post: 'flex',
                source: 'Processing'

            })
        }
        if (this.props.navigation.state.params.display == 'Display_Btn_Look_Post_Complete') 
        {
            this.setState({
                Display_Btn_Look_Post: 'flex',
                source: 'Complete'

            })
        }
        if (this.props.navigation.state.params.display == 'Display_Map') {
            this.setState({
                Display_Map: 'flex',
                source: 'Undertake'

            })
        }
    }


    render() {
        const images = {
            "shop": require('../../../IMG/shop.jpg'),      
            "shop_2": require('../../../IMG/shop_2.jpg'),
            "shop_3": require('../../../IMG/shop_3.jpg'),
            "shop_4": require('../../../IMG/shop_4.jpg'),
            "shop_5": require('../../../IMG/shop_5.jpg'),
            "shop_6": require('../../../IMG/shop_6.jpg'),
            "shop_7": require('../../../IMG/shop_7.jpg'),
            "shop_8": require('../../../IMG/shop_8.jpg'),
            "shop_9": require('../../../IMG/shop_9.jpg'),
            "shop_10": require('../../../IMG/shop_10.jpg'),
            "shop_11": require('../../../IMG/shop_11.jpg'),
            "Taipei_101": require('../../../IMG/taipei_101.png'),
            "new_taipei_city": require('../../../IMG/new_taipei_city.png'),
            "history": require('../../../IMG/history.png'),
            "science": require('../../../IMG/science.png'),
            "ice_shop": require('../../../IMG/ice_shop.png'),
            "memorial_hall": require('../../../IMG/memorial_hall.png'),
            "zoo": require('../../../IMG/zoo.jpg'),
            "shu": require('../../../IMG/shu.png'),
            "Market_2": require('../../../IMG/Market_2.png'),
            "Market_1": require('../../../IMG/Market_1.png'),
            "Memorial_hall": require('../../../IMG/memorial_hall.png'),
            "Memorial": require('../../../IMG/Memorial.png'),
            "Park": require('../../../IMG/Park.png'),
            "Park_2": require('../../../IMG/Park_2.png'),
            "Paradise": require('../../../IMG/Paradise.png'),
            "Education_hall": require('../../../IMG/Education_hall.png'),
            "Forbidden_city": require('../../../IMG/Forbidden_city.png'),
            "Shilin": require('../../../IMG/Shilin.png'),
        }
        const source = this.state.source

        if (this.props.navigation.state.params.display == 'show_completed_puzzle') {
            return (
                <Container>
                    
                    <Header transparent 
                    >
                        <Left>
                            <AntDesign name="left" style={{ paddingLeft: 10 }} size={25}
                                onPress={() => this.props.navigation.navigate('Complete', { user: this.props.navigation.state.params.user })}
                            ></AntDesign>
                        </Left>
                        <Body style={{ alignItems: 'flex-end' }} ><Text>恭喜已完成</Text></Body>
                        <Right />
                    </Header>
                    <Content padder>
                        <Card>
                            <CardItem header bordered>
                                <Text> {this.props.navigation.state.params.val.title}</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                    <Image source={images[this.props.navigation.state.params.val.image]}
                                        style={{ flex: 1, width: 280, height: 200, alignSelf: 'center' }} />

                                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                        <AntDesign name="checkcircleo" style={{ paddingLeft: 10, color: '#CCFF33' }} size={25}>


                                        </AntDesign>
                                        <Text> 已完成</Text>

                                    </View>
                                    <View>
                                        <Text>   正確率 : 70%</Text>


                                    </View>

                                </Body>
                            </CardItem>
                        </Card>
                    </Content>
                </Container>
            );
        }

        return (
            <Container>
                <Header transparent
                >
                    <Left>
                        <AntDesign name="left" style={{ paddingLeft: 10 }} size={25}
                            onPress={() => this.props.navigation.navigate(source, { user: this.props.navigation.state.params.user })}
                        ></AntDesign>
                    </Left>
                    <Body style={{ alignItems: 'flex-end' }} ><Text>活動專區</Text></Body>
                    <Right />
                </Header>
                <Content padder>
                    <Card>
                        <CardItem header bordered>
                            <Text> {this.props.navigation.state.params.val.title}</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Image source={images[this.props.navigation.state.params.val.image]}
                                    style={{ flex: 1, width: '95%', height: 250, alignSelf: 'center' }} />

                                <Text style={[styles.line_height, { marginTop: 15 }]}>
                                    地點 : {this.props.navigation.state.params.val.location}
                                </Text>
                                <Text style={styles.line_height}>
                                    內容 : {this.props.navigation.state.params.val.content}
                                </Text>
                                <Text style={styles.line_height}>
                                    達成條件 : {this.props.navigation.state.params.val.condition}
                                </Text>
                                <Text style={styles.line_height}>
                                    成就分類 : {this.props.navigation.state.params.val.category}
                                </Text>
                                <View style={{ marginVertical: 20, display: this.state.Display_Btn_Add_Post }}>

                                    <Button
                                        onPress={() =>
                                            this.props.navigation.navigate("AddPost", { val: this.props.navigation.state.params.val })
                                        }

                                        title="參與活動"
                                        color="#841584"
                                    />
                                </View>
                                <View style={{ marginVertical: 20, display: this.state.Display_Btn_Look_Post }}>

                                    <Button
                                        onPress={() =>
                                            this.props.navigation.navigate("Watch_the_post", { val: this.props.navigation.state.params.val, user: this.props.navigation.state.params.user, display: this.props.navigation.state.params.display  })
                                        }

                                        title="觀看貼文"
                                        color="#841584"
                                    />
                                </View>

                                <View style={{ marginVertical: 20, display: this.state.Display_Map }}>

                                    <Button
                                        onPress={() =>
                                            this.props.navigation.navigate("Maps", { val: this.props.navigation.state.params.val, user: this.props.navigation.state.params.user })
                                        }

                                        title="參與活動"
                                        color="#841584"
                                    />
                                </View>

                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}



const styles = StyleSheet.create({
    line_height: {
        lineHeight: 30,
    },
});
