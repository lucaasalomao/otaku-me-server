/* importing packages */
const jwt = require('jsonwebtoken')

/* importing models */
const User = require('../models/user.model')
const Comment = require('../models/comment.model')

/* initialization of express router */
const { Router } = require('express')
const router = Router()

// Get User profile info
router.get('/:username', async (req, res) => {
  /* getting requested user profile */
  const { username } = req.params

  try {
    const requestedUserProfile = await User.findOne({ username })
      .select('-passwordHash')
      .populate({
        path: 'lists',
        populate: {
          path: 'listItems',
          model: 'Item'
        }
      })
      .populate({
        path: 'lists',
        populate: {
          path: 'listComments',
          model: 'Comment',
          populate: {
            path: 'commentCreator',
            model: 'User',
            select: 'username'
          }
        }
      })
      .populate({
        path: 'following',
        model: 'User',
        select: '-passwordHash'
      })
    res.status(200).json(requestedUserProfile)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to get User', error: error.message })
  }
})

// Get All Users
router.get('/search/all', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to get all Users', error: error.message })
  }
})

// Get User followers info
router.get('/following/activity', async (req, res) => {
  /* getting requested user profile */
  const token = req.get('Authorization')
  const tokenWithoutBearer = token.split(' ')[1]
  const { username } = jwt.verify(tokenWithoutBearer, process.env.SECRET_JWT)

  try {
    const { following } = await User.findOne({ username }).select('following')

    const comments = await Comment.find({ commentCreator: { $in: following } })
      .select('commentCreator commentText')
      .populate({
        path: 'commentCreator',
        model: 'User',
        select: 'username -_id'
      })

    const followers = await User.find({ _id: { $in: following } })
      .select('username')

    res.status(200).json({ comments, followers })
  } catch (error) {
    res.status(500).json({ message: 'Error trying to get User', error: error.message })
  }
})

// Get All Users containing string
router.get('/search/:text', async (req, res) => {
  const { text } = req.params
  try {
    const users = await User.find({ username: { $regex: text } })
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to get specific Users', error: error.message })
  }
})

// Get Following users
router.get('/following/check', async (req, res) => {
  const token = req.get('Authorization')
  const tokenWithoutBearer = token.split(' ')[1]
  const { username } = jwt.verify(tokenWithoutBearer, process.env.SECRET_JWT)

  try {
    const { following } = await User.findOne({ username }).select('following -_id')
    res.status(200).json(following)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to get User followers', error: error.message })
  }
})

// Follow User
router.post('/follow/:followUsername', async (req, res) => {
  const { followUsername } = req.params

  const token = req.get('Authorization')
  const tokenWithoutBearer = token.split(' ')[1]
  const { username } = jwt.verify(tokenWithoutBearer, process.env.SECRET_JWT)

  try {
    const loggedUser = await User.findOne({ username })
    const userToFollow = await User.findOne({ username: followUsername })

    if (loggedUser.following.includes(userToFollow._id)) {
      throw new Error('Username is already being followed')
    }

    await User.findByIdAndUpdate(loggedUser._id, { $push: { following: userToFollow._id } })
    await User.findByIdAndUpdate(userToFollow._id, { $push: { followers: loggedUser._id } })

    res.status(200).json({ message: `Succesfully followed ${followUsername}` })
  } catch (error) {
    res.status(500).json({ message: 'Error trying to get specific Users', error: error.message })
  }
})

// Follow User
router.post('/unfollow/:unfollowUsername', async (req, res) => {
  const { unfollowUsername } = req.params

  const token = req.get('Authorization')
  const tokenWithoutBearer = token.split(' ')[1]
  const { username } = jwt.verify(tokenWithoutBearer, process.env.SECRET_JWT)

  try {
    const loggedUser = await User.findOne({ username })
    const userToUnfollow = await User.findOne({ username: unfollowUsername })

    await User.findByIdAndUpdate(loggedUser._id, { $pull: { following: userToUnfollow._id } })
    await User.findByIdAndUpdate(userToUnfollow._id, { $pull: { followers: loggedUser._id } })

    res.status(200).json({ message: `Succesfully unfollowed ${unfollowUsername}` })
  } catch (error) {
    res.status(500).json({ message: 'Error trying to get specific Users', error: error.message })
  }
})

module.exports = router
