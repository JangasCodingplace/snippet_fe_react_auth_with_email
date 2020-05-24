import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { initialState } from './reducers/user';
import axios from 'axios';

/* IMPORT Actions */
import { authenticateUser } from './actions/authentication';
/* ./IMPORT Actions */

/* IMPORT Components */
import { getCookieValueByName } from './components/toolbox';
/* ./IMPORT Components */

/* IMPORT Components */
import PageWrapper from './components/PageWrapper/PageWrapper';
/* ./IMPORT Components */

/* Pages */
import Auth from './pages/auth/Auth';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/profile/Profile';
/* ./Pages */

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      ready:false
    }
  }
  componentDidMount(){
    if (
      this.props.user === initialState &&
      window.localStorage.getItem('auth_token')!==null
    ){
      const basic_url = process.env.REACT_APP_API_URL;
      const auth_url = basic_url + 'user/auth/login'

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookieValueByName('csrftoken')
        },
        withCredentials: true,
      };

      axios.post(auth_url, {}, config)
      .then((res) => {
        this.props.authenticateUser(res.data.user)
        this.setState({
          ready:true
        })
      })
      .catch((err) => {
        window.localStorage.removeItem('auth_token');
        this.setState({
          ready:true
        })
      })
    } else {
      this.setState({ready:true})
    }
  }

  render(){
    if (!this.state.ready){
      return (<></>);
    }
    if (
      this.props.user === initialState &&
      window.localStorage.getItem('auth_token')===null
    ){
      return (
        <Router>
          <PageWrapper>
            <Auth/>
          </PageWrapper>
        </Router>
      );
    }
    return (
      <Router>
        <PageWrapper>
          <Route path="/" exact component={Dashboard} />
          <Route path="/profile" component={Profile} />
        </PageWrapper>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    user:state.user
  }
}

let mapDispatchToProps = {
  authenticateUser:authenticateUser
}

let AppContainer = connect(mapStateToProps,mapDispatchToProps)(App);


export default AppContainer;
