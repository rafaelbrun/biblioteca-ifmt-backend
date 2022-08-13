import { Request, Response } from 'express';

import {
  ExemplarDto,
  ExemplarGetAllDto,
  ExemplarGetShowDto,
} from 'src/dtos/Exemplar';

const knex = require('../database/connection');

const tableName = 'exemplares';

module.exports = {
  async create(request: Request, response: Response): Promise<void> {
    const exemplares: ExemplarDto[] = request.body;

    const count: number = await knex(tableName).insert(exemplares);
    response.status(200).json({
      data: count,
      success: true,
    });
  },

  async index(_: Request, response: Response): Promise<void> {
    const exemplaresGetAll: ExemplarGetAllDto[] = await knex(tableName)
      .select('*')
      .orderBy('titulo');

    const exemplaresMappedAll = exemplaresGetAll.map((exemplar) => {
      return {
        ...exemplar,
        disponivel: exemplar.estoque > 0,
      };
    });

    response.json({
      data: exemplaresMappedAll,
      success: true,
    });
  },

  async repor(request: Request, response: Response): Promise<void> {
    const id = request.params.id;

    const exemplar = await getExemplarById(Number(id));

    if (!exemplar) {
      response.status(400).json({
        data: null,
        error: 'Exemplar não encontrado',
        success: false,
      });
    }

    const quantidade: number = request.body.quantidade + exemplar.estoque;

    const idResp = await knex(tableName)
      .where({ id })
      .update({ estoque: quantidade });

    response.status(200).json({
      data: idResp,
      success: true,
    });
  },

  async show(request: Request, response: Response): Promise<void> {
    const id = request.params.id;

    const exemplar = await getExemplarById(Number(id));

    if (!exemplar) {
      response.status(400).json({
        data: null,
        error: 'Exemplar não encontrado',
        success: false,
      });
    }

    const exemplarDto: ExemplarGetShowDto = {
      ...exemplar,
      disponivel: exemplar.estoque > 0 ? true : false,
      id: exemplar.id ?? -1,
    };

    response.status(200).json({
      data: exemplarDto,
      success: true,
    });
  },
};

const getExemplarById = async (id: number): Promise<ExemplarDto> => {
  return knex(tableName).where({ id }).select('*').first();
};
