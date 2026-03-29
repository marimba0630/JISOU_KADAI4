import { supabase } from "../utils/supabaseClients";
import { UserRecord, UserSkillRecord, SkillRecord, MeishiRecord, } from "../domain/record";
export const getAllRecords = async (table_name) => {
    const { data, error } = await supabase.from(table_name).select("*");
    if (error) {
        throw new Error(error.message);
    }
    switch (table_name) {
        case "users":
            return data.map((r) => UserRecord.newUserRecord(r.user_id, r.name, r.description, r?.github_id ?? "", r?.qiita_id ?? "", r?.x_id ?? "", r.created_at));
        case "user_skill":
            return data.map((r) => UserSkillRecord.newUserSkillRecord(r.id, r.user_id, r.skill_id, r.created_at));
        case "skills":
            return data.map((r) => SkillRecord.newSkillRecord(r.id, r.name, r.created_at));
    }
};
export const getSpecifyMeishiRecord = async (user_id) => {
    const { data, error } = await supabase
        .from("users")
        .select(`
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
      `)
        .eq("user_id", user_id)
        .single();
    if (error) {
        throw new Error(error.message);
    }
    const MeishiData = MeishiRecord.createMeishi(data.user_id, data.name, data.description, data.user_skill.map((us) => us.skills.name), data?.github_id ?? "", data?.qiita_id ?? "", data?.x_id ?? "");
    return MeishiData;
};
export const insertNewMeishiRecord = async (data) => {
    const response_users = await supabase.from("users").insert({
        user_id: data.user_id,
        name: data.name,
        description: data.description,
        github_id: data.github_id,
        qiita_id: data.qiita_id,
        x_id: data.x_id,
    });
    if (response_users.error) {
        throw new Error(response_users.error.message);
    }
    const respones_user_skill = await supabase
        .from("user_skill")
        .insert({ user_id: data.user_id, skill_id: Number(data.skill) });
    if (respones_user_skill.error) {
        throw new Error(respones_user_skill.error.message);
    }
};
