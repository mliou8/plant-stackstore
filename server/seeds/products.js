var mongoose = require('mongoose');
var Product = mongoose.model('Product');


var products = [
{
        "name": 'Bonsai Tree',
        "photo": '/images/product-images/bonsai-tree.jpg',
        "description": 'this is a bonsai tree it\'s pretty dope',
        "price": '40.00',
        "stock": '3',
        "category": [ 'house plants']
},

{
        "name": 'Christmas Wreath',
        "photo": '/images/product-images/christmas-wreath.jpg',
        "description": 'this is a WREATH it\'s pretty dope',
        "price": '240.00',
        "stock": '2',
        "category": [ 'house plants']
},
{
        "name": 'Tree Beard',
        "photo": '/images/product-images/treebeard.jpg',
        "description": 'Greetings, little hobbits',
        "price": '400.00',
        "stock": '1',
        "category": ['mythical']
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
        "category": [ 'seeds']
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
        "name": 'Venus Fly Trap',
        "photo": '/images/product-images/venus-fly-trap.jpg',
        "description": 'Yummy',
        "price": '40.00',
        "stock": '5',
        "category": ['carnivorous']
},
{
        "name": '3 Live Adult Carnivorous Plants in Deluxe Terrarium',
        "photo": '/images/product-images/3-fly-traps.jpg',
        "description": 'This deluxe terrarium has healthy LIVE ADULT Carnivorous Plants, ready to chomp some bugs!',
        "price": '40.00',
        "stock": '5',
        "category": ['carnivorous']
},
{
        "name": 'Drosera capensis',
        "photo": '/images/product-images/drosera.jpg',
        "description": 'This deluxe terrarium has healthy LIVE ADULT Carnivorous Plants, ready to chomp some bugs!',
        "price": '40.00',
        "stock": '5',
        "category": ['carnivorous']
},

{
        "name": 'Hirt\'s Fiddleleaf Fig Tree',
        "photo": '/images/product-images/figfiddleleaf3pot.jpg',
        "description": 'Ficus lyrata, commonly known as the fiddle-leaf fig, is a species of fig tree, native to western Africa, from Cameroon west to Sierra Leone. It grows in lowland tropical rainforest. As a house plant the Fiddleleaf Fig is very easy to grow. Provide morning sun or very bright indirect light and keep evenly moist, not wet or dry. Trim as needed.',
        "price": '40.00',
        "stock": '5',
        "category": ['house plants']
},

{
        "name": 'Jade Plant - Crassula ovuta',
        "photo": '/images/product-images/jade.jpg',
        "description": 'Ficus lyrata, commonly known as the fiddle-leaf fig, is a species of fig tree, native to western Africa, from Cameroon west to Sierra Leone. It grows in lowland tropical rainforest.',
        "price": '40.00',
        "stock": '5',
        "category": ['house plants']
}
,

{
        "name": '100% CERTIFIED ORGANIC NON-GMO Culinary Herb Set',
        "photo": '/images/product-images/herb_set.jpg',
        "description": 'Original Set of 12 Culinary Herbs Includes: Parsley, Thyme, Cilantro, Sweet Basil, Dill Bouquet, Oregano, Sweet Marjoram, Chives, Savory, Garlic Chives, Mustard, and Sage',
        "price": '13.99',
        "stock": '5',
        "category": ['seeds']
},

{
        "name": 'Organic Northern Sweet Strawberry Certified 100 Seeds',
        "photo": '/images/product-images/strawberry.jpg',
        "description": 'Strawberry not to be messed with. Superhardy, vigorous June bearing plants withstand infamous trio of strawberry season-spoilers: black root rot, black vine weevil, and Red Stele.',
        "price": '40.00',
        "stock": '5',
        "category": ['seeds']
},

{
        "name": 'Organic Rainbow Mix Pepper 150 Seeds',
        "photo": '/images/product-images/peppers.jpg',
        "description": 'This mix assures you of big, thick-walled, blocky bells in every color. We selected not only for appearance but uniform harvest time and superb disease resistance, so these varieties all mature within a week of one another and are vigorous garden performers.',
        "price": '40.00',
        "stock": '5',
        "category": ['seeds']
},

{
        "name": 'Organic Champion Radish 200 Seeds',
        "photo": '/images/product-images/radish.jpg',
        "description": 'All America selection winner. High in Vitamin C. 4-7 days to germination; in full sun, sow 2 seeds per inch in a row',
        "price": '40.00',
        "stock": '5',
        "category": ['seeds']
},

{
        "name": 'FD792 Blue Strawberry Seeds',
        "photo": '/images/product-images/blue-strawberries.jpg',
        "description": 'BLUE STRAWBERRIES. At least 6 hours of direct sun. Prepare the area in early spring.',
        "price": '40.00',
        "stock": '5',
        "category": ['seeds']
}
]
module.exports = products;

