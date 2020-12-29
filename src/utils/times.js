/**
 * 根式化日期为当前时间的零时零分零秒零毫秒
 * @param {*} timeStamp
 * @returns {*} 时间戳
 */
export const h0 = (timeStamp = Date.now()) => {
  let d = new Date(timeStamp);
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d.getTime();
};
