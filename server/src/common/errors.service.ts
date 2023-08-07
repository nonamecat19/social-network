import { BadRequestException, Injectable } from '@nestjs/common'
import { ErrorCodes, ErrorDescriptionsArray } from './statusCodes'

@Injectable()
export class ErrorsService {

  async ErrorDataNotFound(obj) {
    if (!obj) {
      console.log(ErrorDescriptionsArray[ErrorCodes.DataNotFound])
      throw new BadRequestException(ErrorCodes.DataNotFound)//запис не знайдено//Запис з вказаним id (' + { id } + ') не знайдено.
    }
  }

  async ErrorIdNullError(id_1) {
    if (!id_1) { //хоча в цьому методі перевірки не потрібні, бо сюди має 100% приходити числа, проте це чомусь не так
      console.log(ErrorDescriptionsArray[ErrorCodes.IdNullError])
      throw new BadRequestException(ErrorCodes.IdNullError) //id були null
    }
  }

  async ErrorRelationshipError() {
      //console.log(e)
      console.log(ErrorDescriptionsArray[ErrorCodes.RelationshipError])
      throw new BadRequestException(ErrorCodes.RelationshipError)
  }

  async ErrorDataAlreadyExists(obj) {
    if (obj) {
      console.log(ErrorDescriptionsArray[ErrorCodes.DataAlreadyExists])
      throw new BadRequestException(ErrorCodes.DataAlreadyExists) //запис вже існує
    }
  }

}