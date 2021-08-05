import React from 'react'
import { View, TouchableOpacity, Text, SafeAreaView, StyleSheet, Platform, StatusBar, ImageBackground, Image } from 'react-native'

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView
                    style={styles.safeArea}
                />
                <ImageBackground
                    style={styles.bg}
                    source={require('../assets/bg_image.png')}
                >
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}> ISS Tracker App</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.opacity}
                        onPress={() => {
                            this.props.navigation.navigate('ISSLocator')
                        }}
                    >
                        <Text style={styles.textTitle}>
                            ISS Location
                        </Text>
                        <Text style={styles.textMore}>
                            {'Know More--->'}
                        </Text>
                        <Text style={styles.textDigit}>
                            1
                        </Text>
                        <Image style={styles.image}
                            source={require('../assets/iss_icon.png')}
                        />
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.opacity}
                        onPress={() => {
                            this.props.navigation.navigate('Meteor')
                        }}
                    >
                        <Text style={styles.textTitle}>
                            Meteors
                        </Text>
                        <Text style={styles.textMore}>
                            {'Know More--->'}
                        </Text>
                        <Text style={styles.textDigit}>
                            2
                        </Text>
                        <Image style={styles.image}
                            source={require('../assets/meteor_icon.png')}
                        />
                    </TouchableOpacity>

                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    safeArea: {
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight) : (0),
    },
    titleView: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    titleText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white'
    },
    bg: {
        flex: 1,
        resizeMode: 'cover'
    },
    opacity: {
        flex: 0.25,
        marginTop: 90,
        marginHorizontal: 50,
        borderRadius: 30,
        backgroundColor: 'white'
    },
    textTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black',
        paddingLeft: 15,
        marginTop: 50
    },
    textMore: {
        paddingLeft: 30,
        color: 'red',
        fontSize: 15,
        marginTop: 3

    },
    textDigit: {
        position: 'absolute',
        color: 'rgba(183,183,183,.5)',
        fontSize: 150,
        right: 20,
        bottom: -30,
        zIndex: -1
    },
    image: {
        position: 'absolute',
        height: 200,
        width: 200,
        resizeMode: 'contain',
        right: 20,
        top: -110
    }
})