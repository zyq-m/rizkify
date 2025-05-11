import CardItem from '@/components/CardItem';
import Toast from '@/components/Toast';
import { ItemT } from '@/constants/type';
import api from '@/utils/axios';
import { AntDesign } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Image,
  Pressable,
  ScrollView,
  Text,
  useToast,
  VStack,
} from 'native-base';
import { useEffect, useState } from 'react';

type CategoryT = {
  id: string;
  name: string;
  image?: string;
};

export default function HomeScreen() {
  const [category, setCategory] = useState<CategoryT[]>([]);

  const [items, setItems] = useState<ItemT[]>([]);
  const isFocused = useIsFocused();
  const toast = useToast();

  const fetchItems = async () => {
    try {
      const [itemRes, categoryRes] = await Promise.allSettled([
        api.get('/item', { params: { take: 3 } }),
        api.get('/category'),
      ]);
      itemRes.status == 'fulfilled' && setItems(itemRes.value.data);
      categoryRes.status == 'fulfilled' && setCategory(categoryRes.value.data);
    } catch (error) {
      // do popup
      console.log(error);
    }
  };

  async function addFav(id: number) {
    api.post('/favourite', { itemId: id }).then((res) => {
      toast.show({
        placement: 'top',
        render: () => (
          <Toast title="Success" desc={res.data.message} toast={toast} />
        ),
      });
    });
  }

  useEffect(() => {
    isFocused && fetchItems();
  }, [isFocused]);

  return (
    <ScrollView>
      <Box
        bg="white"
        rounded="sm"
        alignItems="center"
        borderRadius="sm"
        overflow="hidden"
        position="relative"
        mb="4"
      >
        <AspectRatio w="full">
          <Image
            source={{
              uri: 'https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            alt=""
          />
        </AspectRatio>
        <Center
          position="absolute"
          top="0"
          bottom="0"
          left="0"
          right="0"
          bg="rgba(0, 0, 0, 0.27)"
        >
          <Heading color="white" fontSize="4xl">
            Rizkify
          </Heading>
          <Text color="white" fontSize="lg">
            Connecting Surplus, Empowering Communities
          </Text>
          <Button
            rightIcon={<Icon as={AntDesign} name="right" size="xs" />}
            mt="3"
            px="5"
            rounded="full"
            bg="#EFB255"
          >
            Try Now
          </Button>
        </Center>
      </Box>

      <VStack safeAreaX={2} backgroundColor="warmGray.100" py="4" space="6">
        <Box>
          <Heading mb="4" fontSize="md" textTransform="uppercase">
            Category
          </Heading>
          <Flex direction="row" wrap="wrap" justify="space-between">
            {category?.map((c) => (
              <Pressable
                key={c.id}
                onPress={() =>
                  router.navigate({
                    pathname: '/(sidebar)/(tabs)/search',
                    params: {
                      categoryId: c.id,
                    },
                  })
                }
                mb={2}
              >
                <AspectRatio width="183">
                  <Image
                    rounded="md"
                    source={{
                      uri: c.image,
                    }}
                    alt={c.name}
                  />
                </AspectRatio>
                <Text>{c.name}</Text>
              </Pressable>
            ))}
          </Flex>
        </Box>

        <Box>
          <Heading mb="4" fontSize="md" textTransform="uppercase">
            Suggested
          </Heading>
          <VStack space={2} mb="4">
            {items.map((item) => (
              <CardItem key={item.id} {...item} onFav={() => addFav(item.id)} />
            ))}
          </VStack>
        </Box>
      </VStack>
    </ScrollView>
  );
}
