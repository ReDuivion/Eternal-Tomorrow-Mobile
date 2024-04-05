import "react-native-url-polyfill/auto";

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://eqncpdwlkhpuemqxutxa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbmNwZHdsa2hwdWVtcXh1dHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0MjczNzMsImV4cCI6MjAyNTAwMzM3M30.qkTqz4qCHE1z9ekQ19COZJ_as5q1eU4P1YNqIrZeYOk",
  {
    auth: {
      autoRefreshToken: false, // All my Supabase access is from server, so no need to refresh the token
      detectSessionInUrl: false, // We are not using OAuth, so we don't need this. Also, we are manually "detecting" the session in the server-side code
      persistSession: false, // All our access is from server, so no need to persist the session to browser's local storage
    },
  }
);
