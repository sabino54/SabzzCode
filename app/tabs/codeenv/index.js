import { Stack, Link } from "expo-router";
import {ScrollView, SafeAreaView, Text, View, TouchableOpacity, StyleSheet, TextInput, Button } from "react-native";
import { StatusBar } from 'react-native';

export default function CodingEnv() {
  return (
    <View style={{ flex: 1, backgroundColor: "#121212" }}>
      <StatusBar backgroundColor="black" />
      <Stack.Screen options={{ headerShown: true, title: "Coding", headerStyle: {backgroundColor: '#121212'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold', fontSize: 22}}} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.subcontainer}>
          <Link href={"/tabs/codeenv/questionOneEnv"} asChild>
            <TouchableOpacity style={styles.buttonContainer} >
              <Text style={styles.buttonText}> Gimmie Some Chips </Text>
            </TouchableOpacity>
          </Link>
          <Link href={"/tabs/codeenv/questionTwoEnv"} asChild>
            <TouchableOpacity style={styles.buttonContainer} >
              <Text style={styles.buttonText}> Rizz Master </Text>
            </TouchableOpacity>
          </Link>
          <Link href={"/tabs/codeenv/questionThreeEnv"} asChild>
            <TouchableOpacity style={styles.buttonContainer} >
              <Text style={styles.buttonText}> HaCkInG </Text>
            </TouchableOpacity>
          </Link>
          <Text style={{alignSelf: "center", color: 'grey', margin: 22, fontStyle: 'italic', fontSize: 15}}>
            more coming soon!...
          </Text>
        </View>
      </ScrollView>
    </View>
  );  
}

const styles = StyleSheet.create({
  subcontainer: {
    marginTop: 12,
    padding: 12,
    
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  buttonContainer: {
    backgroundColor: "#303030",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, 
    shadowRadius: 3,
    elevation: 8,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
  },
  textInput: {
    borderColor: "#000968",
    borderRadius: 4,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 12,
    margin: 8,
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    margin: 10,
    width: "80%",
  },
  
});