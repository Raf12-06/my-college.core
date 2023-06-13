import {Personal} from "./model/personal.model";
import {Fio} from "./model/fio.model";

export interface PersonalInfoI {
    personal: Partial<Personal>,
    fio: Partial<Fio>,
}
