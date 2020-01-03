export const getUniqueKeyValues = (data, key) => {
    let result = [];
    let values = data.map(item => item[key]);
    for (let value of values) {
        if (!result.includes(value)) {
            result.push(value);
        }
    }
    return result;
};

export const getColorName = (num) => {
    switch (true) {
        case num >= 0 && num <= 2:
            return 'grey';
        case num >= 3 && num <= 6:
            return 'blue';
        case num >= 7 && num <= 10:
            return 'green';
        case num > 10:
            return 'red';
        default:
            return null;
    }
};