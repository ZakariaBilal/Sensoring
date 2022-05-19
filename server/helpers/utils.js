const _ = require('underscore');
const sanitize = require('mongo-sanitize');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.sanitize = (object) => {
    _.each(object, (value, key) => {
        if (_.isObject(value)) {
            object[key] = sanitize(value);
        }
    })
    return object;
}

module.exports.buildSearchRegex = (text) => {
    let regexString = "",
    terms = text.replace(/[&\/\\#,+(\[\])$~%.'":*?<>{}]/g, c => '\\' + c);
    return terms
    // _.each(terms, (term, index) => {
    //     regexString += term;
    //     if (index < terms.length - 1) regexString += '|';
    // })
    // return regexString;
}

module.exports.random = (length) => {
    return Math.random().toString(36).substring(length);
}

const cloneObject = (target, map = new WeakMap()) => {
    if (typeof target != "object" || ObjectId.isValid(target) || target == null) {
        return target;
    }
    const type = toRawType(target);
    let cloneTarget = null;

    if (map.get(target)) {
        return map.get(target);
    }
    map.set(target, cloneTarget);

    if (type != "Set" && type != "Map" && type != "Array" && type != "Object") {
        return cloneOtherType(target)
    }

    // clone Set
    if (type == "Set") {
        cloneTarget = new Set();
        target.forEach(value => {
            cloneTarget.add(cloneObject(value, map));
        });
        return cloneTarget;
    }

    // clone Map
    if (type == "Map") {
        cloneTarget = new Map();
        target.forEach((value, key) => {
            cloneTarget.set(key, cloneObject(value, map));
        });
        return cloneTarget;
    }

    // clone Array
    if (type == "Array") {
        cloneTarget = new Array();
        forEach(target, (value, index) => {
            cloneTarget[index] = cloneObject(value, map);
        })
    }

    // clone normal Object
    if (type == "Object") {
        cloneTarget = new Object();
        forEach(Object.keys(target), (key) => {
            cloneTarget[key] = cloneObject(target[key], map);
        })
    }

    return cloneTarget;
}

const cloneOtherType = target => {
    const constrFun = target.constructor;
    switch (toRawType(target)) {
        case "Boolean":
        case "Number":
        case "String":
        case "Error":
        case "Date":
            return new constrFun(target);
        case "RegExp":
            return cloneReg(target);
        case "Symbol":
            return cloneSymbol(target);
        case "Function":
            return target;
        default:
            return null;
    }
}

const toRawType = value => {
    const _toString = Object.prototype.toString;
    const str = _toString.call(value)
    return str.slice(8, -1)
}

const cloneSymbol = targe => {
    return Object(Symbol.prototype.valueOf.call(targe));
}

const cloneReg = targe => {
    const reFlags = /\w*$/;
    const result = new targe.constructor(targe.source, reFlags.exec(targe));
    result.lastIndex = targe.lastIndex;
    return result;
}

const forEach = (array, iteratee) => {
    let index = -1;
    const length = array.length;
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
}

module.exports.cloneObject = cloneObject;