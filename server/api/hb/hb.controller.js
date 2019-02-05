/**
 * Created by Parth Mistry on 30-03-2015.
 */
var fs = require('fs');
var _ = require('lodash');
var Bookmark = require('../bookmark/bookmark.model');
function ProductCard (type, index) {
    this.id = type + '-' + index;
    this.name = type + ' food ' + index;
    this.imageUrl = 'http://salemdigest.com/wp-content/uploads/2016/08/TITS_food1.jpg';
    this.regularPrice = Math.floor(Math.random() * 1000);
    this.discountPrice = Math.floor(Math.random() * 1000);
    this.discountPercentage = Math.floor(Math.random() * 10);
    this.size = '500g';
    this.badge = Math.random() > 0.75 ?'Bestseller' : '';
    this.badgeType = 'info';
    this.maxQty = Math.floor(Math.random() * 10) || 1;
    this.lowQtyAlert = this.maxQty < 4 ? 'Only a few left' : '';
    this.qtyInCart = Math.random() > 0.7 ? Math.floor(Math.random() * 10) : 0;
}

var getProducts = function(type, nos) {
    const productsList = [];
    for (let i = 0; i < nos; i++) {
        productsList.push(new ProductCard(type, i + 1))
    }
    return productsList;
};

// /api/page/:pageName?key=value
// getProducts
exports.get = function (req, res) {

    // Section types:
    // -promo -list -shopBy
    var homepageResponse = {
        // url: 'GET /api/page/{pageName}?key=value',
        pageName: 'homepage',
        totalSections: 6,
        sections: [
            {
                sectionType: 'promo',
                imageUrl: '',
                actionUrl: '',
                order: 1,
                // text embedded in image ??
            },
            {
                sectionType: 'list',
                order: 2,
                title: 'Trending this week',
                seeMoreTitle: 'See All trending (27)',
                seeMoreActionUrl: '/special/cold-cuts',
                apiUrl: '/api/hb/products/Trending',
                // products: getProducts('Trending', 4),
                products: [],
            },
            {
                sectionType: 'list',
                order: 3,
                title: 'Bestsellers in Mumbai',
                seeMoreTitle: 'See all bestseller in Mumbai',
                seeMoreActionUrl: '/bestseller',
                apiUrl: '/api/hb/products/Bestsellers',
                // products: getProducts('Bestsellers', 4),
                products: [],
            },
            {
                sectionType: 'promo',
                imageUrl: '',
                actionUrl: '',
                order: 4,
                // text embedded in image ??
            },
            {
                sectionType: 'list',
                order: 5,
                title: 'Recently viewed',
                seeMoreTitle: 'See 9 more',
                seeMoreActionUrl: '/recently-viewed',
                apiUrl: '/api/hb/products/Recent',
                // products: getProducts('Recent', 4),
                products: [],
            },
            {
                // embedded in section?? or out of section???
                sectionType: 'shopBy',
                order: 6,
                title: 'Shop by menu',
                products: [
                    {
                        imageUrl: '',
                        actionUrl: '/category/mutton',
                    },
                    {
                        imageUrl: '',
                        actionUrl: '/category/chicken',
                    },
                    {
                        imageUrl: '',
                        actionUrl: '/category/sea-food',
                    },
                    {
                        imageUrl: '',
                        actionUrl: '/category/special',
                    },
                ],
            },
        ],
        heroSection: {
            // external or embedded within SECTIONS?
            imageUrl: '',
            title: 'Thanksgiving made easy',
            description: '20% off on our entire turkey range. Apply code THANKS20 in cart.',
        },
    };
    res.send(homepageResponse);
};

exports.add = function(req, res){
    var bookmark = req.body;
    Bookmark.create(bookmark, function(err, bookmark){
        if (err) {
            handleError(res, err);
        }
        res.send(true);
    })
};

exports.getById = function(req, res){
    var filter = req.params;
    Bookmark.findById(filter.id, function(err, bookmark){
        if (err) {
            handleError(res, err);
        }
        res.send(bookmark);
    })

};

exports.put = function(req, res){
    var filter = req.params;
    delete req.body._id;
    Bookmark.findOneAndUpdate({_id: filter.id}, req.body, function(err, bookmark){
        if (err) {
            handleError(res, err);
        }
        res.send(true);
    })
};

exports.delete = function(req, res){
    var filter = req.params;
    Bookmark.findOneAndUpdate({_id: filter.id}, {$set: {active: false}}, function(err, bookmark){
        if (err) {
            handleError(res, err);
        }
        res.send(true);
    })
};

exports.getProducts = function (req, res) {
    var type = req.params.type;
    var pageNo = req.query.pageNo || 0;
    var pageSize = req.query.pageSize || 4;
    // console.log('type: ', type);
    var i = Math.round(Math.random() * 10);
    var products = getProducts(type, i > 3 ? i : 4);
    setTimeout(function () {
        res.send({
            count: products.length,
            products: products.slice(pageNo*pageSize, pageSize)
        });
    }, 500)
};

exports.atc = function (req, res) {
    var pId = req.body.productId;
    console.log('Product Id: ', pId);
    var prob = Math.random();
    setTimeout(function () {
        if (prob < 0.1) {
            res.send(400, {error: err});
        } else if (prob < 0.25) {
            res.send({action: 'failure', message: 'Price changed for this product.'})
        } else {
            res.send(req.body);
        }
    }, 500);
};

function handleError(res, err) {
    console.log('ERROR IS :',err);
    res.send(400, {error: err});
};