import React from 'react';
import {
  Box,
  FormControl,
  Input,
  Stack,
  WarningOutlineIcon,
  Button,
  Center,
  Heading,
  VStack,
  ScrollView,
} from 'native-base';
import { InterfaceInputProps } from 'native-base/lib/typescript/components/primitives/Input/types';
import { useForm, Controller } from 'react-hook-form';
import api from '@/utils/axios';
import { useUserStore } from '@/store/store';
import { router } from 'expo-router';

type SignUpForm = {
  username: string;
  name?: string;
  email: string;
  phone: string;
  password: string;
};

export default function SignUp() {
  const { control, handleSubmit } = useForm<SignUpForm>();
  const { setEmail } = useUserStore();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const newUser = await api.post('/auth/sign-up', data);

      setEmail(newUser.data.email);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <ScrollView w="100%" bg="#FFF8E1">
      <Box safeAreaTop={16} px="4">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
          fontWeight="semibold"
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: 'warmGray.200',
          }}
          fontWeight="medium"
          size="xs"
        >
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Username"
                options={{
                  type: 'text',
                  onChangeText: field.onChange,
                  ...field,
                }}
              />
            )}
          />
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Name"
                options={{
                  type: 'text',
                  onChangeText: field.onChange,
                  ...field,
                }}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Email"
                options={{
                  type: 'text',
                  onChangeText: field.onChange,
                  ...field,
                }}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Phone Number"
                options={{
                  type: 'text',
                  onChangeText: field.onChange,
                  ...field,
                }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Password"
                options={{
                  type: 'password',
                  onChangeText: field.onChange,
                  ...field,
                }}
              />
            )}
          />
          <Button mt="2" bg="#EFB255" onPress={onSubmit}>
            Sign up
          </Button>
        </VStack>
      </Box>
    </ScrollView>
  );
}

function FormInput({
  label,
  error,
  helper,
  options,
}: {
  label: string;
  options: InterfaceInputProps;
  helper?: string;
  error?: string;
}) {
  return (
    <FormControl>
      <Stack>
        <FormControl.Label>{label}</FormControl.Label>
        <Input {...options} />
        <FormControl.HelperText>{helper}</FormControl.HelperText>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {error}
        </FormControl.ErrorMessage>
      </Stack>
    </FormControl>
  );
}
