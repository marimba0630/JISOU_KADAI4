import { useParams } from "react-router-dom";
import { getSpecifyMeishiRecord } from "../lib/supabaseCRUDFunctions";
import { useEffect, useState } from "react";

import { MeishiRecord } from "../domain/record";
import {
  Spinner,
  Card,
  Text,
  Box,
  Stack,
  IconButton,
  Center,
} from "@chakra-ui/react";

import { FaGithubSquare, FaTwitterSquare } from "react-icons/fa";
import { SiQiita } from "react-icons/si";

export const ShowMeishi = () => {
  const { id } = useParams<{ id: string }>();
  const [meishiRecord, setMeishiRecord] = useState<MeishiRecord>();
  const [loadingFlag, setLoadingFlag] = useState<boolean>(true);

  const getMeishiRecord = async () => {
    try {
      const fetchedRecord = await getSpecifyMeishiRecord(id!);
      setMeishiRecord(fetchedRecord);

      if (loadingFlag) {
        setLoadingFlag(false);
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  useEffect(() => {
    getMeishiRecord();
  }, []);

  if (loadingFlag) {
    return <Spinner></Spinner>;
  } else {
    return (
      <>
        <Center minH="100vh">
          <Card.Root maxW="260px" borderRadius="lg" boxShadow="md">
            <Card.Body>
              <Stack>
                <Card.Title>{meishiRecord?.user_name}</Card.Title>
                <Box>
                  <Text fontWeight="semibold">自己紹介</Text>
                  <Text
                    dangerouslySetInnerHTML={{
                      __html: meishiRecord?.description ?? "",
                    }}
                  ></Text>
                </Box>
                <Box>
                  <Text fontWeight="semibold">好きな技術</Text>
                  {meishiRecord?.skills.map((skill_name, key) => (
                    <Text key={key} fontSize="sm">
                      {skill_name}
                    </Text>
                  ))}
                </Box>
                <Stack direction="row" justify="center">
                  <IconButton asChild aria-label="github" variant="ghost">
                    <a href={meishiRecord?.github_url} target="_blank">
                      <FaGithubSquare />
                    </a>
                  </IconButton>
                  <IconButton asChild aria-label="qiita" variant="ghost">
                    <a href={meishiRecord?.qiita_url} target="_blank">
                      <SiQiita />
                    </a>
                  </IconButton>
                  <IconButton asChild aria-label="x" variant="ghost">
                    <a href={meishiRecord?.x_url} target="_blank">
                      <FaTwitterSquare />
                    </a>
                  </IconButton>
                </Stack>
              </Stack>
            </Card.Body>
          </Card.Root>
        </Center>
      </>
    );
  }
};
