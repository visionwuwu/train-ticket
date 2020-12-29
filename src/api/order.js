/**
 * 获取订单页面数据
 * @param {*} url
 */
export const fetchOrderData = (url) => {
    return fetch(url).then((res) => res.json());
};
