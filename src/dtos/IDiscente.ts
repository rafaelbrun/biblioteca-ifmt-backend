import { ReservaDto } from "./IReserva";

export interface DiscenteDto {
    id?: number;
    nome: string;
    matricula: string;
    senha: string;
    alertas?: number[];
    reservas?: ReservaDto[];
}

export interface DiscenteGetAllDto {
    id: number;
    nome: string;
    matricula: string;
}

export interface DiscenteGetShowDto {
    id?: number;
    nome: string;
    matricula: string;
    alertas?: number[];
    reservas?: ReservaDto[];
}