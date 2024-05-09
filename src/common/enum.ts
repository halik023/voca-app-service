export enum AccountType {
  NORMAL = 'normal',
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
  GITHUB = 'github',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INVALID_TOKEN = 419,
  INTERNAL_SERVER_ERROR = 500,
}

export enum HttpMessage {
  OK = 'Server response success',
  CREATED = 'Server created successfully',
  BAD_REQUEST = 'Bad request',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  NOT_FOUND = 'Not found',
  INVALID_ACCESS_TOKEN = 'Invalid access token',
  INVALID_REFRESH_TOKEN = 'Invalid refresh token',
  LOGIN_ERROR = 'Email or password is incorrect',
  INTERNAL_SERVER_ERROR = 'Internal server error',
}
