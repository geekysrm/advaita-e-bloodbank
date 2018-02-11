import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import Welcome from './Welcome';

class AppRouter extends React.Component {

  render() {
    return (

        <Router>
          <Switch>
            <Route exact path="/" component={Welcome}/>
    

            <Route component={NotFoundPage} />
          </Switch>
        </Router>

    );
  }
}

export default AppRouter;
