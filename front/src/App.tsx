import TarefaEntity from "./components/card/TarefaEntity"
import ColunaEntity from "./components/column/ColunaEntity"
import Kanban from "./components/kanban/Kanban"
import KanbanEntity from "./components/kanban/KanbanEntity"

const card01 = new TarefaEntity("Card 01")
const card02 = new TarefaEntity("Card 02")
const card03 = new TarefaEntity("Card 03")
const card04 = new TarefaEntity("Card 04")
const card05 = new TarefaEntity("Card 05")
const card06 = new TarefaEntity("Card 06")

const column01 = new ColunaEntity([card01, card02])
const column02 = new ColunaEntity([card03, card04])
const column03 = new ColunaEntity([card05, card06])

const kanban = new KanbanEntity([column01, column02, column03])

function App() {
  return (
    <Kanban kanban={kanban} />
  )
}


export default App
