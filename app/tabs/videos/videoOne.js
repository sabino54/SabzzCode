import * as React from 'react';
import { Stack } from 'expo-router';
import { View, StyleSheet, SafeAreaView, Button, ActivityIndicator } from 'react-native';
import myvid from './videoOne.mp4'
import { Video, ResizeMode } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../../lib/supabase-client';
import { useEffect, useState } from "react";


const VideosOne = () => {
  const [status, setStatus] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  

  const [user, setUser] = useState(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
      } else {
        Alert.alert("Error Accessing User");
      }
    });
  }, []);

  useEffect(() => {
    const checkVideoStatus = async () => {
      if (user) {
        await videoDone(user);
      }
    };
    checkVideoStatus();
  }, [user]);
  

  const videoRef = React.useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      videoRef.current?.pauseAsync();
      return () => {
        videoRef.current?.pauseAsync();
      };
    }, [])
  );


  return (
    <SafeAreaView style={styles.container}>
       <Stack.Screen options={{ headerShown: true, title: "Python Intro!", headerStyle: {backgroundColor: '#121212'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold', fontSize: 22}}} />

       {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

       <Video
        ref={videoRef}
        style={styles.video}
        source={myvid}
        useNativeControls
        resizeMode="contain"
        isLooping
        onLoadStart={() => setIsLoading(true)} // Set loading to true when video starts to load
        onLoad={() => setIsLoading(false)} // Set loading to false when loading is complete
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  video: {
    alignSelf: 'center',
    width: 350,
    height: 220,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: add a semi-transparent overlay
  },
});

const videoDone = async (user) => {
  const { data, error } = await supabase.from("profiles")
    .update({video_one_done: true,})
    .match({"id": user.id});

  if (error) {
    console.error("Error inserting data:", error);
    return;
  }

  console.log("Data inserted:", data);
};







export default VideosOne;