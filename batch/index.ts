import { supabase } from "../src/utils/supabaseClients";

const todayStart = new Date();
todayStart.setHours(0, 0, 0);

const response_users = await supabase
  .from("users")
  .delete()
  .lt("created_at", todayStart);

if (response_users.error) {
  throw new Error(response_users.error.message);
}

const response_user_skill = await supabase
  .from("user_skill")
  .delete()
  .lt("created_at", todayStart);

if (response_user_skill.error) {
  throw new Error(response_user_skill.error.message);
}
