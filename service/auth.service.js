"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export const AuthLogin = async (payload) => {
  const supabase = await createClient();
  const { email, password } = payload;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      status: false,
      message: error?.message || "Terjadi Error",
    };
  }

  return {
    status: true,
    message: "Berhasil Login",
  };
};

export const AuthProfile = async () => {
  const supabase = await createClient();

  const { data , error } = await supabase.auth.getUser();

   const { data: userRole } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (error) {
    return {
      status: false,
      message: error?.message || "Terjadi Error",
    };
  }

  return {
    status : true,
    data: data,
    role: userRole
  }
}

export const AuthLogout = async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      status: false,
      message: error?.message || "Terjadi Error",
    };
  }

  return {
    status: true,
    message: "Berhasil Keluar",
  };
};
