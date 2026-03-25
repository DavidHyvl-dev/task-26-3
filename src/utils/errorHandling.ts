import axios from 'axios'
import { AppError } from '../types/error'
/// Converts various error types into a standardized AppError format for consistent error handling across the application.
export const toAppError = (
  error: unknown,
  fallbackMessage = 'Something went wrong.'
): AppError => {
  if (error instanceof AppError) {
    return error
  }

  if (axios.isAxiosError(error)) {
    if (error.response) {
      const status = error.response.status

      if (status === 404) {
        return new AppError('Requested resource was not found.', 'NOT_FOUND', {
          status,
          isRetryable: false,
          originalError: error,
        })
      }

      if (status === 400) {
        return new AppError('Request data is invalid.', 'VALIDATION_ERROR', {
          status,
          isRetryable: false,
          originalError: error,
        })
      }

      if (status >= 500) {
        return new AppError('Server error occurred.', 'SERVER_ERROR', {
          status,
          isRetryable: true,
          originalError: error,
        })
      }

      return new AppError(fallbackMessage, 'UNKNOWN_ERROR', {
        status,
        isRetryable: false,
        originalError: error,
      })
    }

    if (error.request) {
      return new AppError('Network error: no response from server.', 'NETWORK_ERROR', {
        isRetryable: true,
        originalError: error,
      })
    }

    return new AppError(error.message || fallbackMessage, 'UNKNOWN_ERROR', {
      isRetryable: false,
      originalError: error,
    })
  }

  if (error instanceof Error) {
    return new AppError(error.message || fallbackMessage, 'UNKNOWN_ERROR', {
      isRetryable: false,
      originalError: error,
    })
  }

  return new AppError(fallbackMessage, 'UNKNOWN_ERROR', {
    isRetryable: false,
    originalError: error,
  })
}