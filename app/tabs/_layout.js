import { Tabs } from "expo-router"
import FontAwesome from "@expo/vector-icons/FontAwesome"


export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ 
            headerShown: false, 
            tabBarActiveTintColor: 'white', 
            tabBarInactiveTintColor: 'grey', 
            tabBarStyle: {
                backgroundColor: 'black',
                borderTopWidth: 0, // This removes the border
                elevation: 0, // This removes shadow on Android
                shadowOpacity: 0, // This removes shadow on iOS
            },
            tabBarIndicatorStyle: {
                height: 0, // This removes the tab indicator line
            },
        }}>        
        <Tabs.Screen
            name="home"
            options={{
                tabBarLabel: "Profile",
                title: "Profile",
                tabBarIcon: ({ color }) => (
                    <FontAwesome
                        size={33}
                        style={{ marginBottom: -10}}
                        name="home"
                        color={color}
                    />
                ),
            }}
        />
         <Tabs.Screen
            name="videos"
            options={{
                tabBarLabel: "Videos",
                title: "Videos",
                tabBarIcon: ({ color }) => (
                    <FontAwesome
                        size={33}
                        style={{ marginBottom: -10}}
                        name="video-camera"
                        color={color}
                    />
                ),
            }}
        />
         <Tabs.Screen
            name="codeenv"
            options={{
                tabBarLabel: "Coding",
                title: "Coding",
                tabBarIcon: ({ color }) => (
                    <FontAwesome
                        size={30}
                        style={{ marginBottom: -4}}
                        name="file-code-o"
                        color={color}
                    />
                ),
            }}
        />
        <Tabs.Screen
            name='settings'
            options={{
                tabBarLabel: "Settings",
                title: "Settings",
                tabBarIcon: ({ color }) => (
                    <FontAwesome
                        size={28}
                        style={{marginBottom: -12}}
                        name="gear"
                        color={color}
                    />
                ),
            }}
        />
         </Tabs>
    );
}

