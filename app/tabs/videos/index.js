import * as React from 'react';
import { Stack, Link } from 'expo-router';
import { View, StyleSheet, SafeAreaView, Button, ScrollView } from 'react-native';
import VideoCard from './videoCard';
import videoOneIcon from "./videoOneIcon.png"
import videoTwoIcon from "./videoTwoIcon.png"
import videoThreeIcon from "./videoThreeIcon.png"

const VideosScreen = () => {


  return (
    <SafeAreaView style={styles.container}>
       <Stack.Screen options={{ headerShown: true, title: "Videos", headerStyle: {backgroundColor: '#121212'}, headerTintColor: '#fff', headerTitleStyle: {fontFamily: 'System', fontWeight: 'bold', fontSize: 22}}} />
       <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VideoCard
            title="Python Intro: Welcome!"
            thumbnail={videoOneIcon}
            ToLink="/tabs/videos/videoOne" 
        />

        <VideoCard
            title="Looping and Looping"
            thumbnail={videoTwoIcon}
            ToLink="/tabs/videos/videoTwo" 
        />

        <VideoCard
            title="Dope methods"
            thumbnail={videoThreeIcon}
            ToLink="/tabs/videos/videoThree" 
        />

        </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});

export default VideosScreen;