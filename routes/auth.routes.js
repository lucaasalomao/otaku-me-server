/* importing models */
const User = require('../models/user.model')

/* importing packages */
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/* initialization of express router */
const { Router } = require('express')
const router = Router()

router.post('/signup', async (req, res) => {
  const { username, password } = req.body

  try {
    if (!username || !password) {
      throw new Error('Missing username or password')
    }

    const user = await User.findOne({ username })
    if (user) {
      throw new Error('Username already exists')
    }

    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(password, salt)

    await User.create({
      username,
      passwordHash
    })

    res.status(201).json({ message: `User created: ${username}` })
  } catch (error) {
    res.status(500).json({ message: 'Error creating user:', error: error.message })
  }
})

router.post('/signin', async (req, res) => {
  const { username, password } = req.body

  try {
    if (!username || !password) {
      throw new Error('Missing username or password')
    }

    const user = await User.findOne({ username })
    if (!user) {
      throw new Error('Username or password is incorrect')
    }

    const validation = bcrypt.compareSync(password, user.passwordHash)

    if (!validation) {
      throw new Error('Username or password is incorrect 2')
    }

    const payload = {
      username,
      userID: user._id
    }

    const token = jwt.sign(payload, process.env.SECRET_JWT, { expiresIn: '4h' })

    res.status(200).json({ token, username })
  } catch (error) {
    res.status(500).json({ message: 'Error trying to login', error: error.message })
  }
})

router.get('/verify-token', (req, res) => {
  const token = req.get('Authorization')
  const tokenWithoutBearer = token.split(' ')[1]
  const { username } = jwt.verify(tokenWithoutBearer, process.env.SECRET_JWT)
  if (!username) {
    return res.status(401).json({ message: 'Token is not valid' })
  }
  res.status(200).json({ message: 'Token is valid' })
})

module.exports = router
