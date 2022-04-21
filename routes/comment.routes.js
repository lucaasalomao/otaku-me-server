/* importing models */
const Comment = require('../models/agenda.model')
const Agenda = require('../models/agenda.model')
const Event = require('../models/event.model')

/* initialization of express router */
const { Router } = require('express')
const router = Router()

/* Add NEW comment in Agenda */
router.post('/:agendaId', async (req, res) => {
  const { agendaId } = req.params
  const { id } = req.user
  try {
    const newComment = { ...req.body, agendaReference: agendaId, commentCreator: id }
    const commentFromDB = await Comment.create(newComment)

    await Agenda.findByIdAndUpdate(agendaId, {
      $push: { agendaComments: commentFromDB._id }
    })

    res.status(201).json(commentFromDB)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to create Comment', error })
  }
})

/* Delete a comment from Agenda */
router.delete('/:commentId', async (req, res) => {
  const { commentId } = req.params
  const { id } = req.user
  try {
    const comment = await Comment.findById(commentId)

    if (comment.commentCreator !== id) {
      return res.status(400).json("User can't delete other user's comment")
    }

    await Comment.findByIdAndDelete(commentId)

    await Agenda.findByIdAndUpdate(comment.agendaReference, { $pull: { agendaComments: commentId } })

    res.status(200).json({ message: 'Comment deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Error trying to delete Comment', error })
  }
})

/* Add NEW comment in Event */
router.post('/:eventId', async (req, res) => {
  const { eventId } = req.params
  const { id } = req.user
  try {
    const newComment = { ...req.body, eventReference: eventId, commentCreator: id }
    const commentFromDB = await Comment.create(newComment)

    await Event.findByIdAndUpdate(eventId, {
      $push: { eventComments: commentFromDB._id }
    })

    res.status(201).json(commentFromDB)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to create Comment', error })
  }
})

/* Delete a comment from Event */
router.delete('/:commentId', async (req, res) => {
  const { commentId } = req.params
  const { id } = req.user
  try {
    const comment = await Comment.findById(commentId)

    if (comment.commentCreator !== id) {
      return res.status(400).json("User can't delete other user's comment")
    }

    await Comment.findByIdAndDelete(commentId)

    await Event.findByIdAndUpdate(comment.eventReference, { $pull: { eventComments: commentId } })

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
