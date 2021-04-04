import React from 'react'
import { View, StyleSheet, Text } from 'react-native';

const BusinessInfo = (props) => {

    const { name, address, rating } = props.businessDetails

    return (
        <View>
            <View style={styles.profileTextContainer}>
                <View style={styles.businessNameAndRating}>
                    <Text style={styles.businessName}>{name}</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>{rating}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 6 }}>
                    <Text style={styles.businessDetails}>Open Now</Text>
                    <Text style={styles.businessDetails}> • </Text>
                    <Text style={styles.businessDetails}>{address}</Text>
                    <Text style={styles.businessDetails}> • </Text>
                    <Text style={styles.businessDetails}>30-40 min</Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 6 }}>
                    <Text style={styles.businessDetails}>2.99 Delivery Fee</Text>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    profileTextContainer: {
        flexDirection: "column",
        backgroundColor: 'white',
        width: "100%",
        borderRadius: 5,
        padding: 20
    },
    businessNameAndRating: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    businessName: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
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
    businessDetails: {
        fontSize: 16,
        color: "grey"
    }
})

export default BusinessInfo;