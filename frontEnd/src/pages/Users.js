import { View, Text, StyleSheet } from "react-native";


export default function Users() {
    return (
        <View style={styles.container}>
            <Text>Sobre</Text>
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