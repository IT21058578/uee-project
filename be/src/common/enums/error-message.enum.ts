const ErrorMessage = {
  // Not Found
  USER_NOT_FOUND: 'User not found',
  TOKEN_NOT_FOUND: 'Token not found',
  FILE_NOT_FOUND: 'File not found',

  // Already exists
  USER_ALREADY_EXISTS: 'User already exists',

  // Authoriztion
  INVALID_CREDENTIALS: 'Invalid credentials',
  INSUFFICIENT_PERMISSIONS: 'Insufficient permissions',
  NOT_AUTHENTICATED: 'Not authenticated',
  INVALID_TOKEN: 'Invalid token',
  EMAIL_NOT_VERIFIED: 'Email not verified',

  // Misc
  INVALID_FILE_NAME: 'Invalid file name',
} as const;

export default ErrorMessage;
