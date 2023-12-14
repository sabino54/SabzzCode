import { Stack } from "expo-router";
import { Text } from "react-native";

export default function CodingEnvLayout(){
    return <Stack>

    <Stack.Screen
    name="index"
    options={{
    headerShown: false,
    }}
    />
    </Stack>
}