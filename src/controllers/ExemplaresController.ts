import { ExemplarDto, ExemplarGetAllDto, ExemplarGetShowDto } from "../dtos/IExemplar";
import { ResponseBase } from "../dtos/IResponse";

const knex = require('../database/connection.ts');

const tableName = 'exemplares';

module.exports = {
    async create(request, response): Promise<ResponseBase<number>> {
        const exemplares: ExemplarDto[] = request.body;

        const count: number = await knex(tableName).insert(exemplares);
        return response.json({
            success: true,
            data: count
        });
    },

    async show(request, response): Promise<ResponseBase<ExemplarGetShowDto>> {
        const id = request.params.id;

        const exemplar = await knex(tableName).where({ id }).select('*').first();

        const exemplarDto = {
            ...exemplar,
            disponivel: exemplar.estoque > 0 ? true : false
        }

        return response.json({
            success: true,
            data: exemplarDto
        })
    },

    async index(request, response): Promise<ResponseBase<ExemplarGetAllDto[]>> {
        const exemplares: ExemplarDto[] = await knex(tableName).select('*');

        const exemplaresGetAll: ExemplarGetAllDto[] = exemplares.map((exemplar) => {
            return {
                id: exemplar.id,
                autor: exemplar.autor,
                titulo: exemplar.titulo
            }
        })

        const responseBase: ResponseBase<ExemplarGetAllDto[]> = {
            success: true,
            data: exemplaresGetAll
        }

        return response.json(responseBase);
    },

    async repor(request, response): Promise<ResponseBase<number>> {
        const id = request.params.id;

        const exemplar = await knex(tableName).where({ id }).select('*').first();

        const quantidade = request.body.quantidade + exemplar.estoque;

        const idResp = await knex(tableName).where({ id }).update({ estoque: quantidade });

        return response.json({
            success: true,
            data: idResp
        });
    }
}