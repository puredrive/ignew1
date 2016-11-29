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
    this.state = { events:{}  };
    AsyncStorage.getItem('events').then((events) => {
      this.setState(JSON.parse(events));
      console.log('get data');
      console.log(this.state);
      console.log('print events');
      console.log(this.state.events);
    });
  }

  saveData(someValue){
    this.setState({events})
    //how to append to a list of objects
    AsyncStorage.setItem('events',JSON.stringify(this.state.events));
   console.log('save data');
   console.log(this.state.events);
   // this.setState({'events':someValue});
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
