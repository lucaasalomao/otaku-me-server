/* importing models */
const Comment = require('../models/agenda.model')
const Agenda = require('../models/agenda.model')
const Event = require('../models/event.model')
const User = require('../models/user.model')

/* initialization of express router */
const { Router } = require('express')
const router = Router()

// Get Event
router.get('/:eventId', async (req, res) => {
  const { eventId } = req.params
  try {
    const event = await Event.findById(eventId)
      .populate({
        path: 'eventComments',
        populate: {
          path: 'commentCreator',
          select: 'username userImage -passwordHash'
        }
      })
    res.status(200).json(event)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to get Event', error })
  }
})

// Get All Events
router.get('/allEvents', async (req, res) => {
  try {
    const events = await Event.find()
    res.status(200).json(events)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to get Events', error })
  }
})

// Get All Events containing string
router.get('/:text', async (req, res) => {
  const { text } = req.params
  try {
    const events = await Event.find({ eventName: { $regex: text } })
    res.status(200).json(events)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to get Events', error })
  }
})

// Create New Event in Agenda
router.post('/:agendaId', async (req, res) => {
  const { agendaId } = req.params
  const { userId } = req.user
  try {
    const eventFromDB = await Event.create({ ...req.body, eventCreator: userId })
    await Agenda.findByIdAndUpdate(agendaId, { $push: { agendaEvents: eventFromDB._id } })

    res.status(201).json(eventFromDB)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to create Event', error })
  }
})

// Transfer/Copy Exisiting Event to Agenda
router.post('/:agendaId', async (req, res) => {
  const { agendaId } = req.params
  const { originalEventId } = req.body
  const { userId } = req.user
  try {
    if (!userId.agendas.includes(agendaId)) {
      return res.status(400).json("User can't add Event to other user's agenda")
    }

    const copiedEvent = await Event.findById(originalEventId).select('-eventComments')
    const newEventFromDB = await Event.create(copiedEvent)

    await Agenda.findByIdAndUpdate(agendaId, { $push: { agendaEvents: newEventFromDB._id } })
    await User.findByIdAndUpdate(userId, { $push: { events: newEventFromDB._id } })

    res.status(201).json(newEventFromDB)
  } catch (error) {
    res.status(500).json({ message: 'Error trying to copy Event', error })
  }
})

/* Delete a Event from Agenda */
router.delete('/:agendaId', async (req, res) => {
  const { agendaId } = req.params
  const { eventId } = req.body
  const { userId } = req.user
  try {
    const agenda = await Agenda.findById(agendaId)

    if (agenda.agendaCreator !== userId) {
      return res.status(400).json("User can't delete Event from other user's Agenda")
    }

    const event = await Event.findById(eventId)
    await Comment.deleteMany({ _id: { $in: event.eventComments } })
    await Event.findByIdAndDelete(eventId)
    await Agenda.findByIdAndUpdate(agendaId, { $pull: { agendaEvents: eventId } })
    await User.findByIdAndUpdate(userId, { $pull: { event: eventId } })

    res.status(200).json({ message: 'Event successfully deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Error trying to delete Agenda', error })
  }
})
