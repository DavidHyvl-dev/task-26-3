import type { AppError } from '../types/error'
/// Utility function to convert AppError codes to user-friendly messages
export const getUserErrorMessage = (error: AppError): string => {
  switch (error.code) {
    case 'NOT_FOUND':
      return 'Requested data could not be found.'
    case 'NETWORK_ERROR':
      return 'Connection problem. Please retry.'
    case 'SERVER_ERROR':
      return 'Server is currently unavailable. Please try again later.'
    case 'VALIDATION_ERROR':
      return 'Provided data is invalid.'
    default:
      return error.message || 'Unexpected error occurred.'
  }
}