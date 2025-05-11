import FormInput from '@/components/FormInput';
import api from '@/utils/axios';
import { Button, VStack } from 'native-base';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

type PasswordT = {
  oldPass: string;
  newPass: string;
  reTypePass: string;
};

export default function ChangePassword() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PasswordT>();
  const [isSubmit, setIsSubmit] = useState(false);

  const onChangePassword = handleSubmit(async (data) => {
    setIsSubmit(true);
    try {
      const changePass = await api.put('/profile/change-password', data);

      console.log(changePass.data);
    } catch (error) {
      console.log(error);
    }
    setIsSubmit(false);
  });

  return (
    <VStack safeAreaX={4} safeAreaTop>
      <Controller
        name="oldPass"
        rules={{ required: true }}
        control={control}
        render={({ field }) => (
          <FormInput
            label="Old password"
            options={{
              type: 'password',
              variant: 'underlined',
              onChangeText: field.onChange,
              ...field,
            }}
            error={errors.oldPass?.message}
          />
        )}
      />
      <Controller
        name="newPass"
        rules={{ required: true }}
        control={control}
        render={({ field }) => (
          <FormInput
            label="New password"
            options={{
              type: 'password',
              variant: 'underlined',
              onChangeText: field.onChange,
              ...field,
            }}
            error={errors.newPass?.message}
          />
        )}
      />
      <Controller
        name="reTypePass"
        rules={{ required: true }}
        control={control}
        render={({ field }) => (
          <FormInput
            label="Retype password"
            options={{
              type: 'password',
              variant: 'underlined',
              onChangeText: field.onChange,
              ...field,
            }}
            error={errors.reTypePass?.message}
          />
        )}
      />
      <Button
        mt="3"
        onPress={onChangePassword}
        isLoading={isSubmit}
        isLoadingText="Submitting"
      >
        Change Password
      </Button>
    </VStack>
  );
}
