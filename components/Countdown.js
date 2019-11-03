import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, Text,View} from 'react-native'



const Countdown = (props) => {
    const inSeconds = Math.round(props.timeRemaining/1000)
    const minutes = Math.floor(inSeconds/60)
    const seconds = inSeconds % 60
    const paddedMin = minutes < 10? "0"+minutes:minutes
    const paddedSec = seconds < 10? "0"+seconds:seconds
    return (    
            <View style={props.style}>
                <Text style={{fontSize:108}}>
                {paddedMin}:{paddedSec}
                </Text>
                
            </View>)
}
Countdown.propTypes = {
    timeRemaining: PropTypes.number.isRequired,
    isRunning: PropTypes.bool.isRequired,
    style:PropTypes.object
}
export default Countdown
  