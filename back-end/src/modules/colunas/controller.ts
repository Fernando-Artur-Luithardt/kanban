import prisma from "../../prisma";
export interface ICreateColuna{
    titulo:string
}

class ColunasController {
    async list() {
        const coluna = await  prisma.colunas.findMany()
        return coluna
    }
    async listAll() {
        const coluna = await  prisma.colunas.findMany({
            include:{
                cards:{
                    orderBy:{
                        order: 'asc'
                    }
                }
            },
        })
        return coluna
    }
    async create(data:ICreateColuna) {
        const coluna = await  prisma.colunas.create({
            data
        })
        return coluna
    }
    async delete(id:number) {
        await  prisma.colunas.delete({
            where:{
                id
            }
        })
    }

}
export default ColunasController;