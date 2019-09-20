import React, { Component } from 'react';
import PropTypes from 'prop-types';
import icon from '../images/icon.png';
import { Link } from 'react-router-dom';
//Material-UI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TextField, Button } from '@material-ui/core';
//Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = {
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '20px auto 20px auto'
  },
  pageTitle: {
    margin: '10px auto 10px auto',
    fontWeight: '300'
  },
  button: {
    margin: '10px auto 10px auto',
    display: 'relative'
  },
  progress: {
    position: 'absolute',
    margin: 'auto'
  }
};

export class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      userName: '',
      password: '',
      confirmPassword: '',
      loading: false,
      errors: {}
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const userData = {
      email: this.state.email,
      password: this.state.password,
      userName: this.state.userName,
      confirmPassword: this.state.confirmPassword
    };
    this.props.signupUser(userData, this.props.history);
  };

  //Generic handle change, binds input to state
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={icon} alt="tell 'em icon" />
          <Typography variant='h3' className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              name='email'
              onChange={this.handleChange}
              className={classes.textField}
              value={this.state.email}
              helperText={errors.email}
              error={errors.email ? true : false}
              fullWidth
              id='email'
              label='Email'
            />
            <TextField
              name='userName'
              type='text'
              onChange={this.handleChange}
              className={classes.textField}
              value={this.state.userName}
              helperText={errors.userName}
              error={errors.userName ? true : false}
              fullWidth
              id='userName'
              label='Username'
            />
            <TextField
              name='password'
              type='password'
              onChange={this.handleChange}
              className={classes.textField}
              value={this.state.password}
              helperText={errors.password}
              error={errors.password ? true : false}
              fullWidth
              id='password'
              label='Password'
            />
            <TextField
              name='confirmPassword'
              type='password'
              onChange={this.handleChange}
              className={classes.textField}
              value={this.state.confirmPassword}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              fullWidth
              id='confirmPassword'
              label='Confirm Password'
            />
            {errors.general && (
              <Typography variant='body2' className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              onClick={this.handleSubmit}
              variant='contained'
              color='primary'
              className={classes.button}
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress size={20} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              don't have an account? signup <Link to='/signup'>here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  signupUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(signup));
