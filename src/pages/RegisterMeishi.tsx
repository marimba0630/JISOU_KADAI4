import { Card, Text, Box, Stack } from "@chakra-ui/react";

export const RegisterMeishi = () => {
  return (
    <>
      <Box>
        <Text fontWeight="semibold" fontSize="xl" textAlign="center">
          新規名刺登録
        </Text>
      </Box>
      <Card.Root>
        <Card.Body></Card.Body>
      </Card.Root>
    </>
  );
};
