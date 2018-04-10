var mongoose    = require('mongoose');
var Shema       = mongoose.Schema;

var BearShema   = new Shema({
    name: String
});

module.exports = mongoose.model('Bear', BearShema);