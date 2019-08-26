// let _filter = (list, predi) => {
//     let new_list = [];
//     for (let i=0; i<list.length; i++) {
//         if (predi(list[i])) {
//             new_list.push(list[i])
//         }
//     }
//     return new_list;
// }

// let _map = (list, mapper) => {
//     let new_list = []
//     for (let i=0; i<list.length; i++) {
//         new_list.push(mapper(list[i]))
//     }
//     return new_list;
// }

let _get = _curryr((obj, key) => {
    return obj == null ? undefined : obj[key]
})

let _filter = (list, predi) => {
    let new_list = [];

    _each(list, (val) => {
        if (predi(val)) new_list.push(val)
    })
    return new_list;
}

let _map = (list, mapper) => {
    let new_list = []
    _each(list, (val) => {
        new_list.push(mapper(val))
    })
    return new_list;
}

let _is_object = () => {
    return typeof obj == 'object' && !!obj
}

let _keys = (obj) => {
    return _is_object(obj) ? Object.keys(obj) : []
}

let _length = _get('length')

let _each = (list, iter) => {
    let keys = _keys(list)

    for (let i=0, len = keys.length; i<len; i++) {
        iter(list[keys[i]])
    }
    return list
}

function _curryr(fn) {
    return (a, b) => {
        return arguments.length == 2 ? fn(a,b) : (b) => fn(b, a)
    }
}

function _curry(fn) {
    return (a, b) => {
        return arguments.length == 2 ? fn(a,b) : (b) => fn(a,b)
    }
}

function _reduce(list, iter, memo) {
    if (arguments.length == 2) {
        memo = list[0]
        list = _rest(list);
    }

    _each(list, (val)=>{
        memo = iter(memo, val)
    })
    return memo
}

let _rest = (list, num) => {
    return Array.prototype.slice.call(list, num || 1)
}

let _mapr = _curryr(_map),
    _filterr = _curryr(_filter)

function _pipe() {
    let fns = arguments;
    return (arg) => {
        return _reduce(fns, (arg, fn) => {
            return fn(arg);
        }, arg);
    }
}

function _go(arg) {
    let fns = _rest(arguments);
    return _pipe.apply(null, fns)(arg)
}