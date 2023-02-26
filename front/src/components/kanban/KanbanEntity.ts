import ColunaEntity from "../column/ColunaEntity";

export default class KanbanEntity {
    public readonly colunas: ColunaEntity[]

    public constructor(colunas: ColunaEntity[]) {
        this.colunas = colunas;
    }
}