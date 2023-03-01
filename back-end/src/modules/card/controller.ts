import prisma from "../../prisma";
export interface ICreateCard{
    tarefa:string
    colunaId:number
}
export interface IUpdateCard{
    id:number
    colunaId:number
    order:number
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
    async delete(id:number) {
        await  prisma.card.delete({
            where:{
                id
            }
        })
    }

    async update(id:number, colunaId:number) {
        await  prisma.card.update({
            where:{
                id
            },
            data:{
                colunaId: colunaId
            }
        })
    }
}
export default CardController;