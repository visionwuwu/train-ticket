import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MenuItem from './MenuItem';
import './index.scss';

function Menu(props) {
    const { show, hideMenu, onPress, options } = props;

    return (
        <div>
            {show && (
                <div className="menu-mask" onClick={() => hideMenu()}></div>
            )}
            <div
                className={classNames('menu', {
                    show,
                })}
            >
                <div className="menu-title"></div>
                <ul>
                    {options &&
                        options.map((option) => {
                            return (
                                <MenuItem
                                    key={option.value}
                                    onPress={onPress}
                                    {...option}
                                />
                            );
                        })}
                </ul>
            </div>
        </div>
    );
}

Menu.propTypes = {
    show: PropTypes.bool.isRequired,
    hideMenu: PropTypes.func.isRequired,
    onPress: PropTypes.func,
    options: PropTypes.array,
};

export default memo(Menu);
