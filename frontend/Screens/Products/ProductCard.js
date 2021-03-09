import React from 'react'
import { StyleSheet, View, Dimensions, Image, Text} from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../../Redux/Actions/cartActions';

var { width } = Dimensions.get("window");

const ProductCard = (props) => {
    const { name, price, image, countInStock } = props;

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                resizeMode="contain"
                source={{
                    uri: image ?
                        image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                }}
            />
            <View style={styles.productDetails}>
                <Text style={styles.title}>Tokyo Smoke</Text>
                <Text styles={{marginBottom: "50"}}>88 Cumberland Street</Text>
                <Text>250m away</Text>
                <Text style={styles.friendOrders}>Greg and 3 others have ordered from here</Text>
            </View>
        </View>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) =>
            dispatch(actions.addToCart({ quantity: 1, product }))
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: width * 0.35,
        flexDirection: "row",
        borderRadius: 15,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: 'white',
    },
    image: {
        width: "37.5%",
        height: width * 0.225,
        marginVertical: 20,
        marginHorizontal: 10
    },
    productDetails: {
        marginVertical: 20,
        width: "60%",
        flexGrow: 1,
        flex: 1,
        marginVertical: 20,
        marginLeft: 35,
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        width: "100%",
        marginBottom: 5
    },
    friendOrders: {
        fontSize: 14,
        color: 'green',
        fontWeight: 'bold',
        marginTop: 10
    }
})

export default connect(null, mapDispatchToProps)(ProductCard);