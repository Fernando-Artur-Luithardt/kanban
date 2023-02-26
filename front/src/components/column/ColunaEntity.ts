import TarefaEntity from "../card/TarefaEntity";

export default class ColunaEntity {
    public readonly tarefas: TarefaEntity[]

    public constructor(tarefas: TarefaEntity[]) {
        this.tarefas = tarefas;
    }
}