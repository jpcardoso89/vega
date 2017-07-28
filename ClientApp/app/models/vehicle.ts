import { Contact } from './contact';
import { KeyValuePair } from './keyvaluepair';

export interface Vehicle{
    id:number;
    model:KeyValuePair;
    make:KeyValuePair;
    isRegistered: boolean;
    contact:Contact;
    lastUpdate: string;
    features: KeyValuePair[];
}