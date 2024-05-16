import ImgBackgroundComponent from "../components/ImgBackgroundComponent";
import ImageComponent from "../components/ImageComponent";
import TextComponent from "../components/TextComponent";
import InputComponent from "../components/InputComponent";
import ButtonComponent from "../components/ButtonComponent";
import CardComponent from "../components/CardComponent";

import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ route }) {
  const { setUserToken } = route.params;
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  async function handleLogin() {
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        username: user,
        password: password,
      });

      const token = "tokenLoggedIn";

      if (response.status === 200) {
        await AsyncStorage.setItem("token", token);
        setUserToken(false);
        alert("Login bem sucedido!");
        navigation.navigate("Home");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Credenciais incorretas. Tente novamente.");
        console.log("Credenciais incorretas. Tente novamente.");
      } else {
        alert("Erro ao fazer login. Por favor, tente novamente mais tarde.");
        console.log("Erro ao fazer login:", error);
      }
    }
  }

  return (
    <ImgBackgroundComponent>
      <CardComponent>
        <ImageComponent />
        <TextComponent />
        <InputComponent
          user={user}
          password={password}
          setUser={setUser}
          setPassword={setPassword}
        />
        <ButtonComponent funcLogin={handleLogin} />
      </CardComponent>
    </ImgBackgroundComponent>
  );
}
