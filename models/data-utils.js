function pascalToUnderscore(s) {
    return s.replace(/\.?([A-Z])/g, function (x, y) { return "_" + y.toLowerCase() }).replace(/^_/, "");
}

function uderscoreToPascal(s) {
    return s.replace(
        /([-_][a-z])/g,
        (group) => group.toUpperCase()
            .replace('-', '')
            .replace('_', '')
    );
}

function pascalToUnderscoreObject(obj) {
    let newObj = {}
    Object.keys(obj).forEach((key) => {
      let newKey = pascalToUnderscore(key)
      newObj[newKey] = obj[key]
    })
    return newObj
}
 
function underscoreToPascalObject(obj) {
    let newObj = {}
    Object.keys(obj).forEach((key) => {
      let newKey = uderscoreToPascal(key)
      newObj[newKey] = obj[key]
    })
    return newObj
}

module.exports.pascalToUnderscore = pascalToUnderscore
module.exports.uderscoreToPascal = uderscoreToPascal
module.exports.pascalToUnderscoreObject = pascalToUnderscoreObject
module.exports.underscoreToPascalObject = underscoreToPascalObject