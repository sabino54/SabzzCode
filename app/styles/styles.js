import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#121212',
    },
    scrollViewContent: {
      paddingBottom: "130%",
    },
    editor: {
      fontSize: 20,
      inputLineHeight: 26,
      highlighterLineHeight: 26,
      marginBottom: 8,
    },
    outputContainer: {
      backgroundColor: '#242424', // Dark background color for the output area
      borderRadius: 5, // Rounded corners
      padding: 10, // Padding inside the output area
      marginTop: 15, // Margin on top of the output area
      marginBottom: 20,
      marginHorizontal: 12,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4, 
      shadowRadius: 12,
      elevation: 8, 

    },
    outputLabel: {
      color: 'white', // Label color
      fontWeight: 'bold', // Make the label bold
      fontSize: 16, // Label font size
    },
    output: {
      color: 'white', // Assuming you want white text for the output
      padding: 10, // Add some padding for visual comfort
      paddingTop: 10,
      borderWidth: 1,
      borderRadius: 6,
      borderColor: 'white', // You might want a border to distinguish the output area
      marginTop: 20,
      fontSize: 20,
    },
    editorContainer: {
      maxHeight: "80%",
      padding: 11,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.4, 
      shadowRadius: 3,
      elevation: 8, 
    },
    text: {
      fontSize: 17,
      color: "white",
    },
    textBox: {
      marginTop: 15,
      marginBottom: 20,
      fontFamily: 'System',
      color: '#FFFFFF',
      backgroundColor: '#242424',
      padding: 20,
      borderRadius: 10,
      borderColor: '#FFFFFF',
      borderWidth: 0.5,
      margin: 3,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.4, 
      shadowRadius: 3,
      elevation: 8,
    },
    buttonContainer: {
      backgroundColor: "white",
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 12,
      margin: 8,
      alignSelf: 'center',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4, 
      shadowRadius: 12,
      elevation: 8, 
    },
    buttonText: {
      fontSize: 18,
      color: "black",
      fontWeight: "bold",
      alignSelf: "center",
    },
    correctOutputCheckmark: {
      color: '#008170',
      fontSize: 24,
      position: 'absolute',
      fontWeight: 'bold',
      right: 10,
      top: 10,
      marginRight: 5,
    },
    incorrectOutputCross: {
      color: 'rgb(180, 63, 63)',
      fontWeight: 'bold',
      fontSize: 24,
      position: 'absolute',
      right: 10,
      top: 10,
      marginRight: 5,
    },
})