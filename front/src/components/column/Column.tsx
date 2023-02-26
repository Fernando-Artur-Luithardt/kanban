import Card from "../card/Card"
import ColunaEntity from "./ColunaEntity";

export default function Column(props: ColumnProps) {
    function renderCards() {
        const res = props.coluna.tarefas
            .map((t, i) => {
                return (
                    <Card tarefa={t} key={i} onDragStart={props.onDragStart} onDragOver={props.onDragOver} />
                )
            })

        return res;
    }

    return (
        <div className="column">
            {renderCards()}
        </div>
    )
}

interface ColumnProps {
    coluna: ColunaEntity
    onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void
    onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void
}