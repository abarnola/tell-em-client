import React, { Component } from 'react'
import { Link } from 'react-router-dom'

//DayJS
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

//Material-UI
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles'

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
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
        const { classes, tell : { body, dateCreated, userImage, userName, tellId, likeCount, commentCount } } = this.props

        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.image}
                    image={userImage}
                    title="Profile image"
                />
                <CardContent className={classes.content}>
                    <Typography 
                        variant="h5" 
                        component={Link} 
                        to={`/users/${userName}`}
                        color="primary"    
                    >
                        {userName}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        color="textSecondary"
                        >{dayjs(dateCreated).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Tell)
