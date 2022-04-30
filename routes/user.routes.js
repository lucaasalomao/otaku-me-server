/* importing models */
/* const Comment = require('../models/agenda.model')
const Agenda = require('../models/agenda.model')
const Event = require('../models/event.model') */
const User = require('../models/user.model')

/* initialization of express router */
const { Router } = require('express')
const router = Router()

// Get User
router.get('/:userId', async (req, res) => {
  const { userID } = req.userInfo
  try {
    const user = await User.findById(userID)
    /*       .populate('agendaEvents')
      .populate({
        path: 'agendaComments',
        populate: {
          path: 'commentCreator',
          select: 'username userImage -passwordHash'
        }
      }) */
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to get User', error })
  }
})

// Get All Users
router.get('/search/all', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to get all Users', error })
  }
})

// Get All Users containing string
router.get('/search/:text', async (req, res) => {
  const { text } = req.params
  try {
    const users = await User.find({ email: { $regex: text } })
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to get specific Users', error })
  }
})

/* Edit User */
/* router.put('/', async (req, res) => {
  const { userID } = req.userInfo
  try {
    if (userId !== _id) {
      return res.status(400).json("User can't edit other User")
    }

    await User.findByIdAndUpdate(userId, req.body)

    res.status(200).json({ message: 'User successfully updated' })
  } catch (error) {
    res.status(500).json({ message: 'Error trying to update this User', error })
  }
}) */

module.exports = router
