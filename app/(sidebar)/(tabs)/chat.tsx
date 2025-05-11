import { useUserStore } from '@/store/store';
import { BASE_URL } from '@/utils/axios';
import { socket } from '@/utils/io';
import { useIsFocused } from '@react-navigation/native';
import dayjs from 'dayjs';
import { router } from 'expo-router';
import {
  Avatar,
  Box,
  FlatList,
  Heading,
  HStack,
  Pressable,
  Text,
} from 'native-base';
import { useEffect, useState } from 'react';

type ChatList = {
  id: number;
  participants: {
    avatar: string;
    name: string;
    email: string;
  };
  messages: {
    text: string;
    createdAt: Date;
  };
};

export default function ChatListScreen() {
  const isFocused = useIsFocused();
  const [chats, setChats] = useState<ChatList[]>();
  const { email } = useUserStore();

  useEffect(() => {
    socket.emit('registerChatNotification', email);
    // fetch list of user's messages
    socket.emit('getMessages', email);
    socket.on('onMessages', (message) => {
      setChats(message);
    });
  }, [isFocused]);

  return (
    <Box>
      <FlatList
        data={chats}
        renderItem={({ item }) => <ChatList {...item} />}
        ItemSeparatorComponent={() => <Box height="1" />}
      />
    </Box>
  );
}

function ChatList(chat: ChatList) {
  return (
    <Pressable
      onPress={() =>
        router.navigate({
          pathname: `/(chat)/${chat.participants.name}`,
          params: {
            pEmail: chat.participants.email,
            chatId: chat.id,
          },
        })
      }
    >
      <HStack
        space={3}
        alignItems="center"
        bgColor="white"
        py="5"
        px="3"
        rounded="sm"
      >
        <Avatar
          source={{ uri: `${BASE_URL}/${chat.participants.avatar}` }}
        ></Avatar>
        <Box flex="1">
          <HStack justifyContent="space-between">
            <Heading fontSize="md">{chat.participants.name}</Heading>
            <Text fontSize="xs" color="gray.500">
              {dayjs(chat.messages.createdAt).format('DD/MM/YYYY')}
            </Text>
          </HStack>
          <Text color="gray.500">{chat.messages.text}</Text>
        </Box>
      </HStack>
    </Pressable>
  );
}
