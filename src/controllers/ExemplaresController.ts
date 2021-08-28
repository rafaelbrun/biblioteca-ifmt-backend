import { ExemplarDto } from "../dtos/IExemplar";

const knex = require('../database/connection.ts');

const DADOS = require('../config/chave');

const tableName = 'exemplares';

module.exports = {
    async create(request, response) {
        const exemplares: ExemplarDto[] = request.body;

        const idExemplares: number[] = await knex(tableName).insert(exemplares);
        return response.json({
            success: true,
            id: idExemplares
        });
    },

    async update(request, response) {
        const user = request.body.user;
        const { id } = request.body.user;
        const subQuery = knex(tableName).select('id').where({ id });
        subQuery.then(resp => {
            if (resp.length > 0) {
                subQuery.update(user)
                    .then(res => {
                        return response.json({ success: true })
                    })
            }
            else {
                return response.json({ success: false, error: 'Usuário não encontrado.' })
            }
        }).catch(err => { console.log(err); return response.json({ success: false }) })
    },

    async show(request, response) {
        var login = false, token = null;
        const {
            email,
            password
        } = request.body

        const user = await knex(tableName).where({ email: email, password: password }).select('*').first();

    },

    async index(request, response) {
        return response.json(await knex(tableName).select('*'));
    },

    async delete(request, response) {
        const idUser = request.body.id;
        var success = true;
        const res = await knex(tableName).where('id', idUser).del();

        if (res === 0)
            success = false;

        return response.json({ success: success });
    }
}

function novaData() {
    var data = new Date().toLocaleString("pt-BR", { timeZone: "America/Cuiaba" });
    return data.replace(/ /g, "  -  ");
}