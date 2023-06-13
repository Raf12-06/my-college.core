import {IsString} from "class-validator";

export class CreateRoleDto {

  @IsString()
  readonly values: string;

  @IsString()
  readonly description: string;
}
