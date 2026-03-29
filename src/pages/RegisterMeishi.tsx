import { useEffect, useState } from "react";
import {
  Spinner,
  Card,
  Text,
  Box,
  Input,
  Field,
  Stack,
  NativeSelect,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { SkillRecord } from "../domain/record";
import {
  getAllRecords,
  insertNewMeishiRecord,
} from "../lib/supabaseCRUDFunctions";
import { useForm, Controller } from "react-hook-form";
import type { newMeishiFormValues } from "../types/DataType";
import { useNavigate } from "react-router-dom";

export const RegisterMeishi = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [registering, setRegistering] = useState<boolean>(false);
  const [skills, setSkills] = useState<SkillRecord[]>([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<newMeishiFormValues>({
    defaultValues: {
      user_id: "",
      name: "",
      description: "",
      skill: "",
      github_id: "",
      qiita_id: "",
      x_id: "",
    },
    mode: "onBlur",
  });

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const getSkills = async () => {
    try {
      const skill: SkillRecord[] = await getAllRecords("skills");
      setSkills(skill);
      if (loading) {
        setLoading(!loading);
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  const onSubmit = async (newRecord: newMeishiFormValues) => {
    try {
      setRegistering(true);
      //await sleep(1000);
      await insertNewMeishiRecord(newRecord);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setRegistering(false);
    }
  };

  useEffect(() => {
    getSkills();
  }, []);

  if (loading) {
    return (
      <>
        <Spinner />
      </>
    );
  } else {
    return (
      <>
        <Box>
          <Text
            fontWeight="semibold"
            fontSize="xl"
            textAlign="center"
            data-testid="title"
          >
            新規名刺登録
          </Text>
        </Box>
        <Card.Root>
          <Card.Body>
            <Stack gap={4}>
              <Field.Root required invalid={!!errors.user_id}>
                <Field.Label htmlFor="user_id">
                  ID
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  data-testid="user_id"
                  id="user_id"
                  {...register("user_id", {
                    validate: {
                      BlankCheck: (value) =>
                        value.trim() !== "" || "IDの入力は必須です",
                      PatternCheck: (value) =>
                        /^[a-zA-Z]+(-[a-zA-Z]+)*$/.test(value) ||
                        "ハイフンと英語文字列のみです(連続ハイフン不可)",
                    },
                  })}
                />
                <Field.ErrorText data-testid="user_id_error">{errors.user_id?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root required invalid={!!errors.name}>
                <Field.Label htmlFor="name">
                  お名前
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  data-testid="name"
                  id="name"
                  {...register("name", {
                    validate: (value) =>
                      value.trim() !== "" || "名前の入力は必須です",
                  })}
                />
                <Field.ErrorText data-testid="name_error">{errors.name?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root required invalid={!!errors.description}>
                <Field.Label htmlFor="description">
                  自己紹介
                  <Field.RequiredIndicator />
                </Field.Label>
                <Textarea
                  data-testid="description"
                  id="description"
                  rows={5}
                  placeholder="<h1>HTMLタグも使えます</h1>"
                  {...register("description", {
                    validate: (value) =>
                      value.trim() !== "" || "自己紹介の入力は必須です",
                  })}
                />
                <Field.ErrorText data-testid="description_error">{errors.description?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root required invalid={!!errors.skill}>
                <Field.Label htmlFor="skill">
                  好きな技術
                  <Field.RequiredIndicator />
                </Field.Label>
                <Controller
                  name="skill"
                  control={control}
                  rules={{
                    validate: (value) =>
                      String(value).trim() !== "" ||
                      "好きな技術の選択は必須です",
                  }}
                  render={({ field }) => (
                    <NativeSelect.Root>
                      <NativeSelect.Field data-testid="skill" {...field}>
                        <option value="">Select Option</option>
                        {skills.map((record) => (
                          <option value={record.id}>{record.name}</option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  )}
                />
                <Field.ErrorText data-testid="skill_error">{errors.skill?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root>
                <Field.Label htmlFor="github_id">Github ID</Field.Label>
                <Input data-testid="github_id" id="github_id" {...register("github_id")} />
              </Field.Root>
              <Field.Root>
                <Field.Label htmlFor="qiita_id">Qiita ID</Field.Label>
                <Input data-testid="qiita_id" id="qiita_id" {...register("qiita_id")} />
              </Field.Root>
              <Field.Root>
                <Field.Label htmlFor="x_id">X ID</Field.Label>
                <Input data-testid="x_id" id="x_id" {...register("x_id")} />
              </Field.Root>
              <Button
                onClick={handleSubmit(onSubmit)}
                loading={registering}
                colorPalette="teal"
                variant="solid"
              >
                登録
              </Button>
              <Button
                onClick={() => navigate("/")}
                colorPalette="teal"
                variant="solid"
              >
                戻る
              </Button>
            </Stack>
          </Card.Body>
        </Card.Root>
      </>
    );
  }
};
