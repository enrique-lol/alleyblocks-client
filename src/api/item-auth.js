import apiUrl from '../apiConfig'
import axios from 'axios'

export const itemIndex = (user) => {
  return axios({
    url: apiUrl + '/items',
    method: 'GET'
  })
}

export const homeIndex = () => {
  return axios({
    url: apiUrl + '/first14',
    method: 'GET'
  })
}
export const index14 = (user, loadCount) => {
  return axios({
    url: apiUrl + '/next14',
    method: 'GET',
    data: { loadCount }
  })
}

export const itemCreate = (item, user) => {
  return axios({
    url: apiUrl + '/items',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { item }
  })
}
export const getItem = (id) => {
  return axios({
    url: apiUrl + '/items/' + id,
    method: 'GET'
  })
}

export const itemUpdate = (id, item, user) => {
  return axios({
    url: apiUrl + '/items/' + id,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { item: item }
  })
}