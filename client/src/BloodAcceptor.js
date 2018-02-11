import React, { Component } from 'react';
import { Button, Card } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';

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

class BloodAcceptor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            donors: []
        };

    }

    componentWillMount()
    {
      axios({
          method: 'post',
          url: '/get-donors',
          data: { blood_group: 'AB+' },
          config: { headers: { 'Content-Type': 'application/json' } }
      })
          .then(response => {
              console.log(response.data);
              this.setState({
                donors:response.data
              });
          })
          .catch(error => {
              console.log(error);
              console.log('No donor found!');
          });
    }

    render() {
        return (
            <div className="App">
                <div style={styles.content}>
                    <div style={styles.cardContainer}>
                        <div>
                            {this.state.donors.map(function (donor) {

                                return (
                                    <div style={{ background: '#ECECEC', padding: '30px', width: 610, marginLeft: 20 }}>
                                        <Card style={{ width: 550, fontWeight: 'bold' }} >
                                            <br />
                                            <p>Name: {donor.name}</p>

                                        </Card>
                                        <br />
                                        <br />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const styles = {
    content: {
        marginLeft: '30%',
        width: '65%'
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
}

export default BloodAcceptor;
