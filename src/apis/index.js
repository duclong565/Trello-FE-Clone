import axios from 'axios'
import { API_URL } from '../utils/constants'

/**
 * We dont use try-catch block here because we want to handle the error by a central error handler, which is Interceptor
 */

export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_URL}/v1/boards/${boardId}`)

  //axios will return response object with data property
  return response.data
}