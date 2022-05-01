const mongoose = require('mongoose')

/* importing models */
const Comment = require('../models/comment.model')
const List = require('../models/list.model')
const Item = require('../models/item.model')
const User = require('../models/user.model')

/* initialization of express router */
const { Router } = require('express')
const router = Router()

// Get List
router.get('/:listId', async (req, res) => {
  const { listId } = req.params
  try {
    const list = await List.findById(listId)
    /*       .populate('listItems')
      .populate({
        path: 'listComments',
        populate: {
          path: 'commentCreator',
          select: 'username userImage -passwordHash'
        }
      }) */
    res.status(200).json(list)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to get List', error })
  }
})

// Get All Lists
router.get('/search/all', async (req, res) => {
  try {
    const lists = await List.find()
    res.status(200).json(lists)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to get all Lists', error })
  }
})

// Get All Lists containing string
router.get('/search/:text', async (req, res) => {
  const { text } = req.params
  try {
    const lists = await List.find({ listName: { $regex: text } })
    res.status(200).json(lists)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to get specific Lists', error })
  }
})

// CREATE New  List
router.post('/', async (req, res) => {
  const { userID } = req.userInfo
  console.log(userID)
  try {
    const list = await List.create({ ...req.body, listCreator: userID })
    res.status(201).json(list)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to create List', error: error.message })
  }
})

/* Delete List and everything inside */
router.delete('/:listId', async (req, res) => {
  const { listId } = req.params
  const { userID } = req.userInfo
  try {
    const list = await List.findById(listId)

    if (list.listCreator !== mongoose.Types.ObjectId(userID)) {
      return res.status(400).json("User can't delete other user's List")
    }

    await Comment.deleteMany({ _id: { $in: list.listComments } })
    await Item.deleteMany({ _id: { $in: list.listItems } })
    await User.findByIdAndUpdate(userID, { $pull: { lists: listId } })
    await User.findByIdAndUpdate(userID, { $pull: { items: { $in: list.listItems } } })
    await List.findByIdAndDelete(listId)

    res.status(200).json({ message: 'List successfully deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Error trying to delete List', error })
  }
})

/* Edit List */
router.put('/:listId', async (req, res) => {
  const { listId } = req.params
  const { userID } = req.userInfo
  try {
    const list = await List.findById(listId)

    if (list.listCreator !== mongoose.Types.ObjectId(userID)) {
      return res.status(400).json("User can't edit other user's List")
    }

    await List.findByIdAndUpdate(listId, req.body)

    res.status(200).json({ message: 'List successfully updated' })
  } catch (error) {
    res.status(500).json({ message: 'Error trying to update this List', error })
  }
})

module.exports = router
