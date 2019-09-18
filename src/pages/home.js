import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Tell from '../components/Tell';
import jwtDecode from 'jwt-decode';

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
  }
}

export class home extends Component {
  state = {
    tells: null
  };
  componentDidMount() {
    axios
      .get('/tells')
      .then(res => {
        this.setState({
          tells: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    let recentTellsMarkup = this.state.tells ? (
      this.state.tells.map(tell => {
        return <Tell key={tell.tellId} tell={tell} />;
      })
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentTellsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile info here</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
