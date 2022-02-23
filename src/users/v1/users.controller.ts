import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserModel } from '../models';
import { UpdateUserDto } from './dto';
import { UsersService } from './services';
import { Public } from '../../common/decorators/public.decorator';
import { UserOwnerGuard } from './guards';
import { UserModelInterceptor } from './interceptors';

@ApiTags('[v1] Users')
@Crud({
  model: {
    type: UserModel,
  },
  params: {
    userId: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
  dto: {
    update: UpdateUserDto,
  },
  routes: {
    only: ['getOneBase', 'updateOneBase', 'deleteOneBase'],
    getOneBase: {
      decorators: [Public()],
      interceptors: [UserModelInterceptor],
    },
    updateOneBase: {
      decorators: [UseGuards(UserOwnerGuard), ApiBearerAuth()],
      interceptors: [UserModelInterceptor],
    },
    deleteOneBase: {
      decorators: [UseGuards(UserOwnerGuard), ApiBearerAuth()],
      interceptors: [UserModelInterceptor],
    },
  },
})
@Controller('v1/users')
export class UsersController implements CrudController<UserModel> {
  constructor(public service: UsersService) {}
}
