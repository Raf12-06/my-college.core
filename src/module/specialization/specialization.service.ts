import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Specialization} from "./model/specialization.model";
import {CreateSpecializationDto} from "./dto/create-specialization.dto";
import {UpdateSpecializationDto} from "./dto/update-specialization.dto";

@Injectable()
export class SpecializationService {

    constructor(
        @InjectModel(Specialization)
        private specializationRepository: typeof Specialization
    ) {}

    async getListSpecialization(): Promise<Specialization[]> {
        return await this.specializationRepository.findAll();
    }

    async createSpecialization(data: CreateSpecializationDto): Promise<Specialization> {
        return await this.specializationRepository.create(data);
    }

    async updateSpecialization(idSpecialization: number, data: UpdateSpecializationDto): Promise<number[]> {
        return await this.specializationRepository.update(data, {
            where: {
                id: idSpecialization,
            }
        });
    }
}
