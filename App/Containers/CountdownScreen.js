// @flow

import React from 'react'
import { ScrollView, Text, TextInput, ListView, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { AsyncStorage } from 'react-native'
import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/CountdownScreenStyle'

class CountdownScreen extends React.Component {
  constructor(props) {
    super(props)
    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    const ds = new ListView.DataSource({ rowHasChanged })

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(this.props.events)
    }
    console.log('loggin props.event');
    console.log(this.props.events);
    // this.state = { event:'',
    // events:[]  };
    // AsyncStorage.getItem('events').then((events) => {
    //   this.setState({events: JSON.parse(events)});
    //   console.log('get data');
    //   console.log(this.state);
    //   console.log('print events');
    //   console.log(this.state.events);
    // });
  }
  _renderRow(rowData) {
    return (
      <View style={styles.row}>
        <Text style={styles.boldLabel}>{rowData.eventname}</Text>
        <Text style={styles.label}>{rowData.eventdate}</Text>
      </View>
    )
  }
  saveData(someValue) {
    var items = this.state.events;
    items.push(someValue);
    this.setState({ event: someValue });
    //how to append to a list of objects
    AsyncStorage.setItem('events', JSON.stringify(this.state.events));
    console.log('save data');
    console.log(this.state.events);
    console.log(this.state);
    // this.setState({'events':someValue});
  }
  _noRowData() {
    return this.state.dataSource.getRowCount() === 0
  }

  componentWillReceiveProps(newProps) {
    if (newProps.events) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newProps.events)
      })
    }
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <AlertMessage title='Nothing to See Here, Move Along' show={this._noRowData()} />
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          pageSize={15}
          />

        {/*        <TextInput style={styles.TextInput}
        onChangeText={(text)=>this.saveData(text)}
        value={this.state.event}/>*/}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('props in countdownscreen');
  console.log(state.countdown.events);
  return {
    events: state.countdown.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountdownScreen)
