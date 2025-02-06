export interface Vivienda {
  id?: number;
  clusterId: string;
  numeroCasa: string;
  direccion: string;
  habitaciones: number;
  precio: number;
  descripcion?: string;
}