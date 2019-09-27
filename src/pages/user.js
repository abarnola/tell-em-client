import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Tell from '../components/Tell'
import StaticProfile from '../components/StaticProfile'
//Material-UI
import Grid from '@material-ui/core/Grid'

//Redux
import { connect } from 'react-redux'
import { getUserDetails } from '../redux/actions/dataActions'

export class user extends Component {
  state = {
    profile: null,
    tellIdParameter: null
  }
  componentDidMount() {
    const userName = this.props.match.params.userName
    const tellId = this.props.match.params.tellId
    console.log('componentDidMountinngggg')
    if (tellId) this.setState({ tellIdParameter: tellId })

    this.props.getUserDetails(userName)
    axios
      .get(`/user/${userName}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        })
      })
      .catch(err => console.log(err))
  }
  render() {
    const { tells, loading } = this.props.data
    const { tellIdParameter } = this.state
    const tellsMarkup = loading ? (
      <p>loading data...</p>
    ) : tells === null ? (
      <p>User doesn't have any tells!</p>
    ) : tellIdParameter ? (
      tells.map(tell => {
        if (tell.tellId !== tellIdParameter)
          return <Tell key={tell.tellId} tell={tell} />
        else return <Tell key={tell.tellId} tell={tell} openDialog />
      })
    ) : (
      tells.map(tell => <Tell key={tell.tellId} tell={tell} />)
    )

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {tellsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <p>Loading profile...</p>
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    )
  }
}

user.propTypes = {
  getUserDetails: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  data: state.data
})

export default connect(
  mapStateToProps,
  { getUserDetails }
)(user)
