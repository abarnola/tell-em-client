import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Link from 'react-router-dom/Link'
//Material-UI
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { Typography } from '@material-ui/core';

const styles = {
    card: {
        display: 'flex',
    }
}

export class Tell extends Component {
    render() {
        //Same as const classes = this.props.classes
        const { classes, tell : { body, dateCreated, userImage, userName, tellId, likeCount, commentCount } } = this.props

        return (
            <Card>
                <CardMedia
                    image={userImage}
                    title="Profile image"
                />
                <CardContent>
                    <Typography variant="h5" component={Link}>{userName}</Typography>
                    <Typography variant="body2" color="textSecondary">{dateCreated}</Typography>
                    <Typography variant="body1">{body}</Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Tell)
