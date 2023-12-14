// HomePage.js
import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { supabase } from "../../lib/supabase-client";
import { SafeAreaView } from 'react-native-safe-area-context';
import useSupabaseAuthUser from '../../hooks/userdata';
import { StatusBar } from 'expo-status-bar';
import * as Progress from 'react-native-progress';
import ProgressBar_Coding from './ProgressBar_Coding'
import ProgressBar_Video from './ProgressBar_Videos';

export default function HomePage() {

  const user = useSupabaseAuthUser();

  const [progress, setProgress] = useState(0);
  const [data, setData] = useState(null);
  const [image, setImage] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
       if (user) {
          const response = await supabase.from('profiles').select("*").eq("id", user.id);
          setData(response.data);
       }
    };
    fetchData();
    if (user) {
       pfpGrabber();
    }
 }, [user]);
 
  const displayUsername = data && data.length > 0 ? data[0].username : "User";
  

  const pfpGrabber = async() => {
    const { data } = supabase
    .storage
    .from('avatars')
    .getPublicUrl(`${user.id}/profile_picture.jpg`)
    setImage(data.publicUrl)
  }

  const handleRecordInserted = (payload) => {
    console.log("INSERT", payload);
    setData(oldData => [...oldData, payload.new])
  }
  
  const handleRecordUpdated = (payload) => {
    console.log("UDPATE", payload);
    setData(oldData => oldData.map(item => {
      if (item.id === payload.old.id) {
        return payload.new;
      } else {
        return item;
      }
    }));
  }
  
  useEffect(() => {
    supabase
      .channel('schema-db-changes')
      .on('postgres_changes', {event: 'UPDATE', schema: 'public', table: 'profiles'}, handleRecordUpdated)
      .on('postgres_changes', {event: 'INSERT', schema: 'public', table: 'profiles'}, handleRecordInserted)
      .subscribe()
  }, [user])


  return (
     <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.imageBox}>
        {image && <Image source={{ uri: image }} style={styles.image} />} 
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>{displayUsername}</Text>
      </View>
      <View style={styles.cardContainer}>
     <ProgressBar_Coding data={data}/>
      </View>
      <View style={styles.cardContainer}>
     <ProgressBar_Video data={data}/>
      </View>
     </SafeAreaView>
  );   
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#121212"
  },
  imageBox: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.9, 
    shadowRadius: 4,
    elevation: 8, 
  },
  image: {
    width: 140, 
    height: 140, 
    borderRadius: 100,
    
  },
  header: {
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: 'center',

  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: 'bold',
  },
  videoProgress: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  cardContainer: {
    backgroundColor: '#242424', 
    padding: 20, 
    margin: 14, 
    borderRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, 
    shadowRadius: 3,
    elevation: 8, 
  },
});
