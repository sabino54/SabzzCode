import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { supabase } from "./lib/supabase-client";
import { StatusBar } from 'expo-status-bar';

export default function IndexPage() {

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/tabs/home/");
      } else {
        console.log("no user");
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace("/tabs/home/");
      } else {
        console.log("no user");
        router.replace("/auth/login");
      }
    });
  }, []);

  return <Stack>

      <Stack.Screen
  name="auth"
  options={{
  headerShown: false,
  }}
  />
        <Stack.Screen
  name="tabs"
  options={{
  headerShown: false,
  }}
  />
  </Stack>

}