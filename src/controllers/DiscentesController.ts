import { DiscenteDto, DiscenteGetAllDto, DiscenteGetShowDto } from "../dtos/IDiscente";
import { ResponseBase } from "../dtos/IResponse";

const knex = require('../database/connection.ts');

const tableName = 'discentes';

module.exports = {
    async create(request, response): Promise<ResponseBase<number>> {
        const discente: DiscenteDto = request.body;

        const id: number = await knex(tableName).insert(discente);
        return response.json({
            success: true,
            data: id
        });
    },

    async show(request, response): Promise<ResponseBase<DiscenteGetShowDto>> {
        const id = request.params.id;

        const discente: DiscenteDto = await knex(tableName).where({ id }).select('*').first();

        var { senha, ...discenteDto } = discente;

        return response.json({
            success: true,
            data: discenteDto
        })
    },

    async index(request, response): Promise<ResponseBase<DiscenteGetAllDto[]>> {
        const discentes: DiscenteDto[] = await knex(tableName).select('*');

        const discentesGetAll: DiscenteGetAllDto[] = discentes.map((discente) => {
            return {
                id: discente.id,
                matricula: discente.matricula,
                nome: discente.nome
            }
        })

        const responseBase: ResponseBase<DiscenteGetAllDto[]> = {
            success: true,
            data: discentesGetAll
        }

        return response.json(responseBase);
    }
}