var mongoose = require('mongoose');
var Order = mongoose.model('Order');


var products = [
{
        "name": 'Bonsai Tree',
        "photo": 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Eurya,_1970-2007.jpg',
        "description": 'this is a bonsai tree it\'s pretty dope',
        "price": '40.00',
        "stock": '3',
        "category": ['tree', 'small']
},

{
        "name": 'Christmas Wreath',
        "photo": 'http://emmastrend.com/wp-content/uploads/Christmas-Wreath-4.png',
        "description": 'this is a WREATH it\'s pretty dope',
        "price": '240.00',
        "stock": '2',
        "category": ['tree', 'holiday']
}
]
module.exports = orders;

