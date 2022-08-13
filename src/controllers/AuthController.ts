import { Request, Response } from 'express';

const knex = require('../database/connection.ts');

const TABLE_NAME = 'discentes';

module.exports = {
  async login(request: Request, response: Response) {
    let success = false;
    const { matricula, senha } = request.body;

    const user = await knex(TABLE_NAME)
      .where({ matricula, senha })
      .select('*')
      .first();
    if (user) {
      success = true;
    }
    return response.json({
      login: success,
      user: user,
    });
  },
};
