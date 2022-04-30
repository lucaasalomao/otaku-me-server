const server = require('./App.js')

/* running server */
server.listen(process.env.PORT, () => {
  console.log('Server running on port:', process.env.PORT)
})
