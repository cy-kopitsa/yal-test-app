import {useReducer} from 'react';
import moment from 'moment';
import {getUniqueKeyValues, getColorName} from '../util';

const storeReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE':
            const users = action.data
                .map(user => ({
                    id: user.id, 
                    fullName: `${user.firstName} ${user.lastName}`,
                    date: moment(user.dob).format('DD-MM-YYYY'),
                    monthName: moment(user.dob).format('MMMM'),
                    monthIndex: moment(user.dob).get('month') + 1
                }))
                .sort((a, b) => moment(a.date, 'DD-MM-YYYY') - moment(b.date, 'DD-MM-YYYY'));
            const months = getUniqueKeyValues(users, 'monthName')
                .map(monthName => {
                    let filteredUsers = users.filter(user => user.monthName === monthName);
                    let usersNum = filteredUsers.length;
                    let monthIndex = filteredUsers[0].monthIndex;
                    return {
                        monthName,
                        monthIndex,
                        usersNum,
                        color: getColorName(usersNum)
                    }
                })
                .sort((a, b) => a.monthIndex - b.monthIndex);
            return {
                users,
                months,
                activeMonth: months[0] ? months[0].monthName : null
            };

        case 'SET_MONTH':
            return {
                users: state.users.map(user => ({...user})),
                months: state.months.map(month => ({...month})),
                activeMonth: action.monthName
            };

        default:
            return state;
    }
};

const useStore = () => {
    const [state, dispatch] = useReducer(storeReducer, {
        users: [],
        months: [],
        activeMonth: null
    });

    return [state, dispatch];
};

export default useStore;