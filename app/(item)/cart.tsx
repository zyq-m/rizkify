import Toast from '@/components/Toast';
import { ItemT } from '@/constants/type';
import api from '@/utils/axios';
import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';
import {
  Text,
  ScrollView,
  VStack,
  Box,
  HStack,
  Image,
  Button,
  Badge,
  Pressable,
  useToast,
} from 'native-base';
import { useEffect, useState } from 'react';

type RequestItemT = {
  id: number;
  item: ItemT;
  item_id: number;
  quantity: number;
  email: string;
  completed: boolean;
};

export default function RequestList() {
  const [item, setItem] = useState<RequestItemT[]>([]);
  const isFocussed = useIsFocused();

  const fetchItem = async () => {
    try {
      const itemRes = await api.get('/item/my-request');
      setItem(itemRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isFocussed && fetchItem();
  }, []);

  return (
    <ScrollView>
      {item.length ? (
        <VStack space={2} safeAreaX={2}>
          {item.map((d) => (
            <RequestComponent key={d.id} {...d} refresh={fetchItem} />
          ))}
        </VStack>
      ) : (
        <Text color="gray.500" textAlign="center">
          Nothing yet
        </Text>
      )}
    </ScrollView>
  );
}

function RequestComponent(item: RequestItemT & { refresh: () => void }) {
  const toast = useToast();

  const onCompleted = async () => {
    try {
      await api.put(`/item/request/${item.id}`);
      item.refresh();
      toast.show({
        placement: 'top',
        render: () => (
          <Toast
            toast={toast}
            title="Item received"
            desc={`You have marked ${item.item.name} as received.`}
          />
        ),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Pressable onPress={() => router.push(`/(item)/${item.item_id}`)}>
      <HStack
        background={item.completed ? 'gray.100' : 'white'}
        p="3"
        alignItems="center"
        justifyContent="space-between"
        rounded="sm"
      >
        <HStack space="4" alignItems="center">
          <Image
            source={{
              uri: `${process.env.EXPO_PUBLIC_API_URL}/${item.item.images?.[0].uri}`,
            }}
            alt={item.item.name}
            height={90}
            width={90}
            rounded="md"
          />
          <Box>
            <Text mb={1}>{item.item.name}</Text>
            <Text color="blueGray.600" textTransform="capitalize">
              {item.item.category.name} category
            </Text>
            <Text color="blueGray.400">{item.quantity} item</Text>
          </Box>
        </HStack>

        <Box>
          {item.completed ? (
            <Badge variant="outline" colorScheme="success" rounded="full">
              Completed
            </Badge>
          ) : (
            <Button onPress={onCompleted} size="sm" rounded="full">
              Received
            </Button>
          )}
        </Box>
      </HStack>
    </Pressable>
  );
}
