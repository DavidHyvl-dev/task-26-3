import { shallowRef, ref } from 'vue'
import type { Ref, ShallowRef } from 'vue'
import type { AppError } from '../types/error'
import { toAppError } from '../utils/errorHandling'
// Define the return type for the useAsyncData composable, which includes the data, loading state, error state, and functions to execute the async operation, clear errors, and reset the state.
type UseAsyncDataReturn<T> = {
  data: ShallowRef<T | null>
  isLoading: Ref<boolean>
  error: Ref<AppError | null>
  execute: () => Promise<T | null>
  clearError: () => void
  reset: () => void
}
// A composable for managing asynchronous data fetching with loading and error states.
export const useAsyncData = <T>(
  asyncFn: () => Promise<T>,
  fallbackMessage = 'Failed to load data.'
): UseAsyncDataReturn<T> => {
  const data = shallowRef<T | null>(null)
  const isLoading = ref(false)
  const error = ref<AppError | null>(null)

  const clearError = () => {
    error.value = null
  }

  const reset = () => {
    data.value = null
    error.value = null
    isLoading.value = false
  }

  const execute = async (): Promise<T | null> => {
    isLoading.value = true
    error.value = null

    try {
      const result = await asyncFn()
      data.value = result
      return result
    } catch (err: unknown) {
      data.value = null
      error.value = toAppError(err, fallbackMessage)
      return null
    } finally {
      isLoading.value = false
    }
  }

  return {
    data,
    isLoading,
    error,
    execute,
    clearError,
    reset,
  }
}