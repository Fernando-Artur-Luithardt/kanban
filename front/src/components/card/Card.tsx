import TarefaEntity from "./TarefaEntity";

export default function Card(props: CardProps) {
    return (
        <div className="item" draggable={true} onDragStart={props.onDragStart} onDragOver={props.onDragOver}>
            <h1>{props.tarefa.tarefa}</h1>
        </div>
    )
}

interface CardProps {
    tarefa: TarefaEntity
    onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void
    onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void
}