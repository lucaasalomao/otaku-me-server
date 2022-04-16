/* importing models */
const { User } = require('./models/User')

/* importing packages */
const bcrypt = require('bcryptjs')

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

module.exports = router
