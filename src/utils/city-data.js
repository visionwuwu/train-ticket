export const CITYDATE = 'CITYDATE';

/**
 * 设置城市列表
 * @param {*} cityData
 * @param {*} expires
 */
export const setCityDataCache = (cityData, expires = 1000 * 60 * 60) => {
    localStorage.setItem(
        CITYDATE,
        JSON.stringify(
            {
                cityData,
                expires: Date.now() + expires,
            } || '{}'
        )
    );
};

/**
 * 获取城市列表
 */
export const getCityDataCache = () => {
    return JSON.parse(localStorage.getItem(CITYDATE) || '{}');
};
