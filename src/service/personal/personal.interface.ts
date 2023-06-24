import {Personal} from "./model/personal.model";
import {Fio} from "./model/fio.model";
import {Contact} from "./model/contact.model";

export interface PersonalInfoI {
    personal: Partial<Personal>,
    fio: Partial<Fio>,
    contact: Partial<Contact[]>,
}
