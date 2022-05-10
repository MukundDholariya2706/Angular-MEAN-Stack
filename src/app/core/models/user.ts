export class User {
  _id!: string;
  email!: string;
  password!: string;
}

export interface LoginRes {
  success: boolean;
  token: string;
}
