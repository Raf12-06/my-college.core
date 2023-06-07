import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {SpecializationService} from "./specialization.service";
import {CreateSpecializationDto} from "./dto/create-specialization.dto";
import {Specialization} from "./model/specialization.model";
import {Roles} from "../../system/decorator/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {UpdateSpecializationDto} from "./dto/update-specialization.dto";

@Controller('specialization')
export class SpecializationController {

    constructor(
        private specializationService: SpecializationService,
    ) {}

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    async create(@Body() dto: CreateSpecializationDto): Promise<Specialization> {
        return await this.specializationService.createSpecialization(dto);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/:id')
    async update(
        @Body() dto: UpdateSpecializationDto,
        @Param('id') idSpecialization: string,
    ) {
        return await this.specializationService.updateSpecialization(Number(idSpecialization), dto);
    }

    @UseGuards(RolesGuard)
    @Get()
    async getList(): Promise<Specialization[]> {
        return await this.specializationService.getListSpecialization();
    }
}
