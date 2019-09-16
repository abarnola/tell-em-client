import React, { Component } from 'react';
import { classes } from 'istanbul-lib-coverage';
import icon from '../images/icon.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

//Material-UI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

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

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      userName: this.state.userName,
      confirmPassword: this.state.confirmPassword
    };
    axios
      .post('/signup', newUserData)
      .then(res => {
        this.setState({
          loading: false
        });
        localStorage.setItem('FBIdToken', `Bearer ${res.data.idToken}`);
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({
          errors: err.response.data,
          loading: false
        });
      });
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>
          <img src={icon} alt="tell 'em icon" />
          <Typography variant='h3' className={classes.pageTitle}>
            Signup
          </Typography>
          <form novalidate onSubmit={this.handleSubmit}>
            <TextField
              name='email'
              id='email'
              label='Email'
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              helperText={errors.email}
              error={errors.email ? true : false}
              fullWidth
            />
            <TextField
              name='userName'
              id='userName'
              type='text'
              label='Username'
              value={this.state.userName}
              onChange={this.handleChange}
              helperText={errors.userName}
              error={errors.userName ? true : false}
              fullWidth
            />
            <TextField
              name='password'
              id='password'
              type='password'
              label='Password'
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              helperText={errors.password}
              error={errors.password ? true : false}
              fullWidth
            />
            <TextField
              name='confirmPassword'
              id='confirmPassword'
              type='password'
              label='Confirm Password'
              className={classes.textField}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant='body2' className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              variant='contained'
              onClick={this.handleSubmit}
              color='primary'
              className={classes.button}
              disabled={loading}
            >
              Signup
              {loading && (
                <CircularProgress size={25} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              already have an account? login <Link to='/login'>here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(signup);
