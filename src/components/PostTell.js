import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../util/MyButton'

//Material-UI
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'

//Icons
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
//Redux
import { connect } from 'react-redux'
import { postTell, clearErrors } from '../redux/actions/dataActions'
import { thisExpression } from '@babel/types'
const styles = {
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: '10px'
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%'
  }
}
export class PostTell extends Component {
  state = {
    open: false,
    body: '',
    errors: {}
  }
  handleOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.setState({ open: false })
    this.props.clearErrors()
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    this.props.postTell({ body: this.state.body })
    this.handleClose()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      })
    }
  }
  render() {
    const { errors } = this.state
    const {
      classes,
      UI: { loading }
    } = this.props
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip='Post a Tell!'>
          <AddIcon />
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
          <DialogTitle>Post a new Tell</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name='body'
                type='text'
                label="TELL 'EM"
                fullWidth
                multiline
                rows='3'
                placeholder='Tell your friends!'
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                disabled={loading}
                className={classes.submitButton}
              >
                Submit
                {loading && (
                  <CircularProgress
                    className={classes.progressSpinner}
                    size={20}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  UI: state.UI
})

PostTell.propTypes = {
  postTell: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  { postTell, clearErrors }
)(withStyles(styles)(PostTell))
