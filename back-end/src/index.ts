import fastify from 'fastify'
import CardController from './modules/card/controller'

const server = fastify()
const cardController =  new CardController
server.get('/listar', cardController.list)

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})