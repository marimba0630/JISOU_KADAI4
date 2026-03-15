import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";

const supabaseURL = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseURL!, supabaseKey!);
