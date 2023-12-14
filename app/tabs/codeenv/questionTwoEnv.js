import React, {useState, useEffect} from 'react';
import { View, StyleSheet, SafeAreaView, Button, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { executeCode } from './executeCode';
import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';
import { encode as base64Encode, decode as base64decode } from 'base-64';
import { Stack, Link } from "expo-router";
import { styles } from "../../styles/styles"
import { expectedOutput } from './questionTwoAns';
import { supabase } from "../../lib/supabase-client";

const CodingEnvTwo = () => {

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
    "Something about me, I know how to rizz up anyone. People call me the RIZZ MASTER. Little do they know, I got a secret weapon under my sleeve. I use Python to help me.\n\n" + 
    "I was thinking, from the kindest of my own heart, I should share some game with you. I'm gonna teach you how I use Python to rizz up anyone...yeah I know, pretty cool 😎 \n\n" +
    "So, what you gotta do, is send them 30 'PLEASE's and then 10 'I'M BEGGING's\n\n" +
    "Once you do that, they'll be falling for you in no time. Trust me, they love it so much that they even forget to respond.\n\n" +
    "For this exercise, I want you to use a for loop to print out 30 'PLEASE's and 10 'I'M BEGGING's. You got this my rizz apprentice " 
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
    
    setIsOutputCorrect(outputMessage.trim() === expectedOutput);
    
    setCodeOutput(outputMessage); 
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: "Rizz Master", headerStyle: {backgroundColor: '#121212'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold', fontSize: 22}, }} />
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
        {isOutputCorrect && <Text style={styles.correctOutputCheckmark}>Correct, Rizz Master!</Text>}
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
      .update({coding_two_done: true,})
      .match({"id": user.id});
  
    if (error) {
      console.error("Error inserting data:", error);
      return;
    }
  
    console.log("Data inserted:", data);
  };

export default CodingEnvTwo;
