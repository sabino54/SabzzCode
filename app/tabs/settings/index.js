import { Stack, Link } from "expo-router";
import {ScrollView, SafeAreaView, Text, View, TouchableOpacity, StyleSheet, TextInput, Button } from "react-native";
import { supabase } from "../../lib/supabase-client";
import { useEffect, useState } from "react";
import { StatusBar } from 'react-native';

export default function SettingsPage() {
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

  const doLogout = async () => {
    const {error} = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error Signing Out User", error.message);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#121212" }}>
      <StatusBar backgroundColor="black" />
      <Stack.Screen options={{ headerShown: true, title: "Settings", headerStyle: {backgroundColor: '#121212'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold', fontSize: 22},}} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.subcontainer}>
          <Link href={"/tabs/settings/profileupdate"} asChild>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}>PROFILE UPDATE</Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity onPress={doLogout} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>LOGOUT</Text>
          </TouchableOpacity>
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
    backgroundColor: "white",
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