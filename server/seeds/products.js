var mongoose = require('mongoose');
var Product = mongoose.model('Product');


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
},
{
        "name": 'Tree Beard',
        "photo": 'http://snowder.com/blog/ent_300.jpg',
        "description": 'Greetings, little hobbits',
        "price": '400.00',
        "stock": '1',
        "category": ['tree', 'mythical']
},

{
        "name": 'Tulips',
        "photo": 'http://blog.americanmeadows.com/wp-content/uploads/2012/10/Tulip-Peach-Pink.jpg',
        "description": 'Beautiful pot of tulips',
        "price": '24.00',
        "stock": '5',
        "category": ['house plants', 'flowers']
},

{
        "name": 'Tomato Plant Seeds',
        "photo": 'http://tinyfarmblog.com/wp-content/uploads/2009/04/spr09_first-tomato-seedlings.jpg',
        "description": 'One small bag of seeds',
        "price": '24.00',
        "stock": '5',
        "category": ['house plants', 'seeds']
},

{
        "name": 'Springfield Nuclear Power Plant',
        "photo": 'http://www.risefeed.com/wp-content/uploads/2015/08/Springfield_Nuclear_Power_Plant2.png',
        "description": 'Doh',
        "price": '24.00',
        "stock": '5',
        "category": ['nuclear']
},

]
module.exports = products;

