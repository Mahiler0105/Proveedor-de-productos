import React, { Component } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View, StyleSheet } from "react-native";
import { Header } from "react-native-elements";
import Back from "../../components/Back";
import { Dialogflow_V2 } from "react-native-dialogflow";

Dialogflow_V2.setConfiguration(
  "dialogflow-rmvmyy@leriet-laeklw.iam.gserviceaccount.com",
  "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCk9nnnC0qRjhSs\nXkNviTc+TMkAXkzuwY3XwELL25/unw1I/pWWi559+BfMANxtRQQ0rq8D1QcUw7GL\nvxt5ppF/obhjWS82a0GvIWNFWveRDeeY6epDcrJX/cfLECQPBQWh0v7EcPrf+FG7\nJ70KznHYhcbbFSLURW7ynQNVaOE2NUyxbWZTxlyIRnpg6usJ/WDrnTcd9x4nHTZD\nbmrWbQqrfwrs5Q0/DydiVXBDen7/AvAupkNBmQol6cDqUImyTd+TNB4o80DZVwuZ\nBvlRsH3F6JvjF04B1gVbD5SQs+gKeIR8Gcwxf7j5/S5rBR7sjZ3rHmbh7kk8i3hS\n0kLnnR6dAgMBAAECggEABZLPTRNYVmEgyS8ZI65U572z59eHzWRMPM8h4p3dwjPt\nALubRb4bYYGtmiaoS+fSS85gGubKabTv7XsMPFi4n0GRR4gGnJXUnwxnfHsllKjN\n26CBmfxI0sjABJgbw8claNGGapAvpbwP1N0zmaceeRSSAqps5hOfe0J7T5ouy8RE\n21fqQG1SHZL/tpYCpeJ1FJt269O/DRPDUv6Mj9FSYjVBuE6gNR6JEoFjYhcSMvAp\ndDTOENrJ5fzVGnj1jVmoHLMWQThLrh8rMAhLDWd/9nNMUqH3BCaHMQTQXiikjTvx\nyETYjlKJAqEMJyPH7cykj3dmJUoeW8C8Ujpah2LJOQKBgQDOyR96JqVd8HspS4Om\nDwau9XyGTf47DpiXc8QejX5Pyp0e9aU4WQ9DQS5qJRlMlqylZMd/qHxWdLQ6gbKj\nlrqJglGHSAVOQQDkRLMiQmq6ufymuDiVCq+CVd8h9plJGvlWLovJ9EX8e1LkvT58\nPskQaQSZW47oHtvTl3APKBBARQKBgQDMOTQK8rTGL2F++Q1LSyFcbY1ztIXzgSvA\nvkekqKzOafTcqxsfTA8wHNJKiUVUSBi9YMZ7fmwDZ9MnviK1XoVwGIzskk48xYBn\nah+DvIPkLQtJXzXSL1ztQ8tE2b+qXeFkymdif3ZWeYN+z6E55MNiSNjmrZ9EsIju\n0Pu83lqmeQKBgQCWmNEM0/JhTM9VjsJtAMp8RxqOcWSyu/mTa2MsYR3ZnJT7RCk0\ntV+xOlpEQYqARcesmI3WQe1zxYCwj157Vz25AajAnkoG6L5ugD35uGckYGlJPicv\nHF4fzMw5Xu/Z1wQ5qKJzzSvfKi1/mvdT4yHpiqIn0g9sq3SrT8Hzt9jGBQKBgQC+\nNPz6wWiLOW/14aJ3IQd2XXakcFteG02T2+VAP/WK3na33AmL0bxHlGBsGYPf5rJc\nF7llJa8WUOoClv0erWVcrRD7+Zwyz8QzDU1C1h6FM0rS0IGBPKmxNjYo7yGrXHrj\n8/vsakjea5iEUH+aOy2a6bxSxRyUzlMLEsuT8gi+CQKBgQCLYdpdlyY349894T+W\nRgJ8QzZfuRo23nNkKLCx7L4hGNT41OGcu/dAqiXFGUfy9iOPFlhKBtlaCZvbBcUj\nlBpKDqJ7FF5Cmb39QnoixNVlNpZ4EWax0DqA6HOZfh4UbiBtPCBAaqwa7axG5lLU\nmlKiw8hSja/2/FYiqvCdschCTQ==\n-----END PRIVATE KEY-----\n",
  Dialogflow_V2.LANG_SPANISH,
  "leriet-laeklw"
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

const random = [
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
];
var i = -1;
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
        avatar:
          "https://firebasestorage.googleapis.com/v0/b/lrtbl-6858b.appspot.com/o/avatar%2Fleon.PNG?alt=media&token=7b6b528a-a45e-4140-bda5-48a8f85d6807",
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
    Dialogflow_V2.requestQuery(
      messages[0].text,
      (result) => {
        // console.log(result);
        let contenido = "";
        let respuesta = result.queryResult.fulfillmentMessages;
        respuesta.forEach((res) => {
          contenido += res.text.text[0] + "\n";
        });
        this.appendToChat([
          {
            _id: ra(),
            text: contenido,
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
        <Back navigation={this.navigation}></Back>
        <Header
          backgroundColor="#242254"
          containerStyle={{
            height: 60,
          }}
          centerComponent={{
            text: "Chatbot Lerietbool",
            style: {
              color: "#fff",
              fontSize: 20,
              marginBottom: 10,
              fontWeight: "bold",
            },
          }}
        />
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
