import { Roles } from "./roles";

export class Usuarios{
  id: number = 0;
  nombreApellido: string = '';
  nombreUsuario: string = '';
  activo: string = '';
  email: string = '';
  roles: Roles[] = [];
}
