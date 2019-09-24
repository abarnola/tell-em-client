import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';

//Material-UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

//Redux
import { connect } from 'react-redux';
import { deleteTell } from '../redux/actions/dataActions';

const styles = {};

export class DeleteTell extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteTell = () => {
    this.props.deleteTell(this.props.tellId);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip='Delete Tell'
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <DialogTitle>Are you sure you want to delete this Tell?</DialogTitle>
          <DialogActions>
            <Button variant='primary' onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant='secondary' onClick={this.deleteTell}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteTell.propTypes = {
  deleteTell: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  tellId: PropTypes.string.isRequired
};

export default connect(
  null,
  { deleteTell }
)(withStyles(styles)(DeleteTell));
