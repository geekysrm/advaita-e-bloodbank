import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import { Button, Card, Input } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';

const Search = Input.Search;
const bloodgrp = [{
    value: 'O+',
    label: 'O+',

}, {
    value: 'A+',
    label: 'A+',

},
{
    value: 'B+',
    label: 'B+',

},
{
    value: 'AB+',
    label: 'AB+',

}, {
    value: 'O-',
    label: 'O-',

}, {
    value: 'A-',
    label: 'A-',

}, {
    value: 'B-',
    label: 'B-',

}, {
    value: 'AB-',
    label: 'AB-',

    }];


export class MapContainer extends Component {

  constructor(props) {
      super(props);

      this.state = {
          bg_entered:false,
          donors: []
      };

  }

  onEnterBloodGroup = (value) => {
      console.log("Got value ", value);
      axios({
          method: 'post',
          url: '/get-donors',
          data: { blood_group: value.toUpperCase() }, //acceptor's bg
          config: { headers: { 'Content-Type': 'application/json' } }
      })
          .then(response => {
              console.log(response.data);
              this.setState({
                  donors: response.data
              });
              this.setState({
                  bg_entered: true
              })
          })
          .catch(error => {
              console.log(error);
              console.log('No donor found!');
          });
  }

render() {
    return (
      <div>
      <div style={styles.content}>
      {this.state.bg_entered ? (<div>
          <div style={styles.cardContainer}>
              <div>
                  {this.state.donors.map(function (donor) {

                      return (
                          <div style={{ background: '#ECECEC', padding: '30px', width: 610, marginLeft: 20 }}>
                              <Card style={{ width: 550, fontWeight: 'bold' }} >
                                  <br />
                                  <p>Name: {donor.name}</p>
                                  <p>Gender: {donor.gender}</p>
                                  <p>Age: {donor.age}</p>
                                  <p>Place: {donor.place}</p>
                                  <p>Blood Group: {donor.blood_group}</p>

                              </Card>
                              <br />
                              <br />
                          </div>
                      );
                  })}
              </div>
          </div>
      </div>) :
  (
      <div>
      <h1 style={{ marginTop: "10px", textAlign: "center" }}>Enter your blood Group </h1>
      <div style={{ marginLeft:'15%' , marginRight:'15%'}} >
        <Search placeholder="Enter your Blood Group" enterButton="Submit" onSearch={value => this.onEnterBloodGroup(value)} />
      </div>
      </div>
  )}

  </div>

  {this.state.donors.map( (donor)=> {

      return (
        <Map google={this.props.google} zoom={5}
        initialCenter={{
            lat: 20.297141,
            lng: 85.7410162
          }}
          style={{width:'50%', marginTop:-100 }}
        >
          <Marker
                  name={'Current location'} />

          <Marker
          title={donor.name}
              name={donor.name}
              position={{lat: donor.latitude,
              lng: donor.longitude}} />

        </Map>
      );
  })}
      </div>
    );
  }
}

const styles = {
    content: {
        marginLeft: '60%',
        width: '35%'
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBUdtb7Ht29C-NxCNhGHjZ7r6qaxV1Twjw')
})(MapContainer)
