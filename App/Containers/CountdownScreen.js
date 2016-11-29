// @flow

import React from 'react'
import { ScrollView, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { AsyncStorage } from 'react-native'

// Styles
import styles from './Styles/CountdownScreenStyle'

class CountdownScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = { 'events': '' };
    AsyncStorage.getItem('events').then((myValue) => {
      this.setState({ 'events': myValue });
      //console.log(this.state.events);
    });
  }

  saveData(someValue){
    AsyncStorage.setItem('events',someValue);
    this.setState({'events':someValue});
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>CountdownScreen Container
        myValue = {this.state.events}
        </Text>
        <TextInput style={styles.TextInput}
        onChangeText={(text)=>this.saveData(text)}
        value={this.state.events}/>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountdownScreen)
