var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    product: {
        type: String,
        ref: 'Product'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    appliesTo: {
        type: String,
        required: true,
        enum: ['all', 'product', 'category'],
        default: 'all'
    },
    discount: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    begins: {
        type: Date,
        default: Date.now
    },
    expires: {
        type: Date,
        default: function(){
            return +new Date() + 7*24*60*60*1000;
        }
    }
});

schema.pre('save', function(next, done) {
    var err;
    if(this.appliesTo === 'product' && !this.product) {
        err = new Error('Product promos require a product id');
        next(err);
    } else if(this.appliesTo === 'category' && !this.category) {
        err = new Error('Category promos require a category id');
        next(err);
    } else if(this.applieTo === 'all' && (this.category || this.product)) {
        err = new Error('All-product promos don\'t require product or category ids');
        next(err);
    } else {
        next();
    }
});

schema.virtual('available').get(function() {
    var now = Date.now();
    return this.begins < now && now < this.expires;
})

mongoose.model('Promo', schema);