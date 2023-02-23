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
                cards:true
            }
        })
        return coluna
    }
    async create(data:ICreateColuna) {
        const coluna = await  prisma.colunas.create({
            data
        })
        return coluna
    }
}
export default ColunasController;