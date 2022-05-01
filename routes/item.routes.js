/* importing packages */
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')

/* importing models */
const Comment = require('../models/comment.model')
const List = require('../models/list.model')
const Item = require('../models/item.model')
const User = require('../models/user.model')

/* initialization of express router */
const { Router } = require('express')
const router = Router()

// Get Item
router.get('/:itemId', async (req, res) => {
  const { itemId } = req.params
  try {
    const item = await Item.findById(itemId)
    /*       .populate({
        path: 'itemComments',
        populate: {
          path: 'commentCreator',
          select: 'username userImage -passwordHash'
        }
      }) */
    res.status(200).json(item)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to get Item', error })
  }
})

// Get All Items
router.get('/search/all', async (req, res) => {
  try {
    const items = await Item.find()
    res.status(200).json(items)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to get all Items', error })
  }
})

// Get All Items containing string
router.get('/search/:text', async (req, res) => {
  const { text } = req.params
  try {
    const items = await Item.find({ itemName: { $regex: text } })
    res.status(200).json(items)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to get specific Items', error })
  }
})

// CREATE New Item in List
router.post('/:listId', async (req, res) => {
  const { listId } = req.params

  const token = req.get('Authorization')
  const tokenWithoutBearer = token.split(' ')[1]
  const { userEmail } = jwt.verify(tokenWithoutBearer, process.env.SECRET_JWT)

  try {
    const list = await List.findById(listId)
    const user = await User.findOne({ email: userEmail })

    if (!list.listCreator.equals(user._id)) {
      return res.status(400).json("User can't create Item from other user's List")
    }

    const itemFromDB = await Item.create({ ...req.body, itemCreator: user._id })
    await List.findByIdAndUpdate(listId, { $push: { listItems: itemFromDB._id } })
    await User.findByIdAndUpdate(user._id, { $push: { listItems: itemFromDB._id } })

    res.status(201).json(itemFromDB)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to create Item', error: error.message })
  }
})

// Transfer/Copy Exisiting Item to List
router.post('/:listId/:originalItemId', async (req, res) => {
  const { listId, originalItemId } = req.params
  const { userId } = req.user
  try {
    if (!userId.lists.includes(listId)) {
      return res.status(400).json("User can't add Item to other user's list")
    }

    const copiedItem = await Item.findById(originalItemId).select('-itemComments')
    const newItemFromDB = await Item.create(copiedItem)

    await List.findByIdAndUpdate(listId, { $push: { listItems: newItemFromDB._id } })
    await User.findByIdAndUpdate(userId, { $push: { items: newItemFromDB._id } })

    res.status(201).json(newItemFromDB)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to copy Item', error })
  }
})

/* Delete a Item from List */
router.delete('/:listId/:itemId', async (req, res) => {
  const { listId, itemId } = req.params
  const { userID } = req.userInfo
  try {
    const list = await List.findById(listId)

    if (list.listCreator !== mongoose.Types.ObjectId(userID)) {
      return res.status(400).json("User can't delete Item from other user's List")
    }

    const item = await Item.findById(itemId)
    await Comment.deleteMany({ _id: { $in: item.itemComments } })
    await Item.findByIdAndDelete(itemId)
    await List.findByIdAndUpdate(listId, { $pull: { listItems: itemId } })
    await User.findByIdAndUpdate(userID, { $pull: { item: itemId } })

    res.status(200).json({ message: 'Item successfully deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Error trying to delete Item', error })
  }
})

/* Edit Item */
router.put('/:itemId', async (req, res) => {
  const { itemId } = req.params
  const { userId } = req.user
  try {
    const item = await Item.findById(itemId)

    if (item.itemCreator !== userId) {
      return res.status(400).json("User can't edit other user's List")
    }

    await Item.findByIdAndUpdate(itemId, req.body)

    res.status(200).json({ message: 'Item successfully updated' })
  } catch (error) {
    res.status(500).json({ message: 'Error trying to update this Item', error })
  }
})

module.exports = router
