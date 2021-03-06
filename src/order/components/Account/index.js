import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.scss';

function Account(props) {
    const { price = 0, length } = props;

    const [expanded, setExpanded] = useState(false);

    return (
        <div className="account">
            <div
                className={classNames('price', { expanded })}
                onClick={() => setExpanded(!expanded)}
            >
                <div className="money">{length * price}</div>
                <div className="amount">支付金额</div>
            </div>
            <div className="button">提交按钮</div>

            <div
                className={classNames('layer', { hidden: !expanded })}
                onClick={() => setExpanded(false)}
            ></div>
            <div className={classNames('detail', { hidden: !expanded })}>
                <div className="title">金额详情</div>
                <ul>
                    <li>
                        <span>火车票</span>
                        <span>￥{price}</span>
                        <span>&#xD7;{length}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

Account.propTypes = {
    price: PropTypes.number,
    length: PropTypes.number.isRequired,
};

export default memo(Account);
