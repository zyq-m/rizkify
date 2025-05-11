import { Text, Checkbox, Box, Heading, VStack, Button } from 'native-base';
import React from 'react';

export default function HelpCentre() {
  return (
    <Box mx="4">
      <VStack space="4">
        <Box background="white" rounded="sm" overflow="hidden" p="4" mt="4">
          <Heading>Do</Heading>
          <Text>Indicate what time you can collect</Text>
          <Text>Inform if you're running late</Text>
        </Box>
        <Box background="white" borderRadius="sm" overflow="hidden" p="4">
          <Heading>Don't</Heading>
          <Text>Ask the item to be delivered/posted</Text>
          <Text>Get upset if you dont't get something</Text>
          <Text>Set off for a collection untill</Text>
          <Text>1. It's been confirmed</Text>
          <Text>2. You have the address</Text>
          <Text>3. There's an agreed time</Text>
        </Box>
      </VStack>
      <Checkbox value="read" mt="5" mb="3">
        I have read the guidelines
      </Checkbox>
      <Button borderRadius="full" bg="#EFB255">
        Continue
      </Button>
    </Box>
  );
}
