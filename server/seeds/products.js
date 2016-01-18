var mongoose = require('mongoose');
var Product = mongoose.model('Product');


var products = [
{
        "name": 'Bonsai Tree',
        "photo": '/images/product-images/bonsai-tree.jpg',
        "description": 'this is a bonsai tree it\'s pretty dope',
        "price": '40.00',
        "stock": '3',
        "category": ['tree', 'house plants']
},

{
        "name": 'Christmas Wreath',
        "photo": '/images/product-images/christmas-wreath.jpg',
        "description": 'this is a WREATH it\'s pretty dope',
        "price": '240.00',
        "stock": '2',
        "category": ['tree', 'holiday']
},
{
        "name": 'Tree Beard',
        "photo": '/images/product-images/treebeard.jpg',
        "description": 'Greetings, little hobbits',
        "price": '400.00',
        "stock": '1',
        "category": ['tree', 'mythical']
},

{
        "name": 'Tulips',
        "photo": '/images/product-images/pink-tulip.jpg',
        "description": 'Beautiful pot of tulips',
        "price": '24.00',
        "stock": '5',
        "category": ['house plants', 'flowers']
},

{
        "name": 'Tomato Plant Seeds',
        "photo": '/images/product-images/tomato-seedlings.jpg',
        "description": 'One small bag of seeds',
        "price": '24.00',
        "stock": '5',
        "category": ['house plants', 'seeds']
},

{
        "name": 'Springfield Nuclear Power Plant',
        "photo": '/images/product-images/springfield-powerplant.png',
        "description": 'Doh',
        "price": '24.00',
        "stock": '5',
        "category": ['nuclear']
},
{
        "name": 'Carniverous Plant',
        "photo": '/images/product-images/venus-fly-trap.jpg',
        "description": 'Yummy',
        "price": '40.00',
        "stock": '5',
        "category": ['nuclear']
}
]
module.exports = products;

