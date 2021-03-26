import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from "react-native";

var { height } = Dimensions.get("window");

const PurchaseButton = props => {

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Purchase</Text> 
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        paddingHorizontal: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        position: "absolute",
        top: 0.825 * height,
        width: "100%",
        paddingVertical: 10
    },
    button: {
        backgroundColor: "green",
        borderRadius: 5,
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 25,
        width: "100%",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    }
})

export default PurchaseButton;