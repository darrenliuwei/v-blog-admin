import $api from '@/api'

/**
 * 查询文章列表，每次10条，pageNumber代表页数
 * @param status - 文章显示与隐藏：0表示显示，1表示隐藏，默认为0
 * @param pageNumber - 页数
 */
export const articleList = (status, pageNumber) => {
  return $api.get('/article', { status, pageNumber })
}

/**
 * 添加文章
 * @param data - 文章数据
 */
export const addArticle = data => {
  return $api.post('/article', data)
}

/**
 * 硬删除文章
 * @param id - 文章ID
 */
export const delArticle = id => {
  return $api.delete('/article/' + id)
}

/**
 * 恢复文章
 * @param id - 文章ID
 */
export const recoverArticle = id => {
  return $api.post('/article/recover', { id })
}

/**
 * 修改文章
 * @param id - 文章ID
 * @param row - 要修改的文章数据
 */
export const editArticle = (id, row) => {
  return $api.put('/article/' + id, row)
}

/**
 * 软删除文章
 * @param id - 文章ID
 */
export const softDelete = id => {
  return $api.post('/article/soft-delete', { id })
}
