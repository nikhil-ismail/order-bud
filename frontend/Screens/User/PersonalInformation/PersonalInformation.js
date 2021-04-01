import React, { useState } from "react";
import { TextInput } from "react-native";
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { Icon, BottomSheet } from 'react-native-elements';

import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../Redux/userSlice";

import UserDetails from './UserDetails';
import EditUserDetails from './EditUserDetails';

const PersonalInformation = (props) => {

    const userDetails = useSelector(selectUserDetails);

    const [edit, setEdit] = useState(false);

    const handleEdit = () => {
        setEdit(!edit);
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Personal Information</Text>
                    <TouchableOpacity style={styles.editIcon} onPress={handleEdit}>
                        <Icon name="pencil-alt" type="font-awesome-5" color="black" size={25} />
                    </TouchableOpacity>
                </View>
                <View style={styles.profilePictureContainer}>
                    <View style={styles.profilePicturePlaceholder} />
                </View>
                { edit ?
                    <EditUserDetails handleEdit={handleEdit} />
                    :
                    <UserDetails />
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20
    },
    title: {
        fontSize: 26,
        marginLeft: 70,
        fontWeight: "bold"
    },
    profilePictureContainer: {
        backgroundColor: "white",
        paddingVertical: 20
    },
    profilePicturePlaceholder: {
        backgroundColor: "grey",
        marginLeft: 25,
        height: 100,
        width: 100,
        borderRadius: 60
    },
    editIcon: {
        marginRight: 30
    }
})

export default PersonalInformation;