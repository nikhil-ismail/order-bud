import React, { useState } from "react";
import { View, SafeAreaView, TextInput, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/userSlice';

import baseURL from "../../assets/common/baseUrl";

const { height } = Dimensions.get("window");

const Login = (props) => {
    const [page, setPage] = useState('Register');
    const [emailFocus, setEmailFocus] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const handleTabSwitch = () => {
        setPage('Register');
        setEmailFocus(false);
        setNameFocus(false);
        setPhoneFocus(false);
        setPasswordFocus(false);
        setConfirmPasswordFocus(false);
    }

    const handleSubmit = () => {
        if (page === 'Login') {
            axios.post(`${baseURL}users/login`, { email, password })
            .then(response => {
                if (response.data.auth) {
                    dispatch(setUser(response.data));
                } else {
                    setError('Unable to register. Please try again.');
                    setEmail('');
                    setName('');
                    setPhone('');
                    setPassword('');
                    setConfirmPassword('');
                }
            })
            .catch(err => {
                setError('An error occurred while registering. Please try again.')
                setEmail('');
                setName('');
                setPhone('');
                setPassword('');
                setConfirmPassword('');
            });
        } else {
            if (password === confirmPassword) {
                axios.post(`${baseURL}users/register`, { email, name, phone, password })
                    .then(response => {
                        if (response.data.auth) {
                            dispatch(setUser(response.data));
                        } else {
                            setError('Unable to register. Please try again.');
                            setEmail('');
                            setName('');
                            setPhone('');
                            setPassword('');
                            setConfirmPassword('');
                        }
                    })
                    .catch(err => {
                        setError('An error occurred while registering. Please try again.')
                        setEmail('');
                        setName('');
                        setPhone('');
                        setPassword('');
                        setConfirmPassword('');
                    });
            } else {
                setError('You passwords did not match. Please try again.')
            }
        }
        if (props.route.params !== undefined) {
            props.navigation.goBack();
        }
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Welcome To OrderBud</Text>
                    <Text style={styles.subHeader}>Order weed from top dispensaries near you.</Text>
                </View>
                <View style={styles.bodyContainer}>
                    <View style={styles.buttonGroupContainer}>
                        <TouchableOpacity
                            style={[styles.button, page === 'Register' && styles.highlightedContainer]}
                            onPress={handleTabSwitch}
                        >
                            <Text style={[styles.buttonGroupText, page === 'Register' && styles.highlightedText]}>Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, page === 'Login' && styles.highlightedContainer]}
                            onPress={() => setPage('Login')}
                        >
                            <Text style={[styles.buttonGroupText, page === 'Login' && styles.highlightedText]}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputContainer}>
                        {
                            page === 'Register' &&
                            <TextInput
                                style={[styles.textInput, nameFocus && styles.focusInputStyle]}
                                name="name"
                                value={name}
                                onChangeText={text => setName(text)}
                                placeholder="Name"
                                onFocus={() => setNameFocus(true)}
                                onBlur={() => setNameFocus(false)}
                                blurOnSubmit={false}
                                autoCapitalize={false}
                            />
                        }
                        <TextInput
                            style={[styles.textInput, emailFocus && styles.focusInputStyle]}
                            name="email"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            placeholder="Email"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            blurOnSubmit={false}
                            autoCapitalize={false}
                        />
                        {
                            page === 'Register' &&
                            <TextInput
                                style={[styles.textInput, phoneFocus && styles.focusInputStyle]}
                                name="phone"
                                value={phone}
                                onChangeText={text => setPhone(text)}
                                placeholder="Phone Number"
                                onFocus={() => setPhoneFocus(true)}
                                onBlur={() => setPhoneFocus(false)}
                                blurOnSubmit={false}
                                keyboardType="numeric"
                            />
                        }
                        <TextInput
                            style={[styles.textInput, passwordFocus && styles.focusInputStyle]}
                            name="password"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            placeholder="Password"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                            blurOnSubmit={false}
                            autoCapitalize={false}
                            secureTextEntry={true}
                        />
                        {
                            page === 'Register' &&
                            <TextInput
                                style={[styles.textInput, confirmPasswordFocus && styles.focusInputStyle]}
                                name="confirm password"
                                value={confirmPassword}
                                onChangeText={text => setConfirmPassword(text)}
                                placeholder="Confirm Password"
                                onFocus={() => setConfirmPasswordFocus(true)}
                                onBlur={() => setConfirmPasswordFocus(false)}
                                blurOnSubmit={false}
                                autoCapitalize={false}
                                secureTextEntry={true}
                            />
                        }
                    </View>
                    <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>{page === 'Login' ? 'Login' : 'Create Account'}</Text>
                    </TouchableOpacity>
                    {
                        error.length > 0 && page === 'Register' &&
                        <Text style={styles.error}>{error}</Text>
                    }
                </View>
            </SafeAreaView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: "white"
    },
    safeContainer: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
    },
    headerContainer: {
        marginBottom: 20,
        paddingHorizontal: 20
    },
    header: {
        fontSize: 36,
        fontWeight: "bold",
        color: "green",
    },
    subHeader: {
        color: "grey",
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 10
    },
    bodyContainer: {
        width: "95%",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        borderRadius: 5,
    },
    buttonGroupContainer: {
        flexDirection: "row",
        borderColor: "green",
        borderWidth: 2,
        borderRadius: 5,
        width: "100%"
    },
    button: {
        width: "50%",
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonGroupText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    highlightedContainer: {
        backgroundColor: "green",
    },
    highlightedText: {
        color: "white"
    },
    error: {
        color: "red",
        fontSize: 16,
        marginTop: 20
    },
    inputContainer: {
        width: "100%",
        marginVertical: 30,
        alignItems: "center"
    },
    textInput: {
        marginVertical: 10,
        height: 50,
        borderRadius: 5,
        borderColor: "#e6e6e6",
        borderWidth: 2,
        width: "100%",
        paddingHorizontal: 20,
        fontSize: 18
    },
    focusInputStyle: {
        borderColor: "green",
        borderWidth: 2
    },
    buttonContainer: {
        backgroundColor: "green",
        padding: 10,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    }
})

export default Login;