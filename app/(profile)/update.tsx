import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  ScrollView,
  VStack,
  Text,
  Avatar,
  useToast,
  Alert,
  CloseIcon,
  HStack,
  IconButton,
} from 'native-base';
import { User } from '@/constants/type';
import api from '@/utils/axios';
import { ImageT } from '@/hooks/usePickImage';
import { useIsFocused } from '@react-navigation/native';

export default function UpdateProfileScreen() {
  const [newName, setName] = useState('');
  const [image, setImage] = useState<ImageT>();
  const [profile, setProfile] = useState<User>();
  const toast = useToast();
  const isFocused = useIsFocused();

  const fetchProfile = async () => {
    try {
      const profileRes = await api.get('/profile');
      setProfile(profileRes.data);
      setName(profileRes.data.name);
    } catch (error) {
      // do popup
      console.log(error);
    }
  };

  // Request permission and pick image from library
  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      const { fileName, uri, mimeType } = result.assets[0];
      setImage({ name: fileName ?? uri.split('/').pop(), uri, type: mimeType });
    }
  };

  const onSave = async () => {
    try {
      console.log(image);
      const imgData = new FormData();
      imgData.append('images', image);

      const uploadImages = await api.post('/upload', imgData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!uploadImages.data) {
        toast.show({
          placement: 'top',
          description: 'Failed to upload',
        });
        return;
      }

      const res = await api.put('/profile/edit', {
        name: newName,
        avatar: image?.name,
        email: profile?.email,
      });

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
                    Profile updated!
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
                {res.data.message}
              </Box>
            </VStack>
          </Alert>
        ),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [isFocused]);

  return (
    <ScrollView flex={1} bg="white" p={4}>
      <Center>
        <Box mb={4} alignItems="center">
          <Avatar
            alignSelf="center"
            size="xl"
            source={{
              uri: image?.uri,
            }}
          >
            {profile?.name?.slice(0, 2)}
          </Avatar>
          <Button mt="3" onPress={pickImage} size="sm" variant="outline">
            Change Profile Picture
          </Button>
        </Box>

        <VStack space={4} width="100%">
          <FormControl>
            <FormControl.Label>Name</FormControl.Label>
            <Input
              placeholder="Enter your name"
              value={newName}
              onChangeText={setName}
            />
          </FormControl>

          <Button mt={6} onPress={onSave} bg="#EFB255">
            Save
          </Button>
        </VStack>
      </Center>
    </ScrollView>
  );
}
