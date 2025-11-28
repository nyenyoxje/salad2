import { environment } from "@/config/environment";
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = environment.SUPABASE_URL
const supabaseKey = environment.SUPABASE_KEY

export const supabase = createBrowserClient(supabaseUrl, supabaseKey);

export default supabase;