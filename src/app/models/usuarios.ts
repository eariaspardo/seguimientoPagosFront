import { Roles } from "./roles";

export class Usuarios{
  id: number = 0;
  nombreApellido: string = '';
  nombreUsuario: string = '';
  activo: boolean = true;
  email: string = '';
  roles: Roles[] = [];
  password: string = '';
}
