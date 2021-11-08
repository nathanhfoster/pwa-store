const withTM = require('next-transpile-modules')(['@material-ui/core', 'resurrection']); // pass the modules you would like to see transpiled

module.exports = withTM();