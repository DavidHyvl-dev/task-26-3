import axios from 'axios'
import { toAppError } from '../utils/errorHandling'
import type { DomainDetail } from '../types/domainDetail'
// This service is responsible for fetching domain details from the API.
export const getDomainDetail = async (): Promise<DomainDetail> => {
  try {
    const response = await axios.get<DomainDetail>('/domain-detail.json')
    return response.data
  } catch (error: unknown) {
    console.error('[DomainService] Failed to load domain detail:', error)
    throw toAppError(error, 'Unable to load domain detail.')
  }
}