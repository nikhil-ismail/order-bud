import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const ItemDetails = (props) => {

    const { name, description, brand } = props;

    return (
        <View style={styles.itemDetailsContainer}>
            <View style={styles.itemNameContainer}>
                <Text style={styles.itemName}>{name}</Text>
            </View>
            <View style={styles.subItemDetailsContainer}>
                <Text style={styles.subItemDetailsText}>{brand}</Text>
                <Text style={styles.subItemDetailsText}>·</Text>
                <Text style={styles.subItemDetailsText}>15% THC</Text>
                <Text style={styles.subItemDetailsText}>·</Text>
                <Text style={styles.subItemDetailsText}>0.2% CBD</Text>
            </View>
            <Text style={styles.itemDescription}>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    itemDetailsContainer: {
        backgroundColor: "white",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        paddingHorizontal: 20,
    },
    itemNameContainer: {
        alignItems: "center",
    },
    itemName: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
    },
    subItemDetailsContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    subItemDetailsText: {
        color: "grey",
        fontSize: 18,
        fontWeight: "bold",
        padding: 5
    },
    itemDescription: {
        fontSize: 16,
        color: "grey",
        marginTop: 10
    }
})

export default ItemDetails;