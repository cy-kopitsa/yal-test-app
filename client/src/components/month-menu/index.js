import React from 'react';
import {Menu, Popup} from 'semantic-ui-react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

const MonthMenu = ({activeMonth, mobile, months, onMonthClick}) => (
    <Menu
        compact
        className={styles.monthMenu}
        fluid={mobile}
        secondary 
        stackable
    >
        {months.map(({monthName, usersNum, color}) => (
            <Popup
                key={monthName}
                trigger={
                    <Menu.Item
                        className={color}
                        name={monthName}
                        active={activeMonth === monthName}
                        onClick={(e, {name}) => onMonthClick(name)}
                    >
                        {monthName}
                    </Menu.Item>
                }
                content={`${usersNum} users`}
            />
        ))}
    </Menu>
);

MonthMenu.propTypes = {
    activeMonth: PropTypes.string,
    mobile: PropTypes.bool,
    months: PropTypes.arrayOf(
        PropTypes.shape({
            monthName: PropTypes.string.isRequired,
            usersNum: PropTypes.number.isRequired,
            color: PropTypes.string.isRequired
        })
    ),
    onMonthClick: PropTypes.func.isRequired
};

export default MonthMenu;