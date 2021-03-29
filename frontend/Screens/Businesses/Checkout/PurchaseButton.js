import React from "react";
import { StyleSheet, SafeAreaView, TouchableOpacity, Text, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

const PurchaseButton = props => {

    return (
        <SafeAreaView style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Purchase</Text> 
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        paddingHorizontal: 15,
        alignItems: "center",   
        justifyContent: "center",
        position: "absolute",
        bottom: 80,
        backgroundColor: "white",
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