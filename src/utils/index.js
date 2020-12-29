/**
 * 节流函数
 * @param {*} timer
 * @param {*} doSome
 * @param {*} options
 */
export function throttle(timer, doSome, options) {
  let timeid,
    old = 0,
    now;
  return function (...args) {
    now = Date.now();
    if (!options.leading) {
      old = now;
    }
    if (now - old > timer) {
      if (timeid) {
        clearTimeout(timeid);
      }
      old = now;
      doSome.apply(this, args);
    } else if (!timeid && options.trailing) {
      timeid = setTimeout((_) => {
        old = Date.now();
        doSome.apply(this, args);
        timeid = null;
      }, timer);
    }
  };
}

/**
 * 判断是否为对象
 * @param {*} target
 */
export const isEmptyObj = (target) => {
  return target !== null && Object.keys(target).length === 0;
};
