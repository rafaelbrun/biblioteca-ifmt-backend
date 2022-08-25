import { ReservaDto } from './Reserva';

export interface DiscenteDto {
  alertas?: string;
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
  alertas?: number[];
  id?: number;
  interesse?: number[];
  matricula: string;
  nome: string;
  reservas?: ReservaDto[];
}
