import { ExemplarDto } from "./IExemplar";

export interface ReservaDto {
    id: number;
    exemplar: ExemplarDto;
    validade: string;
}