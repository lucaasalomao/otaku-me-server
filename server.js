const server = require('./app')

/* running server */
server.listen(process.env.PORT, () => {
  console.log('Server running on port:', process.env.PORT)
})
