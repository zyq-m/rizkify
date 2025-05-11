import { ItemT } from '@/constants/type';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  Box,
  AspectRatio,
  HStack,
  Icon,
  Image,
  Text,
  Button,
} from 'native-base';
import { Pressable } from 'react-native';

export default function CardItem({ ...props }: ItemT & { onFav?: () => void }) {
  return (
    <Box key={props.id} background="white" p="3" rounded="sm" overflow="hidden">
      <Pressable>
        <HStack space="2">
          <AspectRatio w="170">
            <Image
              rounded="sm"
              source={{
                uri: `${process.env.EXPO_PUBLIC_API_URL}/${props.images?.[0].uri}`,
              }}
              alt={props.name}
            />
          </AspectRatio>
          <Box flexGrow="1">
            <Box mb="4">
              <Text
                textTransform="capitalize"
                mb="1"
                fontWeight="bold"
                fontSize="md"
              >
                {props.name}
              </Text>
              <HStack justifyContent="space-between">
                <Text fontSize="xs">Quantity: {props.quantity}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text fontSize="xs">Condition: {props.condition}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text
                  fontSize="xs"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  w="40"
                >
                  Description: {props.description}
                </Text>
              </HStack>
            </Box>
            <HStack alignItems="center" justifyContent="flex-end" space="3">
              <Pressable onPress={props?.onFav}>
                <Icon
                  as={MaterialCommunityIcons}
                  name="cards-heart-outline"
                  size="lg"
                  color="red.400"
                />
              </Pressable>
              <Button
                size="sm"
                rounded="full"
                px="4"
                bg="#EFB255"
                onPress={() => router.push(`/(item)/${props.id}`)}
              >
                Request
              </Button>
            </HStack>
          </Box>
        </HStack>
      </Pressable>
    </Box>
  );
}
