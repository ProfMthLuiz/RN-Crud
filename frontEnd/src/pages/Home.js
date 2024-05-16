import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Button,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function Home({ route }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [vis, setVis] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { handleLogout } = route.params;

  useEffect(() => {
    readUser();
  }, [users]);

  async function createUser() {
    try {
      if (user !== "" && password !== "") {
        await axios.post("http://localhost:3000/api/createUser", {
          username: user,
          password,
        });
        setUser("");
        setPassword("");
        alert("Usuário cadastrado com sucesso");
      } else {
        alert("Preencha todos os campos!");
      }
    } catch (error) {
      console.log(`Erro ao criar usuário: ${error}`);
    }
  }

  async function readUser() {
    try {
      const response = await axios.get("http://localhost:3000/api/readUsers");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  async function updateUser() {
    try {
      await axios.put(
        `http://localhost:3000/api/updateUser/${selectedUser.id}`,
        { username: user, password }
      );
      setVis(false); // Fechar o modal após a atualização
      readUser(); // Recarregar a lista de usuários após a atualização
      alert("Usuário atualizado com sucesso");
      setUser("");
      setPassword("");
      setSelectedUser(null);
    } catch (error) {
      console.log(`Erro ao atualizar usuário: ${error}`);
    }
  }

  async function deleteUser(id) {
    try {
      await axios.delete(`http://localhost:3000/api/deleteUsers/${id}`);
      readUser();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  }

  const openEditModal = (item) => {
    setSelectedUser(item); // Defina o usuário selecionado no estado
    setUser(item.username); // Defina o nome de usuário no estado
    setPassword(item.password); // Defina a senha do usuário no estado
    setVis(true); // Abra o modal de edição
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="User"
          value={user}
          onChangeText={(txtUser) => setUser(txtUser)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(txtPassword) => setPassword(txtPassword)}
        />
        <TouchableOpacity
          onPress={createUser}
          style={{
            margin: 10,
            alignItems: "center",
            justifyContent: "center",
            padding: 5,
            backgroundColor: "green",
            width: 75,
            borderRadius: 100,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white" }}>Criar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                margin: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 20, marginRight: 10 }}>
                {item.username}
              </Text>
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => deleteUser(item.id)}
              >
                <Entypo name="trash" size={24} color="red" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openEditModal(item)}>
                <Entypo name="pencil" size={24} color="blue" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <Modal visible={vis}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              width: "50%",
              height: "50%",
              backgroundColor: "lightblue",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              style={styles.input}
              placeholder="User"
              value={user}
              onChangeText={(txtUser) => setUser(txtUser)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={(txtPassword) => setPassword(txtPassword)}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  setVis(false);
                  setUser("");
                  setPassword("");
                }}
                style={{ margin: 5 }}
              >
                <MaterialIcons name="cancel" size={24} color="red" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => updateUser()}
                style={{ margin: 5 }}
              >
                <Feather name="check-circle" size={24} color="green" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  input: {
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#000",
  },
});
