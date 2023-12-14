import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import * as Progress from 'react-native-progress';

const ProgressBar_Video = ({ data }) => {
  const calculateProgress = () => {
    console.log(data)
    if (!data) return 0;
    
    if (!Array.isArray(data) || data.length === 0) return 0;

    const userData = data[0];

    const totalCodingParts = 3;
    const completedCodingParts = [
      'video_one_done', 
      'video_two_done', 
      'video_three_done'
    ].filter(codingPart => userData[codingPart] === true).length; // Check explicitly for true
    
    return completedCodingParts / totalCodingParts;
  };

  const progress = calculateProgress();
  const isCompleted = progress === 1; 

  return (
    <View style={styles.container}>
        <Text style={styles.completedText}>
        Videos {isCompleted ? 'completed! 🎉' : `in progress: ${(progress * 100).toFixed(0)}%`}
      </Text>
      <Progress.Bar
        style={styles.bar}
        color={"white"}
        progress={progress}
        width={200}
        height={20}
        borderRadius={6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  bar: {
    borderColor: 'white',
    margin: 4,
  },
  completedText: {
    color: 'white', // Choose a color that matches your design
    fontSize: 20, // Choose an appropriate font size
    //fontWeight: 'bold', // Choose an appropriate font weight
    textAlign: 'center', // Align the text to the center if you prefer
    marginBottom: 12,
  },

});

export default ProgressBar_Video;
