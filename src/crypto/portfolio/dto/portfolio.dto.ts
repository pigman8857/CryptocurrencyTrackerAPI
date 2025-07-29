import { Expose,Type } from "class-transformer";
import { TransactionType } from "@portfolio/entities/portfolio.entity";
import { UserDTO } from "src/user/dto/user.dto";
import { CryptoDTO } from "src/crypto/dto/crypto.dto";

export class PortfolioDTO {
    @Expose()
    id: number;
    
    @Expose()
    amount: number;

    @Expose()
    purchasePrice: number;

    @Expose()
    dateOfPurchase: Date;

    @Expose()
    @Type(() => CryptoDTO)// This tells class-transformer to apply CryptoDTO transformation
    crypto: CryptoDTO;

    @Expose()
    @Type(() => UserDTO) // This tells class-transformer to apply UserDTO transformation
    user: UserDTO; 
}