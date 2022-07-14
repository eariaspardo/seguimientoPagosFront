import { DetallePago } from "./detallePago";

export class Proyecto{
  id: number = 0;
  nombreproyecto: string = '';
  valorproyecto: number = 0;
  cuotas: number = 0;
  fechapagos !: Date;
  usuario: string = '';
  icono: string = '';
  detallesPagos: DetallePago[] = [];
  estado: string = '';
}
