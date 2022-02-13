import { UserModel } from 'src/users/models';

export type LoginResultType = UserModel & { token: string };
