import global from '@/components/global'

function setToken (token) {
  wx.setStorageSync('token', token)
}

function getToken () {
  return wx.getStorageSync('token') || ''
}

function delToken () {
  wx.removeStorageSync('token')
  const url = global.loadingPageUrl
  wx.navigateTo({url})
}
export {
  setToken,
  getToken,
  delToken
}
