import React, {useState, useEffect} from 'react';
import { View, StyleSheet, SafeAreaView, Button, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { executeCode } from './executeCode';
import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';
import { encode as base64Encode, decode as base64decode } from 'base-64';
import { Stack, Link } from "expo-router";
import { styles } from "../../styles/styles"
import { supabase } from "../../lib/supabase-client";

const CodingEnvThree = () => {
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

  const [isOutputCorrect, setIsOutputCorrect] = useState(null); 

  useEffect(() => {
    const executeAsyncOperation = async () => {
      if (isOutputCorrect === true) {
        await codeDone(user);
      }
    };
    executeAsyncOperation();
  }, [isOutputCorrect, user]);
  

  const [initialText] = useState(
    "You just been offered a position at the CIA! It's your first day and as a you sit down in your desk you find that you have already been given your first task...SICK!\n\n" +
    "The CIA as recently gathered intel from America's biggest opp, Sabzz. They came across a message written in some type of weird code. A team of the most talented software engineers have been stuck trying to decode this messages for months but still can't crack the code. Since you're new, they don't feel comfortable sharing the message with the newbie.\n\n" +
    "All the info they are giving you is that it's a message about Sabzz planning to send a bunch of really annoying letters to every single home in some city in America. They also mentioned something about how there are random upper cased letters all across the message. Hmm...maybe if you put them together, they could mean something? Only problem is, the team doesn't let you see the message! \n\n" +
    "All they ask from you is to build a program that takes as input the message sent by Sabzz. Then, once having this message, you would need to go through each character in the message and build a word for every upper cased character you see. Maybe you'll find the secret city!\n\n" +
    "p.s. the team stated that you just need to use the input() function for your code to work with the message and instruct you to print the city in the console."
  );  

  const [code, setCode] = useState('');
  const [codeOutput, setCodeOutput] = useState('')

  const handleCodeChange = (newCode) => {
    setCode(newCode); 
  };

  const handlePress = async () => {
    const result = await executeCode(code);
    let outputMessage = '';
    if (result) {
      if (result.stdout) {
        outputMessage = base64decode(result.stdout);
      } else if (result.stderr) {
        outputMessage = `ERROR: ${base64decode(result.stderr)}`;
      } else {
        outputMessage = 'ERROR: Compilation failed or no output was generated.';
      }
    } else {
      outputMessage = 'ERROR: Unable to execute the code. Please try again.';
    }
    
    const expectedOutput = 'CHICAGO'; // Define your expected output
    setIsOutputCorrect(outputMessage.trim() === expectedOutput);
    
    setCodeOutput(outputMessage); 
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: "HaCkInG", headerStyle: {backgroundColor: '#121212'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold', fontSize: 22}, }} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={{padding: 6}}>
        <View style={styles.textBox}>
        <Text style={styles.text}>{initialText}</Text>
        </View>
        </View>
      <View style={styles.editorContainer}>
        <CodeEditor
          autoFocus={false}
          style={styles.editor}
          language="python"
          syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
          showLineNumbers
          onChange={handleCodeChange}
        />
      </View>
        <View style={styles.outputContainer}>
        <Text style={styles.outputLabel}>Output</Text>
        <TextInput 
          style={styles.output} 
          multiline={true}
          editable={false}
          value={codeOutput}
        />
        {isOutputCorrect && <Text style={styles.correctOutputCheckmark}>Correct! :D</Text>}
        {isOutputCorrect === false && <Text style={styles.incorrectOutputCross}>Incorrect ;( </Text>}  
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handlePress} >
              <Text style={styles.buttonText}> Compile and Run! </Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
);
  };

  const codeDone = async (user) => {
    const { data, error } = await supabase.from("profiles")
      .update({coding_three_done: true,})
      .match({"id": user.id});
  
    if (error) {
      console.error("Error inserting data:", error);
      return;
    }
  
    console.log("Data inserted:", data);
  };


export default CodingEnvThree;
