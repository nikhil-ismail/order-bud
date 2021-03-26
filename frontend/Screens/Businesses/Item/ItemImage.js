import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';

var { height, width } = Dimensions.get("window");

const ItemImage = (props) => {

    const { image } = props;

    return (
        <View>
            <TouchableOpacity style={styles.cartBackBtn} onPress={props.handleRemoveItemModal}>
                <Icon name="arrow-left" type="font-awesome-5" color="black" size={17.5} />
            </TouchableOpacity>
            <View style={styles.productImageContainer}>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={{
                        uri: image
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cartBackBtn: {
        position: "absolute",
        zIndex: 100,
        bottom: 15,
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        height: 50,
        width: 50,
        top: 20,
        left: 20,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },
    productImageContainer: {
        width: width,
        backgroundColor: "white",
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15
    },
    image: {
        width: width,
        height: 0.2 * height,
        marginTop: 40
    }
});

export default ItemImage;