import React, { Component } from "react";
import { Image, Button, StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Left, Right, View } from "native-base";
import { AntDesign } from '@expo/vector-icons';

export default class CardItemBordered extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentWillMount() {


    }


    render() {



        return (
            <Container>
                <Content padder>
                    <Card>
                        <CardItem bordered>
                            <Body>
                                <Text style={[styles.line_height, { marginTop: 15 }]}>
                                    活動方式 : 選擇喜歡的題型作答，達到 70% 以上的正確率，即可完成成就
                                </Text>
                                <Text style={styles.line_height}>
                                    內容 : 回答十項內容
                                </Text>
                                <Text style={styles.line_height}>
                                    達成條件 : 70% 的答題正確率
                                </Text>
                                <View style={{ marginVertical: 20, display: this.state.Display_Btn_Add_Post }}>

                                    <Button
                                        onPress={() => this.props.navigation.navigate('Puzzle_Undertake',
                                            {
                                                user: this.props.navigation.state.params.user,
                                                navigation: this.props.navigation
                                            }
                                        )}

                                        title="開始進行"
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
