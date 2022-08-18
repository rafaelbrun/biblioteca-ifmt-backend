import { ReservaDto } from './Reserva';

export interface DiscenteDto {
  id?: number;
  interesse?: string;
  matricula: string;
  nome: string;
  reservas?: ReservaDto[];
  senha: string;
}

export interface DiscenteGetAllDto {
  id: number;
  matricula: string;
  nome: string;
}

export interface DiscenteGetShowDto {
  id?: number;
  interesse?: number[];
  matricula: string;
  nome: string;
  reservas?: ReservaDto[];
}
