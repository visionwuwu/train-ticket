
/**
 * 获取坐席选择页面数据
 * @param {*} url 
 */
export const fetchTicketData = (url) => {
  return fetch(url).then(res=> res.json())
}

/**
 * 获取时刻列表数据
 * @param {*} url 
 */
export const fetchScheduleData = (url) => {
  return fetch(url).then(res => res.json())
}