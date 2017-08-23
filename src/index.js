// Page crea single page appliactions. Sive las páginas sin recargar las url. (Creo...
var page = require('page');

require('./homepage');
require('./user');
require('./signup');
require('./signin');
require('./footer');


page(); // Corre el código de page anterior tb sirve page.start();