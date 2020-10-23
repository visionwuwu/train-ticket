
/**
 * 获取坐席选择页面数据
 * @param {*} url 
 */
export const fetchTicketData = (url) => {
  return fetch(url).then(res=> res.json())
}