import { Expose,Type } from "class-transformer";
import { TransactionType } from "../entities/transaction-history.entity";
import { Crypto } from "src/crypto/entities/crypto.entity";
import { UserDTO } from "src/user/dtos/user.dto";

export class TransactionHistoryDTO {
    @Expose()
    id: number;
    
    @Expose()
    Amount: number;

    @Expose()
    PriceTimeDate: Date;

    @Expose()
    transactionType: TransactionType;

    @Expose()
    crypto: Crypto;

    @Expose()
    @Type(() => UserDTO) // This tells class-transformer to apply UserDTO transformation
    user: UserDTO; 
}