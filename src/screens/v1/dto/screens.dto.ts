import { PickType } from '@nestjs/swagger';
import { ScreenModel } from 'src/screens/models';

export class UpdateScreenDto extends PickType(ScreenModel, ['name']) {}

export class CreateScreenDto extends PickType(ScreenModel, ['name']) {}
