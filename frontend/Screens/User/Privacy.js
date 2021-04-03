import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { Icon, BottomSheet } from 'react-native-elements';

import { useSelector } from "react-redux";
import { selectUserDetails } from "../../Redux/userSlice";

const Privacy = (props) => {
    const userDetails = useSelector(selectUserDetails);

    const [locationOn, setLocationOn] = useState(true);
    const [viewOrdersOn, setViewOrdersOn] = useState(true);

    const handleLocationSwitch = () => {
        setLocationOn(!locationOn);
    }

    const handleViewOrdersSwitch = () => {
        setViewOrdersOn(!viewOrdersOn);
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Privacy</Text>
                </View>
                <View style={styles.categoryContainer}>
                    <Text style={styles.categoryHeader}>Location Access</Text>
                    <View style={styles.category}>
                        <Text style={styles.categoryText}>Enable location access</Text>
                        { locationOn ?
                        <TouchableOpacity style={{marginLeft: 160, marginTop: 5}} onPress={handleLocationSwitch}>
                            <Icon name="toggle-on" type="font-awesome-5" color="green" size={40} />
                        </TouchableOpacity>
                            :
                        <TouchableOpacity style={{marginLeft: 160, marginTop: 5}} onPress={handleLocationSwitch}>
                            <Icon name="toggle-off" type="font-awesome-5" color="green" size={40} />
                        </TouchableOpacity>
                        }
                    </View>
                </View>
                <View style={styles.categoryContainer}>
                    <Text style={styles.categoryHeader}>Orders and Favourites</Text>
                    <View style={styles.category}>
                        <Text style={styles.categoryText}>Friends can see my orders and favourites</Text>
                        { viewOrdersOn ?
                        <TouchableOpacity style={{marginLeft: 30, marginTop: 5}} onPress={handleViewOrdersSwitch}>
                            <Icon name="toggle-on" type="font-awesome-5" color="green" size={40} />
                        </TouchableOpacity>
                            :
                        <TouchableOpacity style={{marginLeft: 30, marginTop: 5}} onPress={handleViewOrdersSwitch}>
                            <Icon name="toggle-off" type="font-awesome-5" color="green" size={40} />
                        </TouchableOpacity>
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20
    },
    title: {
        fontSize: 26,
        fontWeight: "bold"
    },
    categoryHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 20,
        marginVertical: 20
    },
    category: {
        flexDirection: "row",
        backgroundColor: "white",
        paddingVertical: 15,
        marginBottom: 3,
        marginTop: 5
    },
    categoryText: {
        marginLeft: 20,
        marginTop: 15,
        fontSize: 16
    }
})

export default Privacy;