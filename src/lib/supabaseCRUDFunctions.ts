import { supabase } from "../utils/supabaseClients";
import {
  UserRecord,
  UserSkillRecord,
  SkillRecord,
  MeishiRecord,
} from "../domain/record";

import type { Database } from "../types/database.types";

type TableMap = {
  users: UserRecord;
  user_skill: UserSkillRecord;
  skills: SkillRecord;
};

type TableRowMap = {
  users: Database["public"]["Tables"]["users"]["Row"];
  user_skill: Database["public"]["Tables"]["user_skill"]["Row"];
  skills: Database["public"]["Tables"]["skills"]["Row"];
};

export const getAllRecords = async <T extends keyof TableMap>(
  table_name: T,
): Promise<TableMap[T][]> => {
  const { data, error } = await supabase.from(table_name).select("*");

  if (error) {
    throw new Error(error.message);
  }

  switch (table_name) {
    case "users":
      return (data as unknown as TableRowMap["users"][]).map((r) =>
        UserRecord.newUserRecord(
          r.user_id,
          r.name,
          r.description,
          r?.github_id ?? "",
          r?.qiita_id ?? "",
          r?.x_id ?? "",
          r.created_at,
        ),
      ) as TableMap[T][];

    case "user_skill":
      return (data as unknown as TableRowMap["user_skill"][]).map((r) =>
        UserSkillRecord.newUserSkillRecord(
          r.id,
          r.user_id,
          r.skill_id,
          r.created_at,
        ),
      ) as TableMap[T][];

    case "skills":
      return (data as unknown as TableRowMap["skills"][]).map((r) =>
        SkillRecord.newSkillRecord(r.id, r.name, r.created_at),
      ) as TableMap[T][];
  }
};

export const getSpecifyMeishiRecord = async (
  user_id: string,
): Promise<MeishiRecord> => {
  const { data, error } = await supabase
    .from("users")
    .select(
      `
        user_id,
        name,
        description,
        user_skill (
          skills (
            name
          )
        ),
        github_id,
        qiita_id,
        x_id
      `,
    )
    .eq("user_id", user_id)
    .single();

  console.log(data);
  if (error) {
    throw new Error(error.message);
  }

  const MeishiData = MeishiRecord.createMeishi(
    data.user_id,
    data.name,
    data.description,
    data.user_skill.map((us) => us.skills.name),
    data?.github_id ?? "",
    data?.qiita_id ?? "",
    data?.x_id ?? "",
  );

  return MeishiData;
};
