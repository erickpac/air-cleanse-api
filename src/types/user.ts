import { Role } from "@prisma/client";

export interface User {
  email: string;
  password: string;
  name: string;
  phone: string | null;
  role: Role;
}
