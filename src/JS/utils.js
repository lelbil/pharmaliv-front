
exports.includes = (array, value) => {
    return array.indexOf(value) >= 0
}

/**
 * An alternative way to splice an element out of an array, returning a new array instead of modifying the existing one.
 * Thus respecting functional programming paradigm
 */
exports.eliminate = (array, indexToEliminate) =>  array.filter((element, index) => index !== indexToEliminate)
