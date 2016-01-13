var mongoose = require('mongoose');
var Cart = mongoose.model('Cart');


var categories = [{"name": "tree" },
{"name": "house plants" },
{"name": "holiday" },
{"name": "mythical" },
{"name": "carnivorous" },
{"name": "nuclear" },
{"name": "seeds" },
{"name": "accessories" },
{"name": "flowers" },
{"name": "bushes" }
];

module.exports = categories;

