// import { useUserStore } from "@/store/store";
// import { BASE_URL } from "@/utils/axios";
// import { socket } from "@/utils/io";
// import { useLocalSearchParams } from "expo-router";
// import { Text, VStack } from "native-base";
// import { useState, useEffect, useCallback } from "react";
// import { GiftedChat, IMessage } from "react-native-gifted-chat";

// export default function ChatScreen() {
// 	const { email } = useUserStore();
// 	const [messages, setMessages] = useState<IMessage[] | []>([]);
// 	const { pEmail, text } = useLocalSearchParams() as {
// 		chatId?: number;
// 		pEmail?: string;
// 		image?: string;
// 		text?: string;
// 	};

// 	const onSend = useCallback((messages: IMessage[] = []) => {
// 		const text = messages[0].text;
// 		// If chatId is not set (first message), send recipientId to create/find chat
// 		socket.emit("sendMessage", {
// 			senderId: email,
// 			recipientId: pEmail,
// 			text,
// 		});
// 		socket.emit("getMessages", pEmail);
// 	}, []);

// 	// Format backend message to GiftedChat message
// 	function formatMessage(msg: any): IMessage {
// 		const message: IMessage = {
// 			_id: msg.id,
// 			text: msg.text,
// 			createdAt: msg.createdAt,
// 			sent: msg.sent,
// 			received: msg.received,
// 			user: {
// 				_id: msg.user.email,
// 				name: msg.user.name,
// 				avatar: `${BASE_URL}/${msg.user.avatar}`,
// 			},
// 		};

// 		return message;
// 	}

// 	useEffect(() => {
// 		if (text && email) {
// 			onSend([
// 				{ _id: 1, createdAt: new Date(), text: text, user: { _id: email } },
// 			]);
// 		}
// 	}, [text, email]);

// 	useEffect(() => {
// 		socket.emit("joinChat", email, pEmail);
// 		socket.on("chatHistory", (messages) => {
// 			const formattedMsgs = messages.map((msg) => formatMessage(msg));
// 			setMessages(formattedMsgs);
// 		});

// 		// listening to new messages
// 		socket.on("newMessage", (messages) => {
// 			setMessages((previous) =>
// 				GiftedChat.append(previous, [formatMessage(messages)])
// 			);
// 		});
// 	}, []);

// 	if (!messages.length) {
// 		return (
// 			<VStack alignItems={"center"} justifyContent={"center"}>
// 				<Text textAlign={"center"}>Nothing to show</Text>
// 			</VStack>
// 		);
// 	}

// 	return (
// 		<GiftedChat
// 			messages={messages}
// 			onSend={(messages) => onSend(messages)}
// 			user={{
// 				_id: email ?? "",
// 			}}
// 		/>
// 	);
// }

import { View, Text } from "native-base";
import React from "react";

export default function ChatScreen() {
	return (
		<View>
			<Text>ChatScreen</Text>
		</View>
	);
}
