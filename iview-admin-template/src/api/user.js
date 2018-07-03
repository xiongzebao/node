import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: 'login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const getAllUserInfo = () => {
  return axios.request({
    url: '/wxjs/auth/user/get_all_userinfo',
    method: 'post'
  })
}

export const getErrorInfo = () => {
  return axios.request({
    url: '/wxjs/public/error/get_error_info',
    method: 'post'
  })
}


