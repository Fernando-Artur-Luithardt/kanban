import Column from "../column/Column"
import KanbanEntity from "./KanbanEntity"

export default function Kanban(props: KanbanProps) {
    function renderColunas() {
        return props.kanban.colunas
            .map((c, i) => {
                return (
                    <Column key={i} coluna={c} onDragStart={e => console.log(e)} onDragOver={e => console.log(e)} />
                )
            })
    }

    return (
        <div className="kanban">
            { renderColunas() }
        </div>
    )
}

interface KanbanProps {
    kanban: KanbanEntity
}