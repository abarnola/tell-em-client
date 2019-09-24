import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import DeleteTell from './DeleteTell';
//DayJS
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//Material-UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

//Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
//Redux
import { connect } from 'react-redux';
import { likeTell, unlikeTell } from '../redux/actions/dataActions';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200,
    objectFit: 'cover'
  },
  content: {
    padding: 25
  }
};

export class Tell extends Component {
  likedTell = () => {
    const test = this.props.user.likes.find(like => {
      console.log(this.props.user.likes);
      if (like) {
        return like.tellId === this.props.tell.tellId;
      } else return false;
    });
    return test;
  };
  likeTell = () => {
    this.props.likeTell(this.props.tell.tellId);
  };
  unlikeTell = () => {
    this.props.unlikeTell(this.props.tell.tellId);
  };
  render() {
    dayjs.extend(relativeTime);

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
      user: {
        authenticated,
        credentials: { user }
      }
    } = this.props;
    const likeButton = !authenticated ? (
      <MyButton tip='Like'>
        <Link to='/login'>
          <FavoriteBorder />
        </Link>
      </MyButton>
    ) : this.likedTell() ? (
      <MyButton tip='Unlike' onClick={this.unlikeTell}>
        <FavoriteIcon />
      </MyButton>
    ) : (
      <MyButton tip='Like' onClick={this.likeTell}>
        <FavoriteBorder />
      </MyButton>
    );
    const deleteButton =
      authenticated && userName === user ? (
        <DeleteTell tellId={tellId} />
      ) : null;
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
          {likeButton}
          <span>{likeCount} likes</span>
          <MyButton tip='comments'>
            <ChatIcon color='primary' />
          </MyButton>
        </CardContent>
      </Card>
    );
  }
}

Tell.propTypes = {
  likeTell: PropTypes.func.isRequired,
  unlikeTell: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  tell: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.user
});
const mapActionsToProps = {
  likeTell,
  unlikeTell
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Tell));
