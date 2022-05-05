/* importing packages */
const jwt = require('jsonwebtoken')

/* importing models */
const Comment = require('../models/comment.model')
const List = require('../models/list.model')
const Item = require('../models/item.model')
const User = require('../models/user.model')

/* initialization of express router */
const { Router } = require('express')
const router = Router()

/* CREATE comment in List and Item simutaneously */
router.post('/:listID/:itemID', async (req, res) => {
  const { listID, itemID } = req.params

  const token = req.get('Authorization')
  const tokenWithoutBearer = token.split(' ')[1]
  const { username } = jwt.verify(tokenWithoutBearer, process.env.SECRET_JWT)

  try {
    const user = await User.findOne({ username })

    const newComment = { ...req.body, commentCreator: user._id, commentOnList: listID, commentOnItem: itemID }
    const commentFromDB = await Comment.create(newComment)

    await Item.findByIdAndUpdate(itemID, { $push: { itemComments: commentFromDB._id } })
    await List.findByIdAndUpdate(listID, { $push: { listComments: commentFromDB._id } })

    res.status(201).json(commentFromDB)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to create Comment', error: error.message })
  }
})

/* Delete a comment from List and Item simutaneously */
router.delete('/:listID/:commentId', async (req, res) => {
  const { commentId } = req.params
  const { id } = req.user
  try {
    const comment = await Comment.findById(commentId)

    if (comment.commentCreator !== id) {
      return res.status(400).json("User can't delete other user's comment")
    }

    await Comment.findByIdAndDelete(commentId)

    await Item.findByIdAndUpdate(comment.itemReference, { $pull: { itemComments: commentId } })

    res.status(200).json({ message: 'Comment successfully deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Error trying to delete Comment', error: error.message })
  }
})

/* Like/Dislike a comment */
router.put('/:commentId', async (req, res) => {
  const { commentId } = req.params
  const { id } = req.user
  try {
    const comment = await Comment.findById(commentId)

    if (comment.commentLikes.includes(comment.commentCreator)) {
      await Comment.findOneAndUpdate(commentId, { $pull: { commentLikes: id } })
    } else {
      await Comment.findOneAndUpdate(commentId, { $push: { commentLikes: id } })
    }

    res.status(200).json({ message: 'Comment updated' })
  } catch (error) {
    res.status(500).json({ message: 'Error trying to update this comment', error: error.message })
  }
})

module.exports = router
