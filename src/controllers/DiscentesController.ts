import { DiscenteDto, DiscenteGetAllDto, DiscenteGetShowDto } from "../dtos/IDiscente";
import { ExemplarDto } from "../dtos/IExemplar";
import { ReservaDto, ReservaGetAllDto } from "../dtos/IReserva";
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

        const discente: DiscenteDto = await getDiscenteById(id);

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
    },

    async reservarExemplar(request, response): Promise<ResponseBase<number>> {
        const idDiscente = request.body.idDiscente;
        const idExemplar = request.body.idExemplar;
        const nextWeekConst = nextWeek();

        const validReservaError = await validateReserva(idDiscente, idExemplar);
        if (validReservaError) {
            return response.status(400).json({
                success: false,
                data: null,
                error: validReservaError
            })
        }

        const reserva = {
            id_discente: idDiscente,
            id_exemplar: idExemplar,
            validade: nextWeekConst
        }
        const id: number = await knex('reservas').insert(reserva);
        return response.json({
            success: true,
            data: id
        });
    },

    async mostrarReservas(request, response): Promise<ResponseBase<ReservaGetAllDto[]>> {
        const reservas = await knex('reservas').where({ id_discente: request.params.id }).select('id', 'id_exemplar', 'validade');

        const reservasMap = await Promise.all(reservas.map(async (reserva) => {
            return {
                id: reserva.id,
                validade: reserva.validade,
                exemplar: await getExemplarById(reserva.id_exemplar)
            }
        }));

        return response.json({
            success: true,
            data: reservasMap
        });
    }
}

async function atualizarEstoque(idExemplar: number) {
    const exemplar = await getExemplarById(idExemplar);

    if (!exemplar) {
        return 'Exemplar não encontrado';
    }
    if (exemplar?.estoque == 0) {
        return 'Não tem exemplar em estoque'
    }

    const quantidade = exemplar.estoque - 1;
    await knex('exemplares').where({ id: idExemplar }).update({ estoque: quantidade });

    return '';
}

export async function getExemplarById(id: number): Promise<ExemplarDto> {
    return knex('exemplares').where({ id }).select('*').first();
}

async function validateReserva(idDiscente: number, idExemplar: number) {
    if (await hasReserva(idDiscente, idExemplar)) {
        return 'Essa reserva já foi realizada';
    }

    var errorDiscente = await hasDiscente(idDiscente);
    if (errorDiscente) {
        return errorDiscente
    }

    var errorEstoque = await atualizarEstoque(idExemplar);
    if (errorEstoque) {
        return errorEstoque
    }

    return null
}

async function getDiscenteById(id: number): Promise<DiscenteDto> {
    return knex(tableName).where({ id }).select('*').first();
}

async function hasDiscente(id: number) {
    const discente = await getDiscenteById(id);

    if (discente) return '';

    return 'Discente não existe'
}

async function hasReserva(idDiscente: number, idExemplar: number) {
    const reserva = await knex('reservas').where({ id_discente: idDiscente, id_exemplar: idExemplar }).select('*');

    return reserva.length > 0;
}

function nextWeek() {
    var today = new Date();
    today.setTime(today.getTime() + (7 * 86400000));
    return (adicionaZero(today.getDate().toString()) + '/'
        + (adicionaZero(today.getMonth() + 1).toString()) + '/' + (today.getFullYear()));
}

function adicionaZero(numero) {
    if (numero <= 9)
        return '0' + numero;
    else
        return numero;
}