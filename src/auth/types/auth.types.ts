import { User } from 'src/users/entities';

export type LoginResultType = Omit<User, 'password'> & { token: string };
