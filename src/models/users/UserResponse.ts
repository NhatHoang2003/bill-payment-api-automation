import { Meta } from "./Meta";
import { Data } from "./User"

export interface Success {
    success: boolean
    data: Data[];
    meta: Meta;
}
