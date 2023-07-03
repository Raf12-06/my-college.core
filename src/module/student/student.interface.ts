import {Student} from "./model/student.model";
import {Group} from "../group/model/group.model";
import {Specialization} from "../specialization/model/specialization.model";
import {PersonalInfoI} from "../../service/personal/personal.interface";

export interface StudentInfoI {
    student: Student,
    group: Group,
    specialization: Specialization,
    personal: PersonalInfoI,
}

export interface StudentI {
    student: Student,
    personal: PersonalInfoI,
}
