import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import Welcome from './Welcome';
import BloodDonor from './BloodDonor';
import BloodAcceptor from './BloodAcceptor';


class AppRouter extends React.Component {

  render() {
    return (

        <Router>
          <Switch>
            <Route exact path="/" component={Welcome}/>
            <Route exact path="/donate" component={BloodDonor} />
          <Route exact path="/accept" component={BloodAcceptor} />


            <Route component={NotFoundPage} />
          </Switch>
        </Router>

    );
  }
}

export default AppRouter;
