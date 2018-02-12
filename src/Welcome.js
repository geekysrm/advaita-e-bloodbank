import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

import 'antd/dist/antd.css';
import { Carousel , Button } from 'antd';
import './Welcome.css';

class Welcome extends Component
{
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentWillMount() {


  }

  render()
  {
    return(
      <div className="body">
        <div className="container">
          <div className="split left">
            <h1 className="h1" style={styles.heading}>I need blood</h1>
            <NavLink className="button" to="/map">Show Donors</NavLink>
          </div>
          <div className="split right">
            <h1 className="h1" style={styles.heading}>I want to <br /> donate blood</h1>
            <NavLink className="button" to="/donate">Get Started</NavLink>
          </div>
        </div>
      </div>
    );
  }
}

const styles={
  heading:{
    fontSize:50,
  }
}


export default Welcome;
