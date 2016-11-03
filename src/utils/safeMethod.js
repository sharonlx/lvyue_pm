import { isArray, isObject, isUndefined, isNull } from './validator'

let safeForEach = (arr, callback) => {
    if ( isArray(arr) ) arr.forEach(callback);
};

let safeMap = (arr, callback) => {
    if ( isArray(arr) ) arr.map(callback);
};

let safeAssign = (state, nextState) => {
    if (!isObject(state) || !isObject(nextState)) {
        return state || nextState || {}
    }

    let keys = Object.keys(nextState);
    return Object.keys(state).reduce((result, value, key) => {
        if (keys.indexOf(value) >= 0) {
            result[value] = nextState[value];
        } else {
            result[value] = state[value];
        }
        return result;
    }, {});
};

let removeUnusedValue = (obj) => {
    let ret = {};

    if (!isObject(obj)) {
        return ret;
    }

    Object.keys(obj).forEach((key) => {
        if (!isNull(obj[key]) && !isUndefined(obj[key])) {
            ret[key] = obj[key];
        }
    });

    return ret;
};

/**
 * 合并两个obj,若nextState没有的值沿用currentState的
 * @param currentState
 * @param nextState
 * @returns {*}
 */
function mergeState(currentState, nextState) {
    if (!isObject(currentState) || !isObject(nextState)) return currentState || {};

    return {...currentState, ...nextState};
}

function warningUndefined(obj) {
    if (!isObject(obj)) throw new Error('argument is not an object');

    for (let prop in obj) {
        if (obj.hasOwnProperty(prop) && obj[prop] === undefined) throw new Error('object has undefined value');
    }

    return obj;
}

export {
    safeForEach,
    safeMap,
    safeAssign,
    removeUnusedValue,
    mergeState,
    warningUndefined
}
