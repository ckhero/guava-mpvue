function setToken (token) {
  wx.setStorageSync('token', token)
}

function getToken () {
  return wx.getStorageSync('token') || ''
}
export {
  setToken,
  getToken
}
