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
    this.state = { event:'',
    events:[]  };
    AsyncStorage.getItem('events').then((events) => {
      this.setState({events: JSON.parse(events)});
      console.log('get data');
      console.log(this.state);
      console.log('print events');
      console.log(this.state.events);
    });
  }

  saveData(someValue){
    var items = this.state.events;
    items.push(someValue);
    this.setState({event:someValue});
    //how to append to a list of objects
    AsyncStorage.setItem('events',JSON.stringify(this.state.events));
   console.log('save data');
   console.log(this.state.events);
   console.log(this.state);
   // this.setState({'events':someValue});
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>CountdownScreen Container
       
        </Text>
        <TextInput style={styles.TextInput}
        onChangeText={(text)=>this.saveData(text)}
        value={this.state.event}/>
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
