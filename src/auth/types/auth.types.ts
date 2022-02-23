import { User } from 'src/users/entities';

export interface LoginResultType {
  user: User;
  token: string;
}
