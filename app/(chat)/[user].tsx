import React, { useState, useRef, useEffect } from "react";
import { KeyboardAvoidingView, Platform, FlatList } from "react-native";
import {
	Box,
	HStack,
	VStack,
	Input,
	IconButton,
	Icon,
	Text,
	Avatar,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { socket } from "@/utils/io";
import { useLocalSearchParams } from "expo-router";
import { useUserStore } from "@/store/store";
import { BASE_URL } from "@/utils/axios";

type TMessage = {
	id: string;
	text: string;
	createdAt: Date;
	sent?: boolean;
	received?: boolean;
	user: {
		email: string;
		name?: string;
		avatar?: string;
	};
};

export default function ChatScreen() {
	const { email } = useUserStore();
	const { pEmail, text } = useLocalSearchParams() as {
		chatId?: number;
		pEmail?: string;
		image?: string;
		text?: string;
	};
	const [messages, setMessages] = useState<TMessage[] | []>([]);
	const [inputText, setInputText] = useState("");
	const flatListRef = useRef(null);

	// Load older messages
	useEffect(() => {
		socket.emit("joinChat", email, pEmail);
		socket.on("chatHistory", (messages: TMessage[]) => {
			setMessages(messages);
		});

		// listening to new messages
		socket.on("newMessage", (message: TMessage) => {
			setMessages((prev) => [...prev, message]);
		});
	}, []);

	// Scroll to bottom when messages change
	useEffect(() => {
		if (flatListRef.current) {
			flatListRef.current.scrollToEnd({ animated: true });
		}
	}, [messages]);

	const sendMessage = async () => {
		if (inputText.trim() === "") return;
		socket.emit("sendMessage", {
			senderId: email,
			recipientId: pEmail,
			text: text ? text : inputText,
		});
		socket.emit("getMessages", pEmail);
		setInputText("");
	};

	const renderMessage = ({ item }: { item: TMessage }) => {
		const isUser = item.user.email === email;
		const avatar = `${BASE_URL}/${item.user.avatar}`;
		const name = item.user.name?.slice(0, 2);

		return (
			<HStack
				alignItems="flex-end"
				justifyContent={isUser ? "flex-end" : "flex-start"}
				mb={2}
				px={4}
			>
				{!isUser && (
					<Avatar
						size="sm"
						source={{
							uri: avatar,
						}}
						mr={2}
					>
						{name}
					</Avatar>
				)}
				<Box
					bg={isUser ? "primary.500" : "coolGray.200"}
					px={4}
					py={2}
					rounded="lg"
					maxW="75%"
				>
					<Text color={isUser ? "white" : "black"} fontSize="md">
						{item.text}
					</Text>
				</Box>
				{isUser && (
					<Avatar
						size="sm"
						source={{
							uri: avatar,
						}}
						ml={2}
					>
						{name}
					</Avatar>
				)}
			</HStack>
		);
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
			keyboardVerticalOffset={90}
		>
			<VStack flex={1} bg="white">
				<FlatList
					ref={flatListRef}
					data={messages}
					renderItem={renderMessage}
					keyExtractor={(item) => item.id}
					contentContainerStyle={{ paddingVertical: 10 }}
					showsVerticalScrollIndicator={false}
				/>

				<HStack
					px={4}
					py={2}
					alignItems="center"
					borderTopWidth={1}
					borderColor="coolGray.200"
					bg="white"
				>
					<Input
						flex={1}
						variant="filled"
						placeholder="Type a message"
						value={inputText}
						onChangeText={setInputText}
						onSubmitEditing={sendMessage}
						returnKeyType="send"
						bg="coolGray.100"
						borderRadius="full"
						py={2}
						px={4}
					/>
					<IconButton
						icon={
							<Icon
								as={MaterialIcons}
								name="send"
								size="md"
								color="primary.500"
							/>
						}
						onPress={sendMessage}
						ml={2}
						borderRadius="full"
						_pressed={{ bg: "primary.100" }}
					/>
				</HStack>
			</VStack>
		</KeyboardAvoidingView>
	);
}
