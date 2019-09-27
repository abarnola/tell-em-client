import React, { Component } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
//Material-UI
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Badge from '@material-ui/core/Badge'
//Icons
import NotificationsIcon from '@material-ui/icons/Notifications'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'
//Redux
import { connect } from 'react-redux'
import { markNotificationsRead } from '../redux/actions/userActions'

class Notifications extends Component {
  state = {
    anchorElement: null
  }
}

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  notifications: state.user.notifications
})

export default connect(
  mapStateToProps,
  { markNotificationsRead }
)(Notifications)
