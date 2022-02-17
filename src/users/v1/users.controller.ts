import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserModel } from '../models';
import { UpdateUserDto } from './dto';
import { UsersService } from './services';
import { Public } from '../../common/decorators/public.decorator';
import { UserOwnerGuard } from './guards';

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
    },
    updateOneBase: {
      decorators: [UseGuards(UserOwnerGuard), ApiBearerAuth()],
    },
    deleteOneBase: {
      decorators: [UseGuards(UserOwnerGuard), ApiBearerAuth()],
    },
  },
})
@Controller('v1/users')
export class UsersController implements CrudController<UserModel> {
  constructor(public service: UsersService) {}
}
