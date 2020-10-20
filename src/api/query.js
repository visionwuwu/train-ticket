/**
 * 获取车次列表数据
 */
export const fetchQueryData = (url) => {
  return fetch(url).then(res => res.json())
}
