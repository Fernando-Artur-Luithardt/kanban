import fastify from 'fastify'
import CardController, { ICreateCard } from './modules/card/controller'
import ColunasController, { ICreateColuna } from './modules/colunas/controller'
import middlewares from './middlewares'

const server = fastify()

// Setup Middlewares
middlewares(server)

const cardController =  new CardController()
const colunasController =  new ColunasController()


server.get('/listarCards', cardController.list)
server.delete('/deletarCard/:id', async (req:any, res) => {
  const id:number = req.params.id
  cardController.delete(+id)
})
server.post('/createCard', async (req:any, res) => {
  const {
    tarefa,
    colunaId
  }:ICreateCard = req.body
  cardController.create({ colunaId, tarefa })
})

server.get('/listarColunas', colunasController.list)
server.delete('/deletarColuna/:id', async (req:any, res) => {
  const id:number = req.params.id
  colunasController.delete(+id)
})
server.get('/listarTudo', colunasController.listAll)
server.post('/createColuna', async (req:any, res) => {
  const {
    titulo,
  }:ICreateColuna = req.body
  colunasController.create({ titulo })
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})