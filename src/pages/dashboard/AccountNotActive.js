import React, { Component } from 'react';
import axios from 'axios';


/* IMPORT Components */
import { getCookieValueByName } from '../../components/toolbox';
/* ./IMPORT Components */

/* IMPORT UI-Components */
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
/* ./IMPORT UI-Components */

class AccountNotActive extends Component{
  constructor(props){
    super(props);
    this.state = {
      resendMail:false
    }
  }

  sendActivationMail = () => {
    const basic_url = process.env.REACT_APP_API_URL;
    const reset_url = basic_url + 'user/access/create_activation';

    const body = JSON.stringify({
      email:this.props.user.email,
      group:'a'
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookieValueByName('csrftoken')
      },
      withCredentials:true,
    };

    axios.post(reset_url, body, config)
    .then((res) => {
      this.setState({
        resendMail:true
      })
    })
    .catch((err) => {

    })
  }

  render(){
    if (!this.state.resendMail){
      return(
        <>
          <Typography gutterBottom variant="h5" component="h2">
            Thank's for your registration!
          </Typography>
          <small>
            <span>Your account is not active yet. We have send you an email. </span>
            <Link
              href="#"
              onClick={this.sendActivationMail}
            >
              &nbsp;Click Here&nbsp;
            </Link>
            <span>If you did not receive the Email. Please take a also look into your spam.</span>
          </small>
        </>
      );
    }
    return (
      <>
        <Typography gutterBottom variant="h5" component="h2">
          We have send the activation again!
        </Typography>
        <small>
          <span>Your account is not active yet. We have send you an email. </span>
          <Link
            href="#"
            onClick={this.sendActivationMail}
          >
            &nbsp;Click Here&nbsp;
          </Link>
          <span>If you did not receive the Email. Please take a also look into your spam.</span>
        </small>
      </>
    );
  }
}

export default AccountNotActive;
