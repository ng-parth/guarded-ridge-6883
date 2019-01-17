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

// /api/page/:pageName?key=value
// getProducts
exports.get = function (req, res) {
    var getProducts = function(type, nos) {
        const productsList = [];
        for (let i = 0; i < nos; i++) {
            productsList.push(new ProductCard(type, i + 1))
        }
        return productsList;
    };
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
                products: getProducts('Trending', 4),
            },
            {
                sectionType: 'list',
                order: 3,
                title: 'Bestsellers in Mumbai',
                seeMoreTitle: 'See all bestseller in Mumbai',
                seeMoreActionUrl: '/bestseller',
                products: getProducts('Bestsellers', 4),
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
                products: getProducts('Recent', 4),
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


function handleError(res, err) {
    console.log('ERROR IS :',err);
    res.send(400, {error: err});
};