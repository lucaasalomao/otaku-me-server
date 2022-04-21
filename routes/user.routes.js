/* importing models */
/* const User = require('../models/user.model') */

/* initialization of express router */
const { Router } = require('express')
const router = Router()

router.get('/:id', async (req, res) => {

  /* populate

  User image
  User name
  User Description
  User Followers
    /populate
      User image
      User name
  User Agendas
    /populate
      agenda animes
        /populate
          types
  User Types
  User Animes
  User Liked

  */

})

router.get('/all', async (req, res) => {

  /* populate

  User image
  User name
  User Description

  */

})

module.exports = router
