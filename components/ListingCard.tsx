import { ItemT } from '@/constants/type';
import { router } from 'expo-router';
import { Box, AspectRatio, HStack, Image, Text, Button } from 'native-base';
import { Pressable } from 'react-native';

type ListingCardProps = {
  item: ItemT;
  showBtn?: boolean;
};

export default function ListingCard({
  item,
  showBtn = true,
}: ListingCardProps) {
  return (
    <Box key={item.id} background="white" p="3" rounded="sm" overflow="hidden">
      <Pressable>
        <HStack space="2">
          <AspectRatio w="170">
            <Image
              rounded="sm"
              source={{
                uri: `${process.env.EXPO_PUBLIC_API_URL}/${item.images?.[0].uri}`,
              }}
              alt={item.name}
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
                {item.name}
              </Text>
              <HStack justifyContent="space-between">
                <Text fontSize="xs">Quantity: {item.quantity}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text fontSize="xs">Condition: {item.condition}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text
                  fontSize="xs"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  w="40"
                >
                  Description: {item.description}
                </Text>
              </HStack>
            </Box>
            {showBtn && (
              <HStack justifyContent="flex-end">
                <Button
                  size="sm"
                  rounded="full"
                  px="4"
                  bg="#EFB255"
                  onPress={() => router.push(`/(listing)/${item.id}`)}
                >
                  People who request this
                </Button>
              </HStack>
            )}
          </Box>
        </HStack>
      </Pressable>
    </Box>
  );
}
