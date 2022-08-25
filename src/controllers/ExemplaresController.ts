import { Request, Response } from 'express';

import { DiscenteDto } from 'src/dtos/Discente';
import {
  ExemplarDto,
  ExemplarGetAllDto,
  ExemplarGetShowDto,
} from 'src/dtos/Exemplar';

const knex = require('../database/connection');

const TABLE_NAME = 'exemplares';

module.exports = {
  async create(request: Request, response: Response): Promise<void> {
    const exemplares: ExemplarDto[] = request.body;

    const count: number = await knex(TABLE_NAME).insert(exemplares);
    response.status(200).json({
      data: count,
      success: true,
    });
  },

  async getMultipleIds(request: Request, response: Response): Promise<void> {
    const ids: number[] = request.body.ids;

    const exemplares = await getMultiExemplares(ids);

    const exemplaresDto: ExemplarGetAllDto[] = [];

    exemplares.forEach((exemplar) => {
      const exemplarDto: ExemplarGetAllDto = {
        ...exemplar,
        disponivel: exemplar.estoque > 0 ? true : false,
        id: exemplar.id ?? -1,
      };
      exemplaresDto.push(exemplarDto);
    });

    response.status(200).json({
      data: exemplaresDto,
      success: true,
    });
  },

  async index(_: Request, response: Response): Promise<void> {
    const exemplaresGetAll: ExemplarGetAllDto[] = await knex(TABLE_NAME)
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
    const id = Number(request.params.id);

    const exemplar = await getExemplarById(id);

    if (!exemplar) {
      response.status(200).json({
        data: null,
        error: 'Exemplar não encontrado',
        success: false,
      });
      return;
    }
    const quantidade: number = request.body.quantidade + exemplar.estoque;

    if (exemplar.estoque <= 0 && quantidade > 0) {
      await criarAlerta(id);
    }

    const idResp = await knex(TABLE_NAME)
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
      response.status(200).json({
        data: null,
        error: 'Exemplar não encontrado',
        success: false,
      });
      return;
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

const getMultiExemplares = async (ids: number[]): Promise<ExemplarDto[]> => {
  return knex(TABLE_NAME).whereIn('id', ids).select('*');
};

const getExemplarById = async (id: number): Promise<ExemplarDto> => {
  return knex(TABLE_NAME).where({ id }).select('*').first();
};

const criarAlerta = async (idExemplar: number): Promise<void> => {
  const discentes = await getDiscenteByExemplar(idExemplar);

  discentes.forEach(async (discente) => {
    const alerta = discente.alertas;

    let newAlerta = '';
    if (alerta === null || alerta === '') {
      newAlerta = `${idExemplar}`;
    } else {
      newAlerta = `${alerta},${idExemplar}`;
    }

    await knex('discentes')
      .where({ id: discente.id })
      .update({ alertas: newAlerta });
  });
};

const getDiscenteByExemplar = (id: number): Promise<DiscenteDto[]> => {
  return knex('discentes').where('interesse', 'like', `%${id}%`).select('*');
};
