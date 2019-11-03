import React from 'react';
import { Keyboard, StyleSheet, Text, SafeAreaView, View, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { vibrate, Ticker } from '../utils';
import Countdown from './Countdown';
import TimeInput from './TimeInput'
import Buttons from './Buttons'


const sec2MilSec = sec => sec * 1000
const TIME_TYPE = { "work": 25 * 60 * 1000, "rest": 5 * 60 * 1000 }
export default class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timeRemaining: TIME_TYPE.work,
      isRunning: false,
      timeType: "work",
      workTime: TIME_TYPE.work,
      restTime: TIME_TYPE.rest
    }
  }

  setTimeRemaining = (timeRemaining) => {
    console.log(timeRemaining)
    this.setState({ timeRemaining: timeRemaining })
  }
  setFinished = () => {
    vibrate()
    let timeRemaining = this.state.timeType == "work" ? this.state.restTime : this.state.workTime
    let type = this.state.timeType == "work" ? "rest" : "work"
    if (this.state.isRunning) {
      this.setState({ timeRemaining: timeRemaining, timeType: type })
      this.createTicker(timeRemaining)
      this.ticker.start()
    }
  }
  createTicker = (timeRemaining) => {
    this.ticker = new Ticker(timeRemaining, this.setTimeRemaining, this.setFinished)
  }
  componentWillUnmount() {
    if (this.ticker) this.ticker.stop()
  }
  updateTime = (time, type) => {

    if (this.state.timeType == type) {
      if (this.ticker)
        this.ticker.stop()
      this.createTicker(sec2MilSec(+time))
      if (type === "work") {
        this.setState({
          timeRemaining: sec2MilSec(time),
          workTime: sec2MilSec(time), 
          isRunning: this.state.isRunning ? !this.state.isRunning : this.state.isRunning
        })
      }
      if (type === "rest") {
        this.setState({
          timeRemaining: sec2MilSec(time),
          restTime: sec2MilSec(time), 
          isRunning: this.state.isRunning ? !this.state.isRunning : this.state.isRunning
        })
      }
    }
    else {
      if (type === "work") {
        this.setState({
          workTime: sec2MilSec(+time)
        })
      }
      if (type === "rest") {
        this.setState({
          restTime: sec2MilSec(+time)
        })
      }
    }

  }
  startTicker = () => {
    if (this.ticker) {
      this.ticker.isRunning ? this.ticker.stop() : this.ticker.start()
      this.setState({ isRunning: !this.state.isRunning })
    }
    else {
      this.createTicker(this.state.timeRemaining)
      this.ticker.start()
      this.setState({ isRunning: true })
    }
  }
  resetTicker = () => {
    if (this.ticker) {
      this.ticker.stop()
      this.createTicker(this.state.workTime)
      this.setState({ 
        isRunning: false, 
        timeRemaining: this.state.workTime, 
        timeType: "work" })
    }
    else {
      this.setState({ 
        isRunning: false, 
        timeRemaining: this.state.workTime, 
        timeType: "work" })
    }
  }
  render() {
    return (
      <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <SafeAreaView style={styles.container}>
            <View style={styles.row}>
              <Text style={{ fontSize: 48}}>{this.state.timeType.toUpperCase() + " TIMER"}</Text>
            </View>
            <Countdown style={styles.countdown} timeRemaining={this.state.timeRemaining} isRunning={this.state.isRunning} />

            <View style={{flex:1}}>
              <TimeInput onChangeText={this.updateTime} defaultValue={this.state.workTime} type="work" label="Work Time:" />
              <TimeInput onChangeText={this.updateTime} defaultValue={this.state.restTime} type="rest" label="Rest Time:" />
            </View>
            <Buttons isRunning={this.state.isRunning} resetTicker={this.resetTicker} startTicker={this.startTicker}/>
          </SafeAreaView>
        </TouchableWithoutFeedback>

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",

  },
  inputGroup: {
    flex: 1,
    flexDirection: "row",
  },
  row: {
    flex:1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center"
  },
  inputLabel: {
    padding: 5,
    fontSize: 18,
    flex: 0.3,
    fontWeight: "bold"
  },
  countdown: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
