import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, TouchableOpacity } from 'react-native';

var { width } = Dimensions.get("window");

const OrderCard = (props) => {
    const { totalPrice, totalQuantity, business, businesses, coverImage, date, order, ordersCount } = props;

    const menu = businesses.filter(dispense => dispense.name === business);

    return (
        <View>
            <TouchableOpacity style={styles.productContainer} onPress={() => props.navigation.navigate('Receipt', {order: order, ordersCount: ordersCount})}>
                <Image
                    style={styles.coverImage}
                    source={{ uri: coverImage }}
                />
                <View style={styles.productDetails}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.title}>{business}</Text>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <Text style={[styles.subText, {marginBottom: 5}]}>${totalPrice} • {totalQuantity} Items</Text>
                        <Text style={[styles.subText ,{marginTop: 2}]}>April 7, 2021</Text>
                    </View>
                </View>
                <TouchableOpacity 
                    style={styles.viewMenu} onPress={() => props.navigation.navigate('Business Page', menu[0])}>
                    <Text>View Menu</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    productContainer: {
        width: '100%',
        marginVertical: 1,
        paddingVertical: 25,
        flexDirection: "row",
        borderRadius: 5,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: 'white',
        borderBottomWidth: 0.4,
        borderBottomColor: "grey"
    },
    productDetails: {
        flexGrow: 1,
        flexWrap: "wrap",
        flex: 1,
        marginLeft: 25,
    },
    title: {
        fontWeight: "bold",
        fontSize: 17,
    },
    subText: {
        color: "grey",
        fontWeight: "bold"
    },
    coverImage: {
        marginLeft: 17,
        height: "100%",
        width: "27%"
    },
    viewMenu: {
        backgroundColor: "#E8E8E8",
        padding: 10,
        borderRadius: 10,
        marginRight: 18
    }
})

export default OrderCard;