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

module.exports.pascalToUnderscore = pascalToUnderscore
module.exports.uderscoreToPascal = uderscoreToPascal