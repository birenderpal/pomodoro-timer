import React from 'react'
import {View,TextInput,StyleSheet,Text} from 'react-native'
import PropTypes from 'prop-types'

export default class TimeInput extends React.Component{
    state = {
        mins: Math.floor(this.props.defaultValue / (60*1000)),
        seconds: Math.round(this.props.defaultValue % (60*1000)),
    }
    updateTime= (measure,time) =>{
        if (measure ==="mins"){
            this.props.onChangeText((time * 60)+ (this.state.seconds),this.props.type)
            this.setState({mins:time})
        }
        if (measure ==="seconds"){
            this.props.onChangeText(time + (this.state.mins * 60),this.props.type)
            this.setState({seconds:time})
        }

    }
    render(){
        console.log(this.state)
        return(
            <View style={styles.row}>
                <View style={styles.title}>
                    <Text style={styles.textItems}>{this.props.label}</Text>
                </View>
                <View style={styles.inputGroup}>
                    <View style={styles.inputLabel}>
                        <Text style={styles.textItems}>{"Min:"}</Text>
                    </View>

                        <TextInput
                            style={styles.textInput}
                            keyboardType="numeric"
                            onChangeText={(mins)=>this.updateTime("mins",+mins)}
                            value={this.state.mins.toString()}
                        />
                    <View style={styles.inputLabel}>
                        <Text style={styles.textItems}>{"Sec:"}</Text>
                    </View>
                        <TextInput
                            style={styles.textInput}
                            keyboardType="numeric"
                            onChangeText={(seconds)=>this.updateTime("seconds",+seconds)}
                            value={this.state.seconds.toString()}
                        />
                </View>        

            </View>  
        )
    }
}
TimeInput.propType= {
    defaultValue: PropTypes.string,
    label: PropTypes.string,
    onChangeText: PropTypes.func.isRequired    
}

const styles = StyleSheet.create({
    row:{
        flexDirection:"row",
        padding:25
    },
    textInput:{
        height:30,
        width:55,
        borderColor:"gainsboro",
        borderWidth:1, 
        paddingLeft:8,
        fontSize:16,
        fontWeight:"bold"   
    },
    inputGroup:{    
        flex:0.7,
        flexDirection:"row",
        justifyContent:"space-around"        
    },
    inputLabel:{        
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },    
    title:{     
        flex:0.3,   
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },    
    textItems:{
        flex:1,
        fontSize:18,
        textAlign:"center"
    }
  });
  