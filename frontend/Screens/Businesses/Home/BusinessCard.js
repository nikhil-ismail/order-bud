import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

const BusinessCard = (props) => {
    const { coverImage, name, rating, address } = props.business;

    return (
        <TouchableOpacity style={styles.container} onPress={() => props.navigation.navigate('Business Page', props.business)}>
            <Image
                style={styles.image}
                source={{ uri: coverImage }}
            />
            <View style={styles.businessDetails}>
                <View style={styles.businessDetailsHeaderRow}>
                    <Text style={styles.title}>{name}</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>{rating}</Text>
                    </View>
                </View>
                <View style={styles.businessDetailsSubRow}>
                    <Text style={styles.businessDetailsSubRowText}>{address} • </Text>
                    <Text style={styles.businessDetailsSubRowText}>$2.99 • </Text>
                    <Text style={styles.businessDetailsSubRowText}>30-40 min</Text>
                </View>
                <Text style={styles.friendOrders}>Greg and 3 others have ordered from here</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "95%",
        borderRadius: 5,
        elevation: 8,
        backgroundColor: 'white',
        marginVertical: 7.5,
        shadowColor: '#a6a6a6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
    },
    image: {
        width: "100%",
        height: 160
    },
    businessDetails: {
        paddingHorizontal: 15,
        marginVertical: 10
    },
    businessDetailsHeaderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 2.5
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
    },
    ratingContainer: {
        backgroundColor: 'rgba(0, 128, 0, 0.75)',
        height: 30,
        width: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        padding: 5
    },
    ratingText: {
        fontWeight: "bold",
        color: "white"
    },
    businessDetailsSubRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 2.5
    },
    businessDetailsSubRowText: {
        fontSize: 15,
        color: "grey",
        fontWeight: "bold"
    },
    friendOrders: {
        fontSize: 16,
        color: "green",
        fontWeight: 'bold',
        marginVertical: 2.5
    }
})

export default BusinessCard;