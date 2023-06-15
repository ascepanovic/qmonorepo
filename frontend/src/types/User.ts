export interface UserT {
  id: number;
  name: string;
  email: string;
  photo: string;
  role: Role;
}

export enum Role {
  USER,
  ADMIN,
}
