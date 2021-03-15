import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';

var { width } = Dimensions.get("window");

const BusinessCard = (props) => {
    const { coverImage, name, address } = props.business;

    return (
        <TouchableOpacity style={styles.container} onPress={() => props.navigation.navigate('Business Page', props.business)}>
             <Image 
                style={styles.image}
                source={{uri: coverImage}}
            />
            <View style={styles.businessDetails}>
                <Text style={styles.title}>{name}</Text>
                <View style={styles.addressRatingContainer}>
                    <Text style={{fontSize: 15}}>{address}</Text>
                    <View style={styles.stars}>
                        <Text style={{marginRight: 5, fontSize: 15}}>5</Text>
                        <Icon name="star" type="font-awesome-5" color="green" size={15} />
                    </View>
                </View>
                <Text style={styles.friendOrders}>Greg and 3 others have ordered from here</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        borderRadius: 5,
        elevation: 8,
        backgroundColor: 'white',
        marginVertical: 10
    },
    image: {
        width: "100%",
        height: 160
    },
    businessDetails: {
        marginTop: 20,
        marginBottom: 15,
        paddingHorizontal: 15
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        marginBottom: 15
    },
    addressRatingContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    stars: {
        flexDirection: "row",
        marginTop: 3,
    },
    friendOrders: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10
    }
})

export default BusinessCard;