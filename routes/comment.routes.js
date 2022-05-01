/* importing models */
const Comment = require('../models/comment.model')
const List = require('../models/list.model')
const Item = require('../models/item.model')

/* initialization of express router */
const { Router } = require('express')
const router = Router()

/* CREATE comment in List */
router.post('/list/:listId', async (req, res) => {
  const { listId } = req.params
  const { id } = req.user
  try {
    const newComment = { ...req.body, listReference: listId, commentCreator: id }
    const commentFromDB = await Comment.create(newComment)

    await List.findByIdAndUpdate(listId, {
      $push: { listComments: commentFromDB._id }
    })

    res.status(201).json(commentFromDB)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to create Comment', error })
  }
})

/* Delete a comment from List */
router.delete('/list/:commentId', async (req, res) => {
  const { commentId } = req.params
  const { id } = req.user
  try {
    const comment = await Comment.findById(commentId)

    if (comment.commentCreator !== id) {
      return res.status(400).json("User can't delete other user's comment")
    }

    await Comment.findByIdAndDelete(commentId)

    await List.findByIdAndUpdate(comment.listReference, { $pull: { listComments: commentId } })

    res.status(200).json({ message: 'Comment deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Error trying to delete Comment', error })
  }
})

/* CREATE comment in Item */
router.post('/item/:itemID', async (req, res) => {
  const { itemID } = req.params
  const { id } = req.user
  try {
    const newComment = { ...req.body, itemReference: itemID, commentCreator: id }
    const commentFromDB = await Comment.create(newComment)

    await Item.findByIdAndUpdate(itemID, {
      $push: { itemComments: commentFromDB._id }
    })

    res.status(201).json(commentFromDB)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to create Comment', error })
  }
})

/* Delete a comment from Item */
router.delete('/item/:commentId', async (req, res) => {
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
    res.status(500).json({ message: 'Error trying to delete Comment', error })
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
    res.status(500).json({ message: 'Error trying to update this comment', error })
  }
})

module.exports = router
