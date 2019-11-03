import React from 'react'
import {View,TouchableOpacity,StyleSheet,Text} from 'react-native'
import PropTypes from 'prop-types'

const Buttons = props =>{
    return(
        <View style={{flex:1,alignItems:"center"}}>
        <View style={styles.buttonrow}>
          <TouchableOpacity
            color="black" style={styles.button}
            onPress={()=>props.startTicker()}>
            <Text style={styles.buttonText}>{props.isRunning ? "PAUSE" : "START"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>props.resetTicker()}>
            <Text style={styles.buttonText}>RESET</Text>
          </TouchableOpacity>
        </View>
      </View>

    )
}

Buttons.propTypes = {    
    isRunning: PropTypes.bool.isRequired,
    resetTicker: PropTypes.func.isRequired,
    startTicker:PropTypes.func.isRequired
}
const styles = StyleSheet.create({
    buttonrow: {
        flexDirection: "row",
      },
      button: {
        backgroundColor: "black",
        color: "white",
        padding: 15,
        margin: 20,
        flex: 1
      },
      buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 24
      }
    
})
export default Buttons