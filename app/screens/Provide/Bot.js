import React, { useState, useCallback, useEffect, Component } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View, StyleSheet } from "react-native";
import { Header } from "react-native-elements";
import { v4 } from "uuid";
import Back from "../../components/Back";
import Dialogflow from "react-native-dialogflow";

Dialogflow.setConfiguration(
  "85fc49676fb346dba06ba64af290b335",
  Dialogflow.LANG_SPANISH
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const random = [3, 4, 5, 6, 7, 8, 9, 10];
var i = 1;
function ra() {
  i += 1;
  return random[i];
}

class Bot extends Component {
  constructor(props) {
    super(props);
    const { navigation } = props;

    this.navigation = navigation;
    this.state = {
      messages: [],
      user: {
        _id: ra(),
        name: "Chatbot",
        avatar: "https://api.adorable.io/avatars/116/abott@adorable.png",
      },
    };
  }

  onSend(messages = []) {
    this.appendToChat(messages);

    this.sendQuery(messages).done();
  }

  appendToChat(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  async sendQuery(messages = []) {
    var nuevo = "";
    Dialogflow.requestQuery(
      messages[0].text,
      (result) => {
        this.appendToChat([
          {
            _id: ra(),
            text: result.result.fulfillment.speech,
            createdAt: new Date(),
            user: this.state.user,
          },
        ]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  render() {
    return (
      <View style={styles.container} behavior="padding">
        <Back navigation={this.navigation} color="#000"></Back>
        <GiftedChat
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    );
  }
}

export default Bot;
