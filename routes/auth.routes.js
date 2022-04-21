/* importing models */
const User = require('../models/user.model')

/* importing packages */
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/* initialization of express router */
const { Router } = require('express')
const router = Router()

router.post('/signup', async (req, res) => {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      throw new Error('Missing email or password')
    }

    const user = await User.findOne({ email })
    if (user) {
      throw new Error('Email already exists')
    }

    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(password, salt)
    await User.create({
      email,
      passwordHash
    })

    res.status(201).json({ message: `User created: ${email}` })
  } catch (error) {
    res.status(500).json({ message: 'Error creating user:', error: error.message })
  }
})

router.post('/signin', async (req, res) => {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      throw new Error('Missing email or password')
    }

    const user = await User.findOne({ email })
    if (!user) {
      throw new Error('Email or password is incorrect')
    }

    const validation = bcrypt.compareSync(password, user.passwordHash)

    if (!validation) {
      throw new Error('Email or password is incorrect 2')
    }

    const payload = {
      id: user._id,
      username: user.username
    }

    const token = jwt.sign(payload, process.env.SECRET_JWT, { expiresIn: '4h' })

    res.status(200).json({ user: payload, token })
  } catch (error) {
    res.status(500).json({ message: 'Error trying to login', error: error.message })
  }
})

module.exports = router
