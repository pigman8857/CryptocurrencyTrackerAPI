import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassConstructor, plainToClass } from 'class-transformer'; 

export function Serialize(dto: ClassConstructor<any>) : MethodDecorator & ClassDecorator {
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: ClassConstructor<any>){}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        //SerializeInterceptor comming in
        //Run something before a request is handled 
        //by the request handler
        //SerializeInterceptor running before the handler.
        return next.handle().pipe(
            map((data: any) => {
                //SerializeInterceptor going out
                //Run something before the response is sent out
                //SerializeInterceptor running before response is sent out. 
                return plainToClass(this.dto,data, {
                    excludeExtraneousValues: true,
                    enableImplicitConversion: true, // This helps with nested transformations
                    exposeDefaultValues: true,
                });
            })
        )
    }

}