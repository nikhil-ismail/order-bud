import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";

import { useSelector } from "react-redux";
import { selectUserDetails } from "../../Redux/userSlice";

const UserProfile = (props) => {
    const userDetails = useSelector(selectUserDetails);

    return (
        <SafeAreaView>
            <Text>{userDetails.name}</Text>
        </SafeAreaView>
    )
}

export default UserProfile;