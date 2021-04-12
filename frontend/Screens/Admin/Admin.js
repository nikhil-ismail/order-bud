import React from "react";
import { View } from "react-native";

import LoginPrompt from './LoginPrompt';
import AdminHome from './AdminHome';

import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../Redux/userSlice";

const Admin = (props) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <View style={{flex: 1}}>
            {
                isLoggedIn
                ?
                <AdminHome navigation={props.navigation} />
                :
                <LoginPrompt />
            }
        </View>
    )
}

export default Admin;