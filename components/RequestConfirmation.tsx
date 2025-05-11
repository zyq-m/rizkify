import api from '@/utils/axios';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ItemT } from '@/constants/type';

import {
  Box,
  Text,
  HStack,
  Button,
  VStack,
  Modal,
  Heading,
  useToast,
  Alert,
  IconButton,
  CloseIcon,
  Checkbox,
} from 'native-base';

export default function ConfirmationModal({
  item,
  id,
}: {
  item: ItemT;
  id: string;
}) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isChecked, setChecked] = useState(false);
  const toast = useToast();

  const onRequest = async () => {
    setIsSubmit(true);
    try {
      await api.post(`/item/${id}`, { quantity });

      toast.show({
        placement: 'top',
        render: () => (
          <Alert w="98%" status="success" mx="auto">
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
                    Item added!
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
                New item added to your request cart.
              </Box>
            </VStack>
          </Alert>
        ),
      });

      router.navigate({
        pathname: `/(chat)/${item.user?.name}`,
        params: {
          image: `${item.images?.[0].uri}`,
          name: item.name,
          pEmail: item.user?.email,
          text: 'Hi is this item available?',
        },
      });
      setIsSubmit(false);
      setShowModal(false);
      setShowModal2(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onQuantity = (number: number) => {
    setQuantity((prev) => {
      let tmp = prev + number;
      if (item && tmp >= item.quantity && tmp <= 0) return prev + number;
      return prev;
    });
  };

  return (
    <>
      <Button
        bg="#EFB255"
        isDisabled={!item?.available}
        onPress={() => setShowModal(true)}
      >
        Request This Item
      </Button>
      <Modal isOpen={showModal}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton onPress={() => setShowModal(false)} />
          <Modal.Header>Item</Modal.Header>
          <Modal.Body>
            <HStack alignItems="center" justifyContent="space-between">
              <Text>Quantity</Text>
              <Button.Group variant="outline" isAttached size="sm">
                <Button onPress={() => onQuantity(-1)}>-</Button>
                <Button disabled>{quantity}</Button>
                <Button onPress={() => onQuantity(1)}>+</Button>
              </Button.Group>
            </HStack>
          </Modal.Body>
          <Modal.Footer>
            <Button
              flex="1"
              isLoadingText="Confirm"
              isLoading={isSubmit}
              onPress={() => {
                setShowModal(false);
                setShowModal2(true);
              }}
              bg="#EFB255"
            >
              Continue
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal isOpen={showModal2}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton
            onPress={() => {
              setShowModal(true);
              setShowModal2(false);
            }}
          />
          <Modal.Header>Guidelines</Modal.Header>
          <Modal.Body>
            <VStack space="4">
              <Box>
                <Heading size="md">Do</Heading>
                <Text>Indicate what time you can collect the item</Text>
                <Text>Inform the owner if you're running late</Text>
              </Box>
              <Box>
                <Heading size="md">Don't</Heading>
                <Text>Ask the item to be delivered/posted</Text>
                <Text>Get upset if you don't get something</Text>
                <Text>Set off for a collection untill:</Text>
                <Text>1. It's been confirmed</Text>
                <Text>2. You have the address</Text>
                <Text>3. There's an agreed time</Text>
              </Box>
              <Checkbox
                value="read"
                isChecked={isChecked}
                onChange={setChecked}
              >
                I have read the guidelines
              </Checkbox>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button
              flex="1"
              isLoadingText="Confirm"
              isLoading={isSubmit}
              onPress={onRequest}
              isDisabled={!isChecked}
              bg="#EFB255"
            >
              Continue in chat
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
