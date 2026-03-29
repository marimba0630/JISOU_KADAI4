import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/database.types.ts";

const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseURL!, supabaseKey!);
