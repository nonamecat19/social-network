export enum ErrorCodes {
  //UserCreateError = 100,
  //NotEnoughPermissions = 106,
  DataNotFound = 100,
  DataAlreadyExists = 101,
  IdNullError = 102,
  RelationshipError = 103
}

export const ErrorDescriptionsArray = {
  [ErrorCodes.DataNotFound]: 'This data was not found in the database.',
  [ErrorCodes.DataAlreadyExists]: 'This data already exists in the database.',
  [ErrorCodes.IdNullError]: 'Provided ID was null',
  [ErrorCodes.RelationshipError]: 'The entry in the table to which the connection is attempted does not exist',
}
