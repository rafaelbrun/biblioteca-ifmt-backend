import { ExemplarDto } from './Exemplar';

export interface ReservaDto {
  id?: number;
  id_discente: number;
  id_exemplar: number;
  validade: Date;
}

export interface ReservaGetAllDto {
  exemplar: ExemplarDto;
  id: number;
  validade: Date;
}
