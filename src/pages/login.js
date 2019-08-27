import React, { Component } from 'react'
import PropTypes from 'prop-types'
import icon from '../images/icon.png'
//Material-UI
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '0'
    }
}

export class login extends Component {
    render() {
        const { classes } = this.props
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm />
                <Grid item sm>
                    <img src={icon} alt="tell 'em icon" />
                    <Typography variant="h3" className={classes.pageTitle}>
                        Login
                    </Typography>
                </Grid>
                <Grid item sm />
                <Grid item sm />
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(login)