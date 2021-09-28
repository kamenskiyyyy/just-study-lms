import { UserType } from './user.types';

export interface UserResponseInterface {
  data: UserType & { token: string };
}
