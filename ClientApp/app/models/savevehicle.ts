import { Contact } from './contact';
import { KeyValuePair } from './keyvaluepair';
export interface SaveVehicle{
    id:number;
    modelId:number;
    makeId:number;
    isRegistered: boolean;
    contact:Contact;
    features :number[];
}