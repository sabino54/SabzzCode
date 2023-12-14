
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase-client';
import { Alert } from 'react-native';

const useSupabaseAuthUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        Alert.alert("Error Accessing User");
      } else {
        setUser(data.user);
      }
    };

    fetchUser();
  }, []);

  return user;
};

export default useSupabaseAuthUser;
