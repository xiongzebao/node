import axios from '@/libs/api.request'

export const addInfo = (params) => {
  return axios.request({
    url: '/wxjs/public/info/insert',
    method: 'post',
    data: params
  })
}

export const getInfoList = (params) => {
  return axios.request({
    url: '/wxjs/public/info/querylist',
    method: 'post',
    data: params
  })
}

export const getInfoDetail = (params) => {
  console.log(params)
    return axios.request({
      url: '/wxjs/public/info/query',
      method: 'post',
      data: params
    })
  }

