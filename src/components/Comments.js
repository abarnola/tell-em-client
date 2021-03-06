import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
//Material-UI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles = {
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: '20px'
  },
  commentImage: {
    maxWidth: '100%',
    height: '100',
    objectFit: 'cover',
    borderRadius: '50%'
  },
  commentDetails: {
    marginLeft: 20
  }
}

export class Comments extends Component {
  render() {
    const { comments, classes } = this.props
    return (
      <Grid container>
        {comments.map((comment, index) => {
          const { body, dateCreated, userImage, userName } = comment
          return (
            <Fragment key={dateCreated}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt='comment'
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentDetails}>
                      <Typography
                        variant='h5'
                        component={Link}
                        to={`/users/${userName}`}
                        color='primary'
                      >
                        {userName}
                      </Typography>
                      <Typography variant='body2' color='textSecondary'>
                        {dayjs(dateCreated).format('h:mm a, MMMM DD YYYY')}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variant='body1'>{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          )
        })}
      </Grid>
    )
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
}

export default withStyles(styles)(Comments)
