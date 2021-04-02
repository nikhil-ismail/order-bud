import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text } from "react-native";

import { Icon } from 'react-native-elements';

const Header = (props) => {

    return(
        <SafeAreaView style={styles.header}>
            <View>
                <View style={styles.pickUpDelivery}>
                    <TouchableOpacity onPress={props.toggleDelivery}>
                        <Text style={props.delivery ? styles.textSelected : styles.textUnselected}>Deliver</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={props.toggleDelivery}>
                        <Text style={!props.delivery ? styles.textSelected : styles.textUnselected}>Pick-Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.address}>
                <Text style={styles.addressText}>400B Albert Street</Text>
                <Icon name="angle-down" type="font-awesome-5" color="green" size={20} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-between",
        marginTop: 7.5,
        marginBottom: 7.5
    },
    pickUpDelivery: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginVertical: 10,
        marginLeft: 15
    },
    textSelected: {
        fontWeight: "bold",
        fontSize: 19,
        marginHorizontal: 7.5
    },
    textUnselected: {
        fontWeight: "bold",
        fontSize: 19,
        marginHorizontal: 7.5,
        color: "grey"
    },
    address: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15
    },
    addressText: {
        color: "green",
        fontSize: 19,
        fontWeight: "bold",
        marginHorizontal: 10
    },
})

export default Header;