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

        const exemplar = await getExemplarById(id);

        if (!exemplar) {
            return response.json({
                success: false,
                data: null,
                error: 'Exemplar não encontrado'
            })
        }

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
        const exemplaresGetAll: ExemplarGetAllDto[] = await knex(tableName).select('*').orderBy('titulo');

        const exemplaresMappedAll = exemplaresGetAll.map((exemplar) => {
            return {
                ...exemplar,
                disponivel: exemplar.estoque > 0
            }
        });

        const responseBase: ResponseBase<any[]> = {
            success: true,
            data: exemplaresMappedAll
        }

        return response.json(responseBase);
    },

    async repor(request, response): Promise<ResponseBase<number>> {
        const id = request.params.id;

        const exemplar = await getExemplarById(id);

        if (!exemplar) {
            return response.json({
                success: false,
                data: null,
                error: 'Exemplar não encontrado'
            })
        }

        const quantidade = request.body.quantidade + exemplar.estoque;

        const idResp = await knex(tableName).where({ id }).update({ estoque: quantidade });

        return response.json({
            success: true,
            data: idResp
        });
    }
}

export async function getExemplarById(id: number): Promise<ExemplarDto> {
    return knex(tableName).where({ id }).select('*').first();
}