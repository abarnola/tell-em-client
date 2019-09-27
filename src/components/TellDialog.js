import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../util/MyButton'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import LikeButton from './LikeButton'
import Comments from './Comments'
import CommentForm from './CommentForm'
//Material-UI
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
//Icons
import CloseIcon from '@material-ui/icons/Close'
import UnFoldMore from '@material-ui/icons/UnfoldMore'
import ChatIcon from '@material-ui/icons/Chat'
//Redux
import { connect } from 'react-redux'
import { getTell, clearErrors } from '../redux/actions/dataActions'

const styles = {
  invisibleSeparator: {
    border: 'none',
    margin: 4
  },
  profileImage: {
    maxWidth: 200,
    maxHeight: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '90%'
  },
  expandButton: {
    position: 'absolute',
    left: '90%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: '20px'
  }
}
export class TellDialog extends Component {
  state = {
    open: false,
    oldUrl: '',
    newUrl: ''
  }
  handleOpen = () => {
    let oldUrl = window.location.pathname

    const { userName, tellId } = this.props
    const newUrl = `/users/${userName}/tell/${tellId}`

    if (oldUrl === newUrl) oldUrl = `/users/${userName}`

    window.history.pushState(null, null, newUrl)

    this.setState({ open: true, oldUrl, newUrl })
    this.props.getTell(this.props.tellId)
  }
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldUrl)
    this.setState({ open: false })
    this.props.clearErrors()
  }
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen()
    }
  }
  render() {
    const {
      classes,
      tell: {
        tellId,
        body,
        dateCreated,
        likeCount,
        commentCount,
        userImage,
        userName,
        comments
      },
      UI: { loading }
    } = this.props

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={4}>
        <Grid item sm={5}>
          <img src={userImage} alt='Profile' className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color='primary'
            variant='h5'
            to={`/users/${userName}`}
          >
            @{userName}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant='body2' color='textSecondary'>
            {dayjs(dateCreated).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant='body1'>{body}</Typography>
          <LikeButton tellId={tellId} />
          <span>{likeCount} likes</span>
          <MyButton tip='comments'>
            <ChatIcon color='primary' />
          </MyButton>
          <span>{commentCount} comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm tellId={tellId} />
        <Comments comments={comments} />
      </Grid>
    )
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip='Expand Tell'
          tipClassName={classes.expandButton}
        >
          <UnFoldMore color='primary' />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <MyButton
            tip='Close'
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

TellDialog.propTypes = {
  getTell: PropTypes.func.isRequired,
  tellId: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  tell: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  tell: state.data.tell,
  UI: state.UI
})

const mapActionToProps = { getTell, clearErrors }

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(TellDialog))
