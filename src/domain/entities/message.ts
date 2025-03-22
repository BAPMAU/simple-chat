import type { Roles } from "./roles.enum";

export interface Message {
  id: string;
  content: string;
  role: Roles;
}
