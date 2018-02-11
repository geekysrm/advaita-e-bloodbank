import React, { Component } from 'react';
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
      <div>
            <div className="container">
                <div className="split left">
                    <h1>The Designer</h1>
                    <a href="#" className="button">Read More</a>
                </div>
                <div className="split right">
                    <h1>The Programmer</h1>
                    <a href="#" className="button">Read More</a>
                </div>
            </div>
      </div>
    );
  }
}


export default Welcome;


