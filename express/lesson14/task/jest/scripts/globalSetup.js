/* Global setup module.
 **
 ** This module exports an async function that is triggered
 ** once before all test suites.
 **
 */
const chalk = require('chalk');
const path = require('path');
require('dotenv').config({ path: path.resolve('.env.test') });

module.exports = function () {
    console.log(chalk.green('λ'));
};
