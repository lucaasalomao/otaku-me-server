/* importing models */
const Comment = require('../models/agenda.model')
const Agenda = require('../models/agenda.model')
const Event = require('../models/event.model')
const User = require('../models/user.model')

/* initialization of express router */
const { Router } = require('express')
const router = Router()

// Get Agenda
router.get('/:agendaId', async (req, res) => {
  const { agendaId } = req.params
  try {
    const agenda = await Agenda.findById(agendaId)
      .populate('agendaEvents')
      .populate({
        path: 'agendaComments',
        populate: {
          path: 'commentCreator',
          select: 'username userImage -passwordHash'
        }
      })
    res.status(200).json(agenda)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to get Agenda', error })
  }
})

// Get All Agendas
router.get('/search/all', async (req, res) => {
  try {
    const agendas = await Agenda.find()
    res.status(200).json(agendas)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to get all Agendas', error })
  }
})

// Get All Agendas containing string
router.get('/search/:text', async (req, res) => {
  const { text } = req.params
  try {
    const agendas = await Agenda.find({ agendaName: { $regex: text } })
    res.status(200).json(agendas)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to get specific Agendas', error })
  }
})

// CREATE New  Agenda
router.post('/', async (req, res) => {
  const { userId } = req.user
  try {
    const agendaFromDB = await Agenda.create({ ...req.body, agendaCreator: userId })
    res.status(201).json(agendaFromDB)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to create Agenda', error })
  }
})

/* Delete Agenda and everything inside */
router.delete('/:agendaId', async (req, res) => {
  const { agendaId } = req.params
  const { userId } = req.user
  try {
    const agenda = await Agenda.findById(agendaId)

    if (agenda.agendaCreator !== userId) {
      return res.status(400).json("User can't delete other user's Agenda")
    }

    await Comment.deleteMany({ _id: { $in: agenda.agendaComments } })
    await Event.deleteMany({ _id: { $in: agenda.agendaEvents } })
    await User.findByIdAndUpdate(userId, { $pull: { agendas: agendaId } })
    await User.findByIdAndUpdate(userId, { $pull: { events: { $in: agenda.agendaEvents } } })
    await Agenda.findByIdAndDelete(agendaId)

    res.status(200).json({ message: 'Agenda successfully deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Error trying to delete Agenda', error })
  }
})

/* Edit Agenda */
router.put('/:agendaId', async (req, res) => {
  const { agendaId } = req.params
  const { userId } = req.user
  try {
    const agenda = await Agenda.findById(agendaId)

    if (agenda.agendaCreator !== userId) {
      return res.status(400).json("User can't edit other user's Agenda")
    }

    await Agenda.findByIdAndUpdate(agendaId, req.body)

    res.status(200).json({ message: 'Agenda successfully updated' })
  } catch (error) {
    res.status(500).json({ message: 'Error trying to update this Agenda', error })
  }
})

module.exports = router
