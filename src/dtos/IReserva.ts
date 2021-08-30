import { DiscenteDto } from "./IDiscente";
import { ExemplarDto } from "./IExemplar";

export interface ReservaDto {
    id?: number;
    id_exemplar: number;
    id_discente: number;
    validade: Date;
}

export interface ReservaGetAllDto {
    id: number;
    exemplar: ExemplarDto;
    validade: Date;
}