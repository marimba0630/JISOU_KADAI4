import { useForm } from "react-hook-form";
import { Button, Box, Text, Stack, Field, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { user_id: "" }, mode: "onBlur" });

  const navigater = useNavigate();

  const viewMeishi = (data: { user_id: string }) => {
    navigater(`/cards/${data.user_id}`);
  };

  return (
    <>
      <Box>
        <Text data-testid="title" fontWeight="semibold" fontSize="xl" textAlign="center">
          デジタル名刺
        </Text>
      </Box>
      <Stack gap={4} align="center">
        <Field.Root alignItems="center" required invalid={!!errors.user_id}>
          <Field.Label htmlFor="use_id">ユーザーID</Field.Label>
          <Input
            id="user_id"
            data-testid="user_id"
            w="200px"
            margin="10px"
            {...register("user_id", {
              validate: (value) =>
                value.trim() !== "" || "閲覧にはユーザーIDは必須です",
            })}
          ></Input>
          <Field.ErrorText data-testid="user_id_error">{errors.user_id?.message}</Field.ErrorText>
        </Field.Root>
        <Button
          colorPalette="teal"
          w="150px"
          onClick={handleSubmit(viewMeishi)}
        >
          名刺検索
        </Button>
        <Button
          colorPalette="teal"
          w="150px"
          onClick={() => navigater("/cards/register")}
        >
          新規登録はこちら
        </Button>
      </Stack>
    </>
  );
};
