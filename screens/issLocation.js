import React from 'react'
import { View, Text, StyleSheet, ImageBackground, SafeAreaView, StatusBar, Platform, Image } from 'react-native'
import axios from 'axios'
import MapView, { Marker } from 'react-native-maps'

export default class ISSLocator extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            location: {}
        }
    }

    getIssLocation = () => {
        axios.get('https://api.wheretheiss.at/v1/satellites/25544')
            .then(response => {
                this.setState({
                    location: response.data
                })
            })
            .catch(error => [
                console.log(error)
            ])
    }

    componentDidMount = () => {
        this.getIssLocation()
        setInterval(async () => {
            this.getIssLocation()
        }, 1000)
    }

    render() {
        if (Object.keys(this.state.location).length == 0) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>
                        Loading...
                    </Text>
                </View>
            )
        }
        else {

            return (


                <View style={styles.container}>
                    <SafeAreaView
                        style={styles.safeArea}
                    />
                    <ImageBackground
                        style={styles.bg}
                        source={require('../assets/iss_bg.jpg')}
                    >
                        <View style={styles.titleView}>
                            <Text style={styles.titleText}> ISS Location</Text>


                        </View>

                        <View style={styles.mapContainer}>
                            <MapView
                                style={styles.map}
                                region={{
                                    latitude: this.state.location.latitude,
                                    longitude: this.state.location.longitude,
                                    latitudeDelta: 100,
                                    longitudeDelta: 100
                                }}
                            >

                            </MapView>

                            <Marker
                                coordinate={{ latitude: this.state.location.latitude, longitude: this.state.location.longitude }}
                            >
                                <Image
                                    source={require('../assets/iss_icon.png')}
                                    style={{ width: 50, height: 50 }}
                                />

                            </Marker>

                        </View>

                        <View style={styles.infoContainer}>
                            <Text style={styles.infoText}>Latitude: {this.state.location.latitude}</Text>
                            <Text style={styles.infoText}>Longitude: {this.state.location.longitude}</Text>
                            <Text style={styles.infoText}>Velocity: {this.state.location.velocity}</Text>
                            <Text style={styles.infoText}>Altitude: {this.state.location.altitude}</Text>
                        </View>

                    </ImageBackground>
                </View>

            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    safeArea: {
        marginTop: Platform.OS === 'android' ? (StatusBar.currentHeight) : (0),

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
    mapContainer: {
        //flex: 0.6,
        borderRadius: 300,
        width: 300,
        height: 300,
        overflow: 'hidden',
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'

    },
    map: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        flex: .2,
        // backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 15,
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30
    },
    infoText: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'
    }
})