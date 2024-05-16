import { View, Text, StyleSheet } from "react-native";


export default function Contato() {
    return (
        <View style={styles.container}>
            <Text>Contato</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
});