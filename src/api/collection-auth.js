import apiUrl from '../apiConfig'
import axios from 'axios'

export const collectionIndex = () => {
  return axios({
    url: apiUrl + '/collections',
    method: 'GET'
  })
}

export const collectionCreate = (collection, user) => {
  return axios({
    url: apiUrl + '/collections',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      collection
    }
  })
}
export const viewCollection = (id) => {
  return axios({
    url: apiUrl + '/collection/' + id,
    method: 'GET'
  })
}

export const collectionUpdate = (id, collection, user) => {
  return axios({
    url: apiUrl + '/collection/' + id,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      collection: collection
    }
  })
}
