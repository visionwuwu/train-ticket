import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import CityItem from './CityItem';
import AlphaIndex from '../AlphaIndex';

function CityList(props) {
    const { cityList, onSelect, toAlpha } = props;

    const alphabet = useMemo(() => {
        return Array.from(new Array(26), (item, index) =>
            String.fromCodePoint(65 + index)
        );
    }, []);

    return (
        <div className="city-list">
            <div className="city-cate">
                {cityList.map((item) => (
                    <CityItem
                        key={item.title}
                        title={item.title}
                        cities={item.citys}
                        onSelect={onSelect}
                    />
                ))}
            </div>
            <div className="city-index">
                {alphabet.map((alpha) => (
                    <AlphaIndex key={alpha} alpha={alpha} onClick={toAlpha} />
                ))}
            </div>
        </div>
    );
}

PropTypes.propTypes = {
    cityList: PropTypes.array,
    onSelect: PropTypes.func.isRequired,
};

export default memo(CityList);
