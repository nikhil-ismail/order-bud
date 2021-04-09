import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native';

import ItemImage from './ItemImage';
import ItemDetails from './ItemDetails';
import QuantitySetter from './QuantitySetter';
import AddToCartButton from './AddToCartButton';
import Disclaimer from './Disclaimer';
import CreateAccountButton from './CreateAccountButton';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateItemQuantity, selectCartItems, clearCart } from '../../../Redux/cartSlice';
import { selectIsLoggedIn } from '../../../Redux/userSlice';

const ItemBottomSheet = (props) => {
    const [quantity, setQuantity] = useState(props.quantity ? props.quantity : 1);
    const [showDisclaimer, setShowDisclaimer] = useState(false);

    const { id, image, name, description, brand, price, business } = props.product;

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const checkValidAdd = () => {
        let validAdd = true;
        cartItems.map(cartItem => {
            if (cartItem.business.name !== business.name) {
                validAdd = false;
            }
        })
        return validAdd;
    }

    const handleAddToCart = () => {
        if (checkValidAdd()) {
            if (props.cartType === "Add") {
                dispatch(addToCart({
                    id: id,
                    dateAdded: Date.now(),
                    image: image,
                    name: name,
                    brand: brand,
                    description,
                    price: price.$numberDecimal ? price.$numberDecimal : price,
                    quantity: quantity,
                    business: business
                }))
            } else {
                dispatch(updateItemQuantity({
                    id: id,
                    dateAdded: props.product.dateAdded,
                    image: image,
                    name: name,
                    brand: brand,
                    description,
                    price: price.$numberDecimal ? price.$numberDecimal : price,
                    quantity: quantity,
                    business: business
                }))
            }
            props.handleRemoveItemModal();
        } else {
            setShowDisclaimer(true);
        }
    }

    const handlePlusCounter = () => {
        setQuantity(quantity + 1);
    }

    const handleMinusCounter = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const handleCloseDisclaimer = (response) => {
        if (response === 'cancel') {
            setShowDisclaimer(false);
        } else {
            dispatch(clearCart());
            dispatch(addToCart({
                id: id,
                dateAdded: Date.now(),
                image: image,
                name: name,
                brand: brand,
                description,
                price: price.$numberDecimal ? price.$numberDecimal : price,
                quantity: quantity,
                business: business
            }))
            setShowDisclaimer(false);
            props.handleRemoveItemModal();
        }
    }

    const handleGoToLogin = () => {
        props.handleRemoveItemModal();
        props.navigation.navigate('Login', { goBack: true });
    }

    return (
        <View style={styles.container}>
            <ItemImage image={image} handleRemoveItemModal={props.handleRemoveItemModal} />
            <ItemDetails name={name} brand={brand} description={description} />
            <QuantitySetter quantity={quantity} onPlus={handlePlusCounter} onMinus={handleMinusCounter} />
            {
                isLoggedIn
                ?
                <AddToCartButton handlePress={handleAddToCart} price={price} quantity={quantity} cartType={props.cartType} />
                :
                <CreateAccountButton goToLogin={handleGoToLogin} />
            }
            {
                showDisclaimer &&
                <Disclaimer
                    showDisclaimer={showDisclaimer}
                    business={business.name}
                    handleCloseDisclaimer={handleCloseDisclaimer}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        position: "absolute",
        bottom: 2,
        width: "100%",
        alignItems: "center",
        paddingBottom: 40
    }
});

export default ItemBottomSheet;