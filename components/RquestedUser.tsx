import { RequestedUserT } from '@/constants/type';
import api from '@/utils/axios';
import {
  HStack,
  Avatar,
  Text,
  Spacer,
  Box,
  VStack,
  Badge,
  Button,
  useToast,
} from 'native-base';
import Toast from './Toast';

const RequestedUser = ({
  timestamp,
  id,
  completed,
  quantity,
  user: { avatar, name },
  refresh,
}: RequestedUserT & {
  refresh: () => void;
}) => {
  const toast = useToast();

  const onComplete = async () => {
    try {
      await api.put(`/item/request/${id}`);
      refresh();
      toast.show({
        placement: 'top',
        render: () => (
          <Toast
            toast={toast}
            title="Item received"
            desc={`You have marked ${name} as received.`}
          />
        ),
      });

      // do push notification to requested user
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box p={4}>
      <HStack alignItems="center" space={3}>
        <Avatar size="md" source={{ uri: avatar ?? '' }}>
          {name ? name[0].toUpperCase() : 'U'}
        </Avatar>
        <VStack>
          <Text fontWeight="bold">{name}</Text>
          <Text fontSize="xs" color="gray.500">
            Request {quantity} item {timestamp.toString()}
          </Text>
        </VStack>
        <Spacer />
        <Box>
          {completed ? (
            <Badge variant="outline" colorScheme="success" rounded="full">
              Completed
            </Badge>
          ) : (
            <Button onPress={onComplete} size="sm" rounded="full">
              Mark as received
            </Button>
          )}
        </Box>
      </HStack>
    </Box>
  );
};

export default RequestedUser;
