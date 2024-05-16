import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./src/pages/Home";
import Sobre from "./src/pages/Sobre";
import Contato from "./src/pages/Contato";
import Users from "./src/pages/Users";
import Login from "./src/pages/Login";

const Tab = createBottomTabNavigator();

export default function App() {
  const [userToken, setUserToken] = useState(true); // Inicialmente definido como null

  useEffect(() => {
    checkToken();
  }, []);

  async function checkToken() {
    const tokenSalvo = await AsyncStorage.getItem("token");
    if (tokenSalvo !== null) {
      alert(tokenSalvo);
      setUserToken(false);
    }
  }

  const limparAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage limpo com sucesso!");
      setUserToken(true); // Após limpar o AsyncStorage, definir userToken como false para mostrar a tela de login
    } catch (error) {
      console.log("Erro ao limpar AsyncStorage:", error);
    }
  };

  const handleLogout = () => {
    limparAsyncStorage();
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "purple",
          tabBarInactiveTintColor: "black",
          tabBarStyle: {
            backgroundColor: "#fff",
            height: 50,
            position: "absolute",
            bottom: 20,
            right: 20,
            left: 20,
            borderTopEndRadius: 15,
            borderTopColor: "transparent",
            padding: 10,
            shadowColor: "purple",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 8,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          initialParams={{ handleLogout: handleLogout }} // Passando handleLogout como initialParams
          options={{
            tabBarIcon: ({ size, color }) => {
              return <FontAwesome size={size} color={color} name="home" />;
            },
            headerShown: false,
            title: "",
          }}
        />
        <Tab.Screen
          name="Sobre"
          component={Sobre}
          options={{
            tabBarIcon: ({ size, color }) => {
              return (
                <FontAwesome size={size} color={color} name="newspaper-o" />
              );
            },
            headerShown: false,
            title: "",
          }}
        />
        <Tab.Screen
          name="Contato"
          component={Contato}
          options={{
            tabBarIcon: ({ size, color }) => {
              return <FontAwesome size={size} color={color} name="envelope" />;
            },
            headerShown: false,
            title: "",
          }}
        />

        {userToken ? (
          <Tab.Screen
            name="Login"
            component={Login}
            initialParams={{ setUserToken: setUserToken }}
            options={{
              tabBarIcon: ({ size, color }) => {
                return <FontAwesome name="user" size={24} color="black" />;
              },
              headerShown: false,
              title: "",
            }}
          />
        ) : null}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
