import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet,Image,ImageBackground,StatusBar,Platform,SafeAreaView,FlatList,Dimensions } from 'react-native'
import axios from 'axios'
import { element } from 'prop-types'

export default class Meteor extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            meteor: {}
        }
    }

    extractor=(item,index)=>{
        return(
            index.toString()
        )
    }

    renderItems=({item})=>{
        let bg
        let speed
        if(item.threat_score<=30){
            speed = require('../assets/meteor_speed1.gif')
            bg = require('../assets/meteor_bg1.png')
        }
        else if(item.threat_score<=75){
            speed = require('../assets/meteor_speed2.gif')
            bg = require('../assets/meteor_bg2.png')
        }
        else{
            speed = require('../assets/meteor_speed3.gif')
            bg = require('../assets/meteor_bg3.png')
        }
       return(
        <View>
            <ImageBackground
            source={bg}
            style={styles.backgroundImage}
            />
            <View style={styles.gifContainer}>
                <Image
                source={speed}
                style={{width:100,height:100,alignSelf:'center'}}
                />
                <View>
                    <Text style={[styles.cardTitle,{marginTop:80}]}>
                       {item.name}
                    </Text>

                    <Text style={[styles.cardText,{marginTop:10}]}>
                       closest To Earth : {item.close_approach_data[0].close_approach_date_full}
                    </Text>

                    <Text style={[styles.cardText,{marginTop:10}]}>
                       Minimum Diameter : {item.estimated_diameter.kilometers.estimated_diameter_min}
                    </Text>

                    <Text style={[styles.cardText,{marginTop:10}]}>
                    Maximum Diameter : {item.estimated_diameter.kilometers.estimated_diameter_max}
                    </Text>

                    <Text style={[styles.cardText,{marginTop:10}]}>
                       Velocity : {item.close_approach_data[0].relative_velocity.kilometers_per_hour}
                    </Text>

                </View>
            </View>
        </View>
       )
    }

    getMeteorData = () => {
        axios.get('https://api.nasa.gov/neo/rest/v1/feed?api_key=uV04yxzadnJrkRG94PBIe2GLOlnifZpDiGevFqbj')
            .then(res => {
                this.setState({ meteor: res.data.near_earth_objects })
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount = () => {
        this.getMeteorData();
    }

    render() {

        if (Object.keys(this.state.meteor).length == 0) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                    <Text>
                        Loading...
                    </Text>
                </View>
            )
        }



        else {
            //   console.log(this.state.meteor)
            let meteorArr = Object.keys(this.state.meteor).map(date => {
                return (
                    this.state.meteor[date]
                )
            })
            //  console.log(meteorArr)
            let meteors = [].concat.apply([], meteorArr)
            // console.log(meteors)
            meteors.forEach(element => {
                let d = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) / 2
                let threatScore = d / element.close_approach_data[0].miss_distance.kilometers * 1000000000
                // console.log(threatScore)
                element.threat_score = threatScore
            })
            // console.log(meteors)
            meteors.sort(function (a, b) {
                return (
                    b.threat_score - a.threat_score
                )
            })
            meteors = meteors.slice(0, 5)
            return (
                <View style={styles.container}>

                    <SafeAreaView
                    style={styles.safearea}
                    />

                    <FlatList
                        data={meteors}
                        renderItem={ this.renderItems }
                        horizontal={true}
                        keyExtractor={ this.extractor }
                    />

                </View>
            )
        }

    }



}


const styles = StyleSheet.create({
    container:{
        flex:1
    },
    safearea:{
        paddingTop:Platform.OS === "android"?StatusBar.currentHeight:0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    cardTitle: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold",
        color: "white"
    },
    cardText: {
        color: "white"
    },
    gifContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },

})
