import React, { Component } from 'react';
import { connect } from 'react-redux';

import AccountNotActive from './AccountNotActive';

class Dashboard extends Component{
  render(){
    console.log(this.props.user)
    if(this.props.user.account_activated_by_key){
      return (
        <h1>Dashboard</h1>
      );
    } else {
      return (
        <AccountNotActive user={this.props.user}/>
      )
    }
  }
}

let mapStateToProps = (state) => {
  return {
    user:state.user
  }
}

let mapDispatchToProps = {
}

let DashboardContainer = connect(mapStateToProps,mapDispatchToProps)(Dashboard);
export default DashboardContainer;
