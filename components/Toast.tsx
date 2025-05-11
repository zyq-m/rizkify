import {
  Alert,
  Box,
  CloseIcon,
  HStack,
  IconButton,
  Text,
  VStack,
} from 'native-base';

import { IToastService } from 'native-base/lib/typescript/components/composites/Toast';

export default function Toast({
  title,
  desc,
  toast,
}: {
  title: string;
  desc: string;
  toast: IToastService;
}) {
  // const toast = useToast();

  return (
    <Alert w="100%" status="success" mx="auto">
      <VStack space={2} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          space={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text
              fontSize="md"
              fontWeight="medium"
              _dark={{
                color: 'coolGray.800',
              }}
            >
              {title}
            </Text>
          </HStack>
          <IconButton
            variant="unstyled"
            _focus={{
              borderWidth: 0,
            }}
            icon={<CloseIcon size="3" />}
            _icon={{
              color: 'coolGray.600',
            }}
            onPress={() => toast.closeAll()}
          />
        </HStack>
        <Box
          pl="6"
          _dark={{
            _text: {
              color: 'coolGray.600',
            },
          }}
        >
          {desc}
        </Box>
      </VStack>
    </Alert>
  );
}
