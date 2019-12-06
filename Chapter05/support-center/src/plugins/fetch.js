import state from '../state'
import router from '../router/index'

let baseUrl
export default {
  install (Vue, options) {
    console.log('Installed!', options)
    baseUrl = options.baseUrl
    Vue.prototype.$fetch = $fetch
  }
}

export async function $fetch (url, options) {
  const finalOptions = Object.assign({}, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }, options)
  const response = await fetch(`${baseUrl}${url}`, finalOptions)
  if (response.ok) {
    const data = await response.json()
    return data
  } else if (response.status === 403) {
    // 如果回话不在有效
    // 我们登出
    state.user = null
    // 如果这个页面是私有的我们就跳转到登录界面
    if (router.currentRoute.matched.some(r => r.meta.private)) {
      router.replace({
        name: 'login',
        params: {
          wantedRoute: router.currentRoute.fullPath
        }
      })
    }
  } else {
    const message = await response.text()
    const error = new Error(message)
    throw error
  }
}
