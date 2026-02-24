import { Expose } from "class-transformer";

export class CryptoDTO {
    @Expose()
    id: number;
    
    @Expose()
    name: string;
}