import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton'
import DeleteTell from './DeleteTell'
import TellDialog from './TellDialog'
import LikeButton from './LikeButton'
//DayJS
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

//Material-UI
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { Typography } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'

//Icons
import ChatIcon from '@material-ui/icons/Chat'
//Redux
import { connect } from 'react-redux'

const styles = {
  card: {
    display: 'flex',
    position: 'relative',
    marginBottom: 20
  },
  image: {
    minWidth: 200,
    objectFit: 'cover'
  },
  content: {
    padding: 25
  }
}

export class Tell extends Component {
  render() {
    dayjs.extend(relativeTime)

    //Same as const classes = this.props.classes
    const {
      classes,
      tell: {
        body,
        dateCreated,
        userImage,
        userName,
        tellId,
        likeCount,
        commentCount
      },
      user: { authenticated, credentials }
    } = this.props

    const deleteButton =
      authenticated && userName === credentials.userName ? (
        <DeleteTell tellId={tellId} />
      ) : null
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={userImage}
          title='Profile image'
        />
        <CardContent className={classes.content}>
          <Typography
            variant='h5'
            component={Link}
            to={`/users/${userName}`}
            color='primary'
          >
            {userName}
          </Typography>
          {deleteButton}
          <Typography variant='body2' color='textSecondary'>
            {dayjs(dateCreated).fromNow()}
          </Typography>
          <Typography variant='body1'>{body}</Typography>
          <LikeButton tellId={tellId} />
          <span>{likeCount} likes</span>
          <MyButton tip='comments'>
            <ChatIcon color='primary' />
          </MyButton>
          <TellDialog tellId={tellId} userName={userName} />
        </CardContent>
      </Card>
    )
  }
}

Tell.propTypes = {
  user: PropTypes.object.isRequired,
  tell: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  user: state.user
})

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Tell))
