import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Link } from 'expo-router';

const VideoCard = ({ title, thumbnail, onPress, ToLink}) => {
  return (
    <Link href={ToLink} asChild>
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <ImageBackground source={thumbnail} style={styles.thumbnail}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    margin: 15,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, 
    shadowRadius: 3,
    elevation: 8,
    backgroundColor: '#2a2a2a',
  },
  thumbnail: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
    borderRadius: 20,
    overflow: 'hidden',
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  title: {
    color: 'white',
    fontFamily: 'System',
    fontSize: 17,
  },
});

export default VideoCard;
