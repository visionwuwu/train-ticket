/**
 * 获取城市列表数据
 */
export const fetchCityData = () => {
  return fetch("/rest/cities");
};

/**
 * 根据搜索关键词获取suggest
 * @param {*} searchKey
 */
export const findSuggestBySearchKey = (searchKey) => {
  return fetch("/rest/search?key=" + encodeURIComponent(searchKey));
};
