import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError"
import { HttpStatus } from '@nestjs/common';


export default class UserNotFoundException extends EntityNotFoundError {
    statusCode: number
    constructor(entity: string, id: string) {
        super(entity, id)
        this.message = `${entity} with id ${id} not found.`
        this.statusCode = HttpStatus.BAD_REQUEST;

    }
}