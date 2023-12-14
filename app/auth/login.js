import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, View, Text, SafeAreaView } from "react-native";
import { supabase } from "../lib/supabase-client";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
;

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert("Sign In Error", error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert("Sign Up Error", error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>

    <StatusBar style="light" />

    <View style={[styles.verticallySpaced, styles.mt20]}>
      <TextInput
        style={styles.textInput}
        label="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="email@address.com"
        autoCapitalize={"none"}
        placeholderTextColor="gray"
      />
    </View>
    <View style={styles.verticallySpaced}>
      <TextInput
        style={styles.textInput}
        label="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        autoCapitalize={"none"}
        placeholderTextColor="gray"
      />
    </View>
    <View style={[styles.verticallySpaced, styles.mt20]}>
      <TouchableOpacity
        disabled={loading}
        onPress={() => signInWithEmail()}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.verticallySpaced}>
      <TouchableOpacity
        disabled={loading}
        onPress={() => signUpWithEmail()}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#121212',
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    maxWidth: "100%",
    flex: 1,
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
      backgroundColor: "white",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      margin: 8,
    },
    buttonContainer_two: {
      backgroundColor: "#808080",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      margin: 8,
    },
    buttonText: {
      fontSize: 18,
      color: "black",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase",
    },
    textInput: {
      color: "white",
      borderColor: "white",
      borderRadius: 4,
      borderStyle: "solid",
      borderWidth: 1,
      padding: 12,
      margin: 8,
    },
  });