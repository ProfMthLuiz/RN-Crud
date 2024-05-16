import { Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/StyleSheet";

function ButtonComponent({ funcLogin }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={() => funcLogin()}>
      <Text style={styles.btnText}>Login</Text>
    </TouchableOpacity>
  );
}

export default ButtonComponent;
