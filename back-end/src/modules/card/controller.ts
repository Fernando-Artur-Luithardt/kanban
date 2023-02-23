import prisma from "../../prisma";
export interface ICreateCard{
    tarefa:string
    colunaId:number
}

class CardController {
    async list() {
        const cards = await  prisma.card.findMany()
        return cards
    }
    async create(data:ICreateCard) {
        const cards = await  prisma.card.create({
            data
        })
        return cards
    }
}
export default CardController;