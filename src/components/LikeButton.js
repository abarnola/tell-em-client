import React, { Component } from 'react'
import MyButton from '../util/MyButton'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
//Icons
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
//Redux
import { connect } from 'react-redux'
import { likeTell, unlikeTell } from '../redux/actions/dataActions'

export class LikeButton extends Component {
  likedTell = () => {
    const res = this.props.user.likes.find(like => {
      if (like) {
        return like.tellId === this.props.tellId
      } else return false
    })
    return res
  }
  likeTell = () => {
    this.props.likeTell(this.props.tellId)
  }
  unlikeTell = () => {
    this.props.unlikeTell(this.props.tellId)
  }

  render() {
    const {
      user: { authenticated }
    } = this.props
    const likeButton = !authenticated ? (
      <Link to='/login'>
        <MyButton tip='Like'>
          <FavoriteBorder color='primary' />
        </MyButton>
      </Link>
    ) : this.likedTell() ? (
      <MyButton tip='Unlike' onClick={this.unlikeTell}>
        <FavoriteIcon color='primary' />
      </MyButton>
    ) : (
      <MyButton tip='Like' onClick={this.likeTell}>
        <FavoriteBorder color='primary' />
      </MyButton>
    )
    return likeButton
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  tellId: PropTypes.string.isRequired,
  likeTell: PropTypes.func.isRequired,
  unlikeTell: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  user: state.user
})
const mapActionsToProps = {
  likeTell,
  unlikeTell
}
export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton)
