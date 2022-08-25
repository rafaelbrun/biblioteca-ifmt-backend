import { Request, Response } from 'express';

import { DiscenteDto, DiscenteGetAllDto } from 'src/dtos/Discente';
import { ExemplarDto } from 'src/dtos/Exemplar';
import { ReservaDto } from 'src/dtos/Reserva';

const knex = require('../database/connection.ts');

const TABLE_NAME = 'discentes';

module.exports = {
  async create(request: Request, response: Response): Promise<void> {
    const discente: DiscenteDto = request.body;

    const id: number = await knex(TABLE_NAME).insert(discente);
    response.status(200).json({
      data: id,
      success: true,
    });
  },

  async criarInteresse(request: Request, response: Response): Promise<void> {
    const { idExemplar, idDiscente } = request.body;

    const validateInteresseError = await validateCriarInteresse(
      idDiscente,
      idExemplar,
    );

    if (validateInteresseError) {
      response.status(200).json({
        error: validateInteresseError,
        success: false,
      });
      return;
    }

    const discente = await getDiscenteById(idDiscente);
    const interesse = discente.interesse;

    let newInteresse = '';
    if (interesse === null || interesse === '') {
      newInteresse = `${idExemplar}`;
    } else {
      newInteresse = `${interesse},${idExemplar}`;
    }

    await knex(TABLE_NAME)
      .where({ id: idDiscente })
      .update({ interesse: newInteresse });

    response.status(200).json({
      success: true,
    });
  },

  async index(_: Request, response: Response): Promise<void> {
    const discentes: DiscenteDto[] = await knex(TABLE_NAME).select('*');

    const discentesGetAll: DiscenteGetAllDto[] = discentes.map((discente) => {
      return {
        id: discente.id ?? -1,
        interesse: discente.interesse,
        matricula: discente.matricula,
        nome: discente.nome,
      };
    });

    response.json({
      data: discentesGetAll,
      success: true,
    });
  },

  async mostrarReservas(request: Request, response: Response): Promise<void> {
    const reservas = await knex('reservas')
      .where({ id_discente: request.params.id })
      .select('id', 'id_exemplar', 'validade');

    const reservasMap = await Promise.all(
      reservas.map(async (reserva: ReservaDto) => {
        return {
          exemplar: await getExemplarById(reserva.id_exemplar),
          id: reserva.id,
          validade: reserva.validade,
        };
      }),
    );

    response.status(200).json({
      data: reservasMap,
      success: true,
    });
  },

  async removerAlertas(request: Request, response: Response): Promise<void> {
    const id = request.params.id;

    await knex(TABLE_NAME).where({ id }).update({ alertas: '' });

    response.status(200).json({
      success: true,
    });
  },

  async removerInteresse(request: Request, response: Response): Promise<void> {
    const { idExemplar, idDiscente } = request.body;

    const discente = await getDiscenteById(idDiscente);
    const interesse = discente.interesse;

    const removedInteresseCommaLast = interesse?.replace(`${idExemplar},`, '');
    const removedInteresseCommaFirst = removedInteresseCommaLast?.replace(
      `,${idExemplar}`,
      '',
    );
    const removedInteresse = removedInteresseCommaFirst?.replace(
      `${idExemplar}`,
      '',
    );

    await knex(TABLE_NAME)
      .where({ id: idDiscente })
      .update({ interesse: removedInteresse });

    response.status(200).json({
      success: true,
    });
  },

  async removerReserva(request: Request, response: Response): Promise<void> {
    const { idExemplar, idDiscente } = request.body;

    const data = await knex('reservas')
      .where({
        id_discente: idDiscente,
        id_exemplar: idExemplar,
      })
      .del();

    response.status(200).json({ data, success: true });
  },

  async reservarExemplar(request: Request, response: Response): Promise<void> {
    const { idExemplar, idDiscente } = request.body;
    const nextWeekConst = nextWeek();

    const validReservaError = await validateReserva(idDiscente, idExemplar);

    if (validReservaError) {
      response.status(200).json({
        data: null,
        error: validReservaError,
        success: false,
      });
      return;
    }

    const reserva = {
      id_discente: idDiscente,
      id_exemplar: idExemplar,
      validade: nextWeekConst,
    };
    const id: number = await knex('reservas').insert(reserva);
    response.status(200).json({
      data: id,
      success: true,
    });
  },

  async show(request: Request, response: Response): Promise<void> {
    const id = request.params.id;

    const discente: DiscenteDto = await getDiscenteById(Number(id));

    const { ...discenteDto } = discente;

    response.status(200).json({
      data: discenteDto,
      success: true,
    });
  },
};

const getExemplarById = (id: number): Promise<ExemplarDto> => {
  return knex('exemplares').where({ id }).select('*').first();
};

const atualizarEstoque = async (idExemplar: number): Promise<string | null> => {
  const exemplar = await getExemplarById(idExemplar);

  if (!exemplar) {
    return 'Exemplar não encontrado';
  }
  if (exemplar?.estoque === 0) {
    return 'Não tem exemplar em estoque';
  }

  const quantidade = exemplar.estoque - 1;
  await knex('exemplares')
    .where({ id: idExemplar })
    .update({ estoque: quantidade });

  return null;
};

const validateReserva = async (
  idDiscente: number,
  idExemplar: number,
): Promise<string | null> => {
  if (!idDiscente || !idExemplar) {
    return 'Informações incorretas';
  }

  if (await hasReserva(idDiscente, idExemplar)) {
    return 'Você já realizou essa reserva';
  }

  const isDiscenteValid = await hasDiscente(idDiscente);
  if (!isDiscenteValid) {
    return 'Discente não existe';
  }

  const errorEstoque = await atualizarEstoque(idExemplar);
  if (errorEstoque) {
    return errorEstoque;
  }

  return null;
};

const validateCriarInteresse = async (
  idDiscente: number,
  idExemplar: number,
): Promise<string | null> => {
  if (!(await hasDiscente(idDiscente))) {
    return 'Discente não encontrado';
  }

  if (!(await getExemplarById(idExemplar))) {
    return 'Exemplar não encontrado';
  }

  if (await hasInteresse(idDiscente, idExemplar)) {
    return 'Você já criou esse Interesse';
  }

  return null;
};

const getDiscenteById = (id: number): Promise<DiscenteDto> => {
  return knex(TABLE_NAME).where({ id }).select('*').first();
};

const hasDiscente = async (id: number): Promise<boolean> => {
  const discente = await getDiscenteById(id);

  return discente != null;
};

const hasReserva = async (
  idDiscente: number,
  idExemplar: number,
): Promise<boolean> => {
  const reserva = await knex('reservas')
    .where({ id_discente: idDiscente, id_exemplar: idExemplar })
    .select('*');

  return reserva.length > 0;
};

const hasInteresse = async (
  idDiscente: number,
  idExemplar: number,
): Promise<boolean> => {
  const discente: DiscenteDto = await knex(TABLE_NAME)
    .where({ id: idDiscente })
    .select('*')
    .first();

  if (discente.interesse) {
    return discente.interesse?.includes(idExemplar.toString());
  }
  return false;
};

const nextWeek = (): string => {
  const today = new Date();
  today.setTime(today.getTime() + 30 * 86400000);
  return (
    adicionaZero(today.getDate()) +
    '/' +
    adicionaZero(today.getMonth() + 1) +
    '/' +
    today.getFullYear()
  );
};

const adicionaZero = (numero: number): string => {
  if (numero <= 9) {
    return '0' + numero;
  }
  return numero.toString();
};
