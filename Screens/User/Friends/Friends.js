import React, { useState, useCallback } from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { Icon, BottomSheet } from 'react-native-elements';

import SearchBar from '../../../Shared/SearchBar';

import MyFriends from "./MyFriends";
import Contacts from "./Contacts";
import Facebook from "./Facebook";

const Friends = (props) => {

    const [myFriendsToggle, setMyFriendsToggle] = useState(true);
    const [contactsToggle, setContactsToggle] = useState(false);
    const [facebookToggle, setFacebookToggle] = useState(false);

    const handleMyFriendsToggle = () => {
        setMyFriendsToggle(true);
        setContactsToggle(false);
        setFacebookToggle(false);
    }

    const handleContactsToggle = () => {
        setMyFriendsToggle(false);
        setContactsToggle(true);
        setFacebookToggle(false);
    }

    const handleFacebookToggle = () => {
        setMyFriendsToggle(false);
        setContactsToggle(false);
        setFacebookToggle(true);
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Friends</Text>
                </View>
                <SearchBar showFilterIcon={false} placeholder="Search friends on OrderBud..." />
                <View style={styles.categoryContainer}>
                    <TouchableOpacity style={styles.category} onPress={handleMyFriendsToggle}>
                        <View style={{marginLeft: 25}}>
                            <Icon name="user-friends" type="font-awesome-5" color="black" size={25} />
                        </View>
                        <Text style={[{marginLeft: 30}, styles.categoryText]}>My Friends</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category} onPress={handleContactsToggle}>
                        <Icon name="address-book" type="font-awesome-5" color="black" size={25} />
                        <Text style={styles.categoryText}>Contacts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category} onPress={handleFacebookToggle}>
                        <View style={{marginRight: 35}}>
                            <Icon name="facebook" type="font-awesome-5" color="#000080" size={25} />
                        </View>
                        <Text style={[{marginRight: 30}, styles.categoryText]}>Facebook</Text>
                    </TouchableOpacity>
                </View>
                {myFriendsToggle ?
                    <MyFriends />
                        :
                        contactsToggle ?
                            <Contacts />
                            :
                                <Facebook />
                }
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
    categoryContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        marginTop: 3,
        paddingVertical: 15
    },
    category: {
        flexDirection: "column",
    },
    categoryText: {
        fontSize: 17,
        marginTop: 10,
        color: "green"
    }
})

export default Friends;