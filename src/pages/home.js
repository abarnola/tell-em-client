import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Tell from '../components/Tell';
import Profile from '../components/Profile';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
//Redux
import { getTells } from '../redux/actions/dataActions';
import { connect } from 'react-redux';
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
  }
}

export class home extends Component {
  componentDidMount() {
    this.props.getTells();
  }

  render() {
    const { tells, loading } = this.props.data;
    let recentTellsMarkup = !loading ? (
      tells.map(tell => {
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
          <Profile />
        </Grid>
      </Grid>
    );
  }
}
home.propTypes = {
  getTells: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  data: state.data
});
export default connect(
  mapStateToProps,
  { getTells }
)(home);
