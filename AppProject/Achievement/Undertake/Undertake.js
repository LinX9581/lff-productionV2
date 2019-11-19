import React from 'react';
import { Text, View, } from 'react-native';
import { Container, Header, Body, Left, Right, Tab, Tabs, ScrollableTab } from "native-base";
import { AntDesign } from '@expo/vector-icons';
import Food from './Food_Undertake'
import Tourism from './Tourism_Undertake'
import Puzzle from './Puzzle_illustration'

export default class App extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            // page_indication: 0
        }
    }
   

    componentDidMount() {
      
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
                        <Body style={{ alignItems: 'flex-end' }} ><Text>可參與</Text></Body>
                        <Right />

                    </Header>
                    <Tabs renderTabBar={() => <ScrollableTab />}
                    >
                        <Tab heading="美食類">
                            <Food
                                user={this.props.navigation.state.params.user}
                                navigation={this.props.navigation}
                            />
                        </Tab>
                        <Tab heading="旅遊類">
                            <Tourism
                                user={this.props.navigation.state.params.user}
                                navigation={this.props.navigation}
                            />
                        </Tab>
                        <Tab heading="益智類">
                            <Puzzle
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
