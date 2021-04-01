import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { Icon, BottomSheet } from 'react-native-elements';

import { useSelector } from "react-redux";

const Notifications = (props) => {

    const [pushOn, setPushOn] = useState(true);
    const [smsOn, setSmsOn] = useState(true);
    const [emailOn, setEmailOn] = useState(true);
    const [promoOn, setPromoOn] = useState(true);


    const handlePushSwitch = () => {
        setPushOn(!pushOn);
    }

    const handleSMSSwitch = () => {
        setSmsOn(!smsOn);
    }

    const handleEmailSwitch = () => {
        setEmailOn(!emailOn);
    }

    const handlePromoSwitch = () => {
        setPromoOn(!promoOn);
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Notification Settings</Text>
                </View>
                <View style={styles.categoryContainer}>
                    <View style={styles.category}>
                        <Text style={styles.categoryText}>Delivery Push Notifications</Text>
                        { pushOn ?
                        <TouchableOpacity style={styles.switchBtn} onPress={handlePushSwitch}>
                            <Icon name="toggle-on" type="font-awesome-5" color="green" size={40} />
                        </TouchableOpacity>
                            :
                        <TouchableOpacity style={styles.switchBtn} onPress={handlePushSwitch}>
                            <Icon name="toggle-off" type="font-awesome-5" color="green" size={40} />
                        </TouchableOpacity>
                        }
                    </View>
                    <View style={styles.category}>
                        <Text style={styles.categoryText}>Delivery SMS Notifications</Text>
                        { smsOn ?
                        <TouchableOpacity style={styles.switchBtn} onPress={handleSMSSwitch}>
                            <Icon name="toggle-on" type="font-awesome-5" color="green" size={40} />
                        </TouchableOpacity>
                            :
                        <TouchableOpacity style={styles.switchBtn} onPress={handleSMSSwitch}>
                            <Icon name="toggle-off" type="font-awesome-5" color="green" size={40} />
                        </TouchableOpacity>
                        }
                    </View>
                    <View style={styles.category}>
                        <Text style={styles.categoryText}>Email Receipt Notifications</Text>
                        { emailOn ?
                        <TouchableOpacity style={styles.switchBtn} onPress={handleEmailSwitch}>
                            <Icon name="toggle-on" type="font-awesome-5" color="green" size={40} />
                        </TouchableOpacity>
                            :
                        <TouchableOpacity style={styles.switchBtn} onPress={handleEmailSwitch}>
                            <Icon name="toggle-off" type="font-awesome-5" color="green" size={40} />
                        </TouchableOpacity>
                        }
                    </View>
                    <View style={styles.category}>
                        <Text style={styles.categoryText}>Promotional Push Notifications</Text>
                        { promoOn ?
                        <TouchableOpacity style={{marginLeft: 68}} onPress={handlePromoSwitch}>
                            <Icon name="toggle-on" type="font-awesome-5" color="green" size={40} />
                        </TouchableOpacity>
                            :
                        <TouchableOpacity style={{marginLeft: 68}} onPress={handlePromoSwitch}>
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
        marginTop: 20
    },
    title: {
        fontSize: 26,
        fontWeight: "bold"
    },
    categoryContainer: {
        flexDirection: "column",
        marginTop: 15
    },
    category: {
        flexDirection: "row",
        backgroundColor: "white",
        paddingVertical: 20,
        marginBottom: 3
    },
    categoryText: {
        fontSize: 18,
        marginTop: 10,
        marginLeft: 20,
    },
    switchBtn: {
        marginLeft: 100
    }
})

export default Notifications;