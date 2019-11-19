import { AppLoading, Asset, Linking } from "expo";
import React, { Component } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { GiftedChat } from "react-native-gifted-chat"; // 0.3.0

import AccessoryBar from "./example-expo/AccessoryBar";
import CustomView from "./example-expo/CustomView";
import NavBar from "./example-expo/NavBar";
import messagesData from "./example-expo/data/messages";
import earlierMessages from "./example-expo/data/earlierMessages";

import Fire from "./Fire";

state = {
  name: null,
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

const user = {
  // _id: 1,
    name: "this.props.navigation.state.params.name",
    _id: 1,
    avatar: "https://placeimg.com/140/140/any",
};
class Chat extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || "Chat!",
  });

  state = {
    messages: [],
    inverted: false,
    step: 0,
    messages: [],
    loadEarlier: true,
    typingText: null,
    isLoadingEarlier: false,
  };

  _isMounted = false;

  get user() {
    return {
      name: this.props.navigation.state.params.name,
      _id: Fire.shared.uid,
      avatar: "https://placeimg.com/140/140/any",
    };
  }

  render() {
    return (
      <View
        style={styles.container}
        accessible
        accessibilityLabel="main"
        testID="main"
      >
        <NavBar />
        <GiftedChat
          messages={this.state.messages}
          onSend={Fire.shared.send}
          // onSend={this.onSend}
          user={this.user}
          onLongPressAvatar={user => alert(JSON.stringify(user))}
          //載入更久之前的留言
          loadEarlier={this.state.loadEarlier}
          onLoadEarlier={this.onLoadEarlier}
          isLoadingEarlier={this.state.isLoadingEarlier}
          //針對留言的關鍵字 觸發事件
          parsePatterns={this.parsePatterns}

          scrollToBottom
          onPressAvatar={() => alert('short press')}
          keyboardShouldPersistTaps='never'

          //AccessoryBar
          renderAccessory={Platform.OS === 'web' ? null : this.renderAccessory}
          renderCustomView={this.renderCustomView}
          quickReplyStyle={{ borderRadius: 2 }}

          inverted={Platform.OS !== 'web'}
          timeTextStyle={{ left: { color: 'red' }, right: { color: 'yellow' } }}

        />
      </View>
    );
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({
      messages: messagesData, // messagesData.filter(message => message.system),
      appIsReady: true,
    });

    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    this._isMounted = false;
    Fire.shared.off();
  }

  onLoadEarlier = () => {
    this.setState(previousState => {
      return {
        isLoadingEarlier: true,
      }
    })

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState(previousState => {
          return {
            messages: GiftedChat.prepend(
              previousState.messages,
              earlierMessages,
              Platform.OS !== 'web',
            ),
            loadEarlier: false,
            isLoadingEarlier: false,
          }
        })
      }
    }, 1000) // simulating network
  }

  onSend = (messages = []) => {
    Fire.shared.send
    const step = this.state.step + 1
    this.setState(previousState => {
      const sentMessages = [{ ...messages[0], sent: true, received: true }]
      return {
        messages: GiftedChat.append(
          previousState.messages,
          sentMessages,
          Platform.OS !== 'web',
        ),
        step,
      }
    })
  }

  parsePatterns = linkStyle => {
    return [
      {
        pattern: /#(\w+)/,
        style: { textDecorationLine: 'underline', color: 'darkorange' },
        onPress: () => Linking.openURL('http://lifeforfun.herokuapp.com'),
      },
    ]
  }

  renderCustomView(props) {
    return <CustomView {...props} />
  }

  onSendFromUser = (messages = []) => {
    const createdAt = new Date()
    const user = {
      // _id: 1,
        name: "this.props.navigation.state.params.name",
        _id: Fire.shared.uid,
        avatar: "https://placeimg.com/140/140/any",
    };
    console.log(messages)
    const messagesToUpload = messages.map(message => ({
      ...message,
      user,
      createdAt,
      _id: Math.round(Math.random() * 1000000),
    }))
    this.onSend(messagesToUpload)
  }

  renderAccessory = () => <AccessoryBar onSend={this.onSendFromUser} />

}

export default Chat;
