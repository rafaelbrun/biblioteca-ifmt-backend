export interface ExemplarDto {
    id?: number;
    titulo: string;
    autor: string;
    edicao: string;
    editora: string;
    estoque: number;
}

export interface ExemplarGetAllDto {
    id: number;
    titulo: string;
    autor: string;
    edicao: string;
    editora: string;
    estoque: number;
    disponivel?: boolean;
}

export interface ExemplarGetShowDto {
    id: number;
    titulo: string;
    autor: string;
    edicao: string;
    editora: string;
    disponivel: boolean;
}