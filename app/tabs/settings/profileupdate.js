import { Stack, Link } from "expo-router";
import {Image, ScrollView, SafeAreaView, Text, View, TouchableOpacity, StyleSheet, TextInput, Button } from "react-native";
import { supabase } from "../../lib/supabase-client";
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';

const ProfileUpdater = () => {

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

  const [name, setName] = useState("");

  const handleSubmit = async () => {
    await addNameToProfile(name, user);
    setName("");
  };
    
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (!user) return;
    loadImages();
  }, [user]);

  const loadImages = async () => {
    const { data, error } = await supabase.storage.from('avatars').list(user.id);
    if (data) {
      setFiles(data);
    } else if (error) {
      console.error('Error loading images:', error);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const img = result.assets[0];
      const base64 = await FileSystem.readAsStringAsync(img.uri, { encoding: 'base64' });
      
      const fileExtension = img.uri.split('.').pop();
      const filePath = `${user.id}/profile_picture.${fileExtension}`;
      const contentType = `image/${fileExtension}`; // Assuming it's always an image
      
      const { data } = await supabase
        .storage
        .from('avatars')
        .list(user.id)

      if (data.length > 1){
        await supabase.storage.from('avatars').remove([`${user.id}/${data[1].name}`])
      }

      await supabase.storage.from('avatars').upload(filePath, decode(base64), {contentType});
      loadImages();
    }
  };


  return (
    <View style={{backgroundColor: '#121212', flex: 1}}>
      <Stack.Screen options={{ headerShown: true, title: "Update Profile", headerStyle: {backgroundColor: '#121212'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold', fontSize: 22},}} />
      <ScrollView>
      <View style={styles.container2}>
        <TextInput
          style={styles.input}
          placeholder="Update name..."
          placeholderTextColor={'gray'}
          value={name}
          onChangeText={setName}
        />
      <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>ADD NAME</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={pickImage} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>UPDATE PROFILE PIC (*JPG only)</Text>
      </TouchableOpacity>

      </View>
      </ScrollView>
    </View>
  );
};

const addNameToProfile = async (name, user) => {
  const { data, error } = await supabase.from("profiles")
    .update({username: name,})
    .match({"id": user.id});

  if (error) {
    console.error("Error inserting data:", error);
    return;
  }

  console.log("Data inserted:", data);
};


const styles = StyleSheet.create({
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
    marginBottom: 40,
  },
  buttonText: {
    fontSize: 18,
    color: "black",
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#121212'
  },
  input: {
    color: 'white',
    borderWidth: 2,
    borderColor: "white",
    padding: 10,
    margin: 10,
    width: "80%",
  },
});

export default ProfileUpdater;
