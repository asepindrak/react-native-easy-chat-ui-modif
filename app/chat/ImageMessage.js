import React, { PureComponent } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Text,
  Dimensions,
} from "react-native";
import { getCurrentTime } from "./utils";

// const { width } = Dimensions.get("window");
export default class ImageMessage extends PureComponent {
  render() {
    const {
      message,
      messageErrorIcon,
      isSelf,
      isOpen,
      reSendMessage,
      chatType,
      showIsRead,
      isReadStyle,
      ImageComponent,
    } = this.props;
    return (
      <View style={[isSelf ? styles.right : styles.left]}>
        <TouchableOpacity
          ref={(e) => (this[`item_${this.props.rowId}`] = e)}
          activeOpacity={1}
          collapsable={false}
          disabled={isOpen}
          onPress={() =>
            this.props.onMessagePress(
              "image",
              parseInt(this.props.rowId),
              message.content.uri,
              message
            )
          }
          style={{
            backgroundColor: "transparent",
            padding: 5,
            borderRadius: 5,
          }}
          onLongPress={() => {
            this.props.onMessageLongPress(
              this[`item_${this.props.rowId}`],
              "image",
              parseInt(this.props.rowId),
              message.content.uri,
              message
            );
          }}
        >
          <View style={{ maxHeight: 300, overflow: "hidden", borderRadius: 5 }}>
            {!isSelf ? (
              <View
                style={{
                  alignSelf: "flex-start",
                  alignContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={[
                    styles.userName,
                    { fontSize: 12, color: "#ccc", alignSelf: "flex-start" },
                  ]}
                >
                  {message.chatInfo.nickName}
                </Text>
              </View>
            ) : null}
            <ImageComponent
              source={{ uri: message.content.uri }}
              style={[
                {
                  width: 230,
                  height:
                    message.content.height / (message.content.width / 230),
                  borderRadius: 5,
                },
              ]}
            />
            <Text
              style={[
                { textAlign: "right", fontSize: 11, color: "#ccc" },
                isReadStyle,
              ]}
            >
              {getCurrentTime(parseInt(message.time))}
            </Text>
            {showIsRead && chatType !== "group" && isSelf && (
              <Text style={[{ textAlign: "right", fontSize: 13 }, isReadStyle]}>
                {this.props.lastReadAt &&
                this.props.lastReadAt - message.time > 0
                  ? "已读"
                  : "未读"}
              </Text>
            )}
          </View>
        </TouchableOpacity>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginRight: 10,
          }}
        >
          {!isSelf ? null : message.sendStatus ===
            undefined ? null : message.sendStatus === 0 ? (
            <ActivityIndicator />
          ) : message.sendStatus < 0 ? (
            <TouchableOpacity
              disabled={false}
              activeOpacity={0.7}
              onPress={() => {
                if (message.sendStatus === -2) {
                  reSendMessage(message);
                }
              }}
            >
              {messageErrorIcon}
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  right: {
    flexDirection: "row-reverse",
    marginRight: 10,
  },
  left: {
    flexDirection: "row",
    marginLeft: 10,
  },
});
