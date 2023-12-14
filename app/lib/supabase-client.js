import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://rkszafdaagimhhmbmnci.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrc3phZmRhYWdpbWhobWJtbmNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzMTk3ODksImV4cCI6MjAxNjg5NTc4OX0.JhYfBpYNV0N9d7iNDSbqg6OUZAvpI7_X69uInV84BII"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})