import { Stack } from "expo-router";

export default function AuthLayout() {
  return <Stack>

    <Stack.Screen
    name="login"
    options={{
    headerShown: true,
    title: "SabzzCode", 
    headerStyle: {backgroundColor: '#121212'},
    headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold', fontSize: 22},
    }}
    />

    </Stack>
}