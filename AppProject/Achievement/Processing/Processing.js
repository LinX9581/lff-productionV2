import React from 'react';
import { Text, View, } from 'react-native';
import { Container, Header, Body, Left, Right, Tab, Tabs, ScrollableTab } from "native-base";
import { AntDesign } from '@expo/vector-icons';
import Food from './Food_Processing'
// import Tourism from './Tourism_Undertake'
// import Puzzle from './Puzzle_Undertake'

export default class App extends React.Component {
  

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <Container>
                <View style={{ flex: 1 }}>
                    <Header transparent 
                    >
                        <Left>
                            <AntDesign name="left" style={{ paddingLeft: 10 }} size={25}
                                onPress={() => this.props.navigation.navigate('Achievement')}
                            ></AntDesign>
                        </Left>
                        <Body style={{ alignItems: 'flex-end' }} ><Text>進行中</Text></Body>
                        <Right />

                    </Header>
                    <Tabs renderTabBar={() => <ScrollableTab />}>
                        <Tab heading="美食類">
                            <Food
                                user={this.props.navigation.state.params.user}
                                navigation={this.props.navigation}
                            />
                        </Tab>
                
                    </Tabs>
                </View>
            </Container>
        )

    }
}
