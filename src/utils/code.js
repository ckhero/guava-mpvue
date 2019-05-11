import global from '../components/global'

function getCode () {
  let _global = global
  wx.checkSession({
    success: function () {
      console.log('session未过期')
      if (!_global.code) {
        let code = getCodeByLogin()
        console.log(code)
        return code
      } else {
        return _global.code
      }
    },
    fail: function () {
      console.log('session已过期')
      return getCodeByLogin()
    }
  })
}

function getCodeByLogin () {
  let _global = global
  wx.login({
    success (res) {
      if (res.code) {
        _global.code = res.code
        console.log(res.code)
        console.log(_global.code)
        return res.code
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}

export {getCode}
