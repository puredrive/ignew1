// @flow

import React from 'react'
import { ScrollView, TextInput } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { AsyncStorage } from 'react-native'
import AlertMessage from '../Components/AlertMessage'
import moment from 'moment';
import { Button, Icon, Text, ListView, Tile, Title, Subtitle, Row, Image, View, Caption, TouchableOpacity } from '@shoutem/ui';
import _ from 'lodash';

// Styles
import styles from './Styles/CountdownScreenStyle'

class CountdownScreen extends React.Component {
  constructor(props) {
    super(props)
    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    // const ds = new ListView.DataSource({ rowHasChanged })

    // Datasource is always in state
    this.state = {
      //dataSource: ds.cloneWithRows(this.props.events)
      events: this.props.events
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
    var a = moment();

    return (
      <View style={styles.row}>
        <Text style={styles.boldLabel}>{rowData.eventname}</Text>
        <Text style={styles.label}>{rowData.eventdate}</Text>
        <Text style={styles.label}>{a.to(rowData.eventdate)}</Text>
      </View>
    )
  }


  onRowPress() {
    //Actions.employeeEdit({ employee: this.props.employee });
    console.log('Pressed!');
    
  }
  renderRowShoutEm(rowData) {
    var a = moment();
    return (
      <TouchableOpacity onPress={()=> {
        console.log('hello1');
        this.onRowPress.bind(this);
      }}> 
        <Row >
          <View styleName="vertical">
            {/*          <Image
            styleName="small-avatar stretch"
            source={{ uri: 'http://shoutem.github.io/img/ui-toolkit/examples/image-9.png' }}
            />*/}
            <Title styleName="flexible">{rowData.eventname}</Title>
            <Caption>{rowData.eventdate}</Caption>

          </View>

          <View styleName="horizontal h-center" style={{ flexDirection: 'row' }} >
            <Title >{a.to(rowData.eventdate)}</Title>
          </View>
          <Icon styleName="disclosure" name="right-arrow" />
        </Row>
      </TouchableOpacity>

    )
  }

  renderHeader() {
    return (
      <Title styleName="lg-gutter">I am a header</Title>
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
        //dataSource: this.state.dataSource.cloneWithRows(newProps.events)
        events: newProps.events
      })
    }
  }
  render() {

    return (
      <ScrollView style={styles.container}>
        {/*<AlertMessage title='Nothing to See Here, Move Along' show={this._noRowData()} />
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          pageSize={15}
          />*/}
        <ListView
          autoHideHeader={true}
          data={this.state.events}
          renderRow={this.renderRowShoutEm}
          // renderHeader={this.renderHeader}
          />

        <Button styleName="dark">
          <Icon name="add-event" />
          <Text>CHECK IN HERE</Text>
        </Button>
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
