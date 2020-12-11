import $api from '@/api'

/**
 * 后台管理员登录
 * @param userInfo - 管理员信息
 */
export const login = userInfo => {
  return $api.post('/login', userInfo)
}
