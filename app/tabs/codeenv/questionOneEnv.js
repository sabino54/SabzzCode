import React, {useState, useEffect} from 'react';
import { View, StyleSheet, SafeAreaView, Button, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { executeCode } from './executeCode';
import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';
import { encode as base64Encode, decode as base64decode } from 'base-64';
import { Stack, Link } from "expo-router";
import { styles } from "../../styles/styles"
import { supabase } from "../../lib/supabase-client";

const CodingEnv = () => {
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
        await codeOneDone(user);
      }
    };
    executeAsyncOperation();
  }, [isOutputCorrect, user]);
  


  const [initialText] = useState(
    "Alright, what's up! I am so excited that you are willing to give coding a try!\n\n" +
    "It's gonna be a lot of fun, trust.\n\n" +
    "I recommend you watch the Python Intro: Welcome! video. There, I walk you through what kind " +
    "of things you can do in Python and give you some examples of code that you can do yourself.\n\n" +
    "Here, we will be using what we learned from our Welcome video to help us solve a problem using Python. So, " +
    "without further ado, LETS GOOOOO!!\n\n" +
    "So, right now I'm in my room and I really want some snacks from the gas station down the street. I look " +
    "at my bank account and damn...only $15 dollars. I know that for a bag of chips, it'll run me $4.15. A can of Mango " +
    "Arizona (yum) will be $6.12. I should also consider the tax, which should be around $2.\n\n" +
    "If I want a bag of chips and Arizona, could you write me a python script that will tell me (using the print statement) how much " +
    "money I will have left in my bank account. No need to include the '$'.\n\n" + 
    "Use the provided coding environment to write your script! "
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
    
    const expectedOutput = '2.73'; // Define your expected output
    setIsOutputCorrect(outputMessage.trim() === expectedOutput);
    
    setCodeOutput(outputMessage); 
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: "Gimmie Some Chips", headerStyle: {backgroundColor: '#121212'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold', fontSize: 22}, }} />
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


  const codeOneDone = async (user) => {
    const { data, error } = await supabase.from("profiles")
      .update({coding_one_done: true,})
      .match({"id": user.id});
  
    if (error) {
      console.error("Error inserting data:", error);
      return;
    }
  
    console.log("Data inserted:", data);
  };

export default CodingEnv;
