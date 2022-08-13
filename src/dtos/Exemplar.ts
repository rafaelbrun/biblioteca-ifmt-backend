export interface ExemplarDto {
  autor: string;
  edicao: string;
  editora: string;
  estoque: number;
  id?: number;
  titulo: string;
}

export interface ExemplarGetAllDto {
  autor: string;
  disponivel?: boolean;
  edicao: string;
  editora: string;
  estoque: number;
  id: number;
  titulo: string;
}

export interface ExemplarGetShowDto {
  autor: string;
  disponivel: boolean;
  edicao: string;
  editora: string;
  id: number;
  titulo: string;
}
