import React from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { Icon, BottomSheet } from 'react-native-elements';

import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../Redux/userSlice";

const AddressCard = (props) => {
    const userDetails = useSelector(selectUserDetails);

    return (
        <SafeAreaView>
            <TouchableOpacity>
                <View style={styles.cardContainer}>
                    <View style={styles.pinIcon}>
                        <Icon name="map-pin" type="font-awesome-5" color="black" size={25} />
                    </View>
                    <View style={styles.addressContainer}>
                        <Text style={styles.addressText1}>80 Yorkville Avenue, Suite 1602</Text>
                        <Text style={styles.addressText2}>Toronto, ON M5R 2C2, Canada</Text>
                    </View>
                    <TouchableOpacity style={styles.deleteIcon}>
                        <Icon name="pencil-alt" type="font-awesome-5" color="black" size={20} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        paddingVertical: 20,
        marginBottom: 2
    },
    addressContainer: {
        flexDirection: "column",
        paddingHorizontal: 25
    },
    addressText1: {
        fontSize: 16,
        fontWeight: "bold",
    },
    addressText2: {
        fontSize: 16,
    },
    pinIcon: {
        marginLeft: 30,
        marginTop: 8
    },
    deleteIcon: {
        marginRight: 30,
        marginTop: 8
    }
})

export default AddressCard;