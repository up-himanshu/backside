module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    // "extends": "eslint:recommended",
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "consistent-return": 2,
        "indent"           : [1, "tab"],
        "no-else-return"   : 1,
        // "semi"             : [1, "always"],
        "space-unary-ops"  : 2
    },
    "globals": {
        "use": true,
        "module": "writable",
        "module": "readonly"
    }
};