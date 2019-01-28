// graphql-tools combines a schema string with resolvers.
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLBoolean
} = require('graphql');

const {
    GraphQLDate,
    GraphQLTime,
    GraphQLDateTime
  } = require('graphql-iso-date');

// const { makeExecutableSchema } = require('graphql-tools');
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://pennez:hQEtupVK4JQlIHX3@pennezcluster0-shard-00-00-ljkjp.gcp.mongodb.net:27017,pennezcluster0-shard-00-01-ljkjp.gcp.mongodb.net:27017,pennezcluster0-shard-00-02-ljkjp.gcp.mongodb.net:27017/admin?replicaSet=PennezCluster0-shard-0&readPreference=primary&ssl=true';
const ObjectID = require('mongodb').ObjectID;
const fetch = require('node-fetch');

var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

// Database Name
// const dbName = 'pennez_product';

const hnAmazon = require('./lib/hnAmazon.js');
// const hnGoogle = require('./lib/hnGoogle.js');
const hnEmail = require('./lib/hnEmail.js');

// let client;
// let db;
// let pennezCollection;

// Use connect method to connect to the server
// MongoClient.connect(url, function (err, _client) {
//     assert.equal(null, err);
//     console.log("Connected successfully to server");
//     client = _client;
//     db = client.db(dbName);
//     pennezCollection = db.collection('pennezs');
// });

// helper functions 
function getProjection(fieldASTs) {
    return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
        projections[selection.name.value] = 1;

        return projections;
    }, {});
}

const ItemAttributesType = new GraphQLObjectType({
    name: 'ItemAttributes',
    description: 'ItemAttributes',
    fields: () => ({
        Author: {
            type: new GraphQLList(GraphQLString),
            description: 'a prop of the product.',
        },
        Binding: {
            type: GraphQLString,
            description: 'Bindingof the product.',
        },
        Brand: {
            type: GraphQLString,
            description: 'Brand of the product.',
        },
        EAN: {
            type: GraphQLString,
            description: 'EAN of the product.',
        },
        EANList: {
            type: GraphQLString,
            description: 'EANList of the product.',
        },
        Feature: {
            type: GraphQLString,
            description: 'Feature of the product.',
        },
        ISBN: {
            type: GraphQLString,
            description: 'ISBN of the product.',
        },
        ItemDimensions: {
            type: GraphQLString,
            description: 'ItemDimensions of the product.',
        },
        Label: {
            type: GraphQLString,
            description: 'Label of the product.',
        },
        Languages: {
            type: GraphQLString,
            description: 'Languages of the product.',
        },
        ListPrice: {
            type: GraphQLString,
            description: 'ListPrice of the product.',
        },
        Manufacturer: {
            type: GraphQLString,
            description: 'Manufacturer of the product.',
        },
        MPN: {
            type: GraphQLString,
            description: 'MPN of the product.',
        },
        NumberOfItems: {
            type: GraphQLString,
            description: 'NumberOfItems of the product.',
        },
        NumberOfPages: {
            type: GraphQLString,
            description: 'NumberOfPages of the product.',
        },
        PackageDimensions: {
            type: GraphQLString,
            description: 'PackageDimensions of the product.',
        },
    })
});
const ItemLinkType = new GraphQLObjectType({
    name: 'ItemLinkType',
    description: 'ItemLinkType',
    fields: () => ({
        Description: {
            type: new GraphQLList(GraphQLString),
            description: 'Description of the link',
        },
        URL: {
            type: new GraphQLList(GraphQLString),
            description: 'URL of the link',
        }
    })
});
const ItemLinksType = new GraphQLObjectType({
    name: 'ItemLinks',
    description: 'ItemLinks',
    fields: () => ({
        ItemLink: {
            type: new GraphQLList(ItemLinkType),
            description: 'The id of the product.',
        }
    })
});


const ProductType = new GraphQLObjectType({
    name: 'Product',
    description: 'Product',
    fields: () => ({
        ASIN: {
            type: new GraphQLList(GraphQLString),
            description: 'The Id of this product\'s company .',
        },
        DetailPageURL: {
            type: new GraphQLList(GraphQLString),
            description: 'The Id of this product\'s company .',
        },
        ItemAttributes: {
            type: new GraphQLList(ItemAttributesType),
            description: 'The Id of this product\'s company .',
        },
        ItemLinks: {
            type: new GraphQLList(ItemLinksType),
            description: 'The Id of this product\'s company .',
        }
    })
});

////// ================================ BOOKS  ============================  //////////////
const BookImageType = new GraphQLObjectType({
    name: 'BookImage',
    description: 'BookImage',
    fields: () => ({
        url: {
            type: GraphQLString,
            description: 'The url of the BookImage.',
        }
    })
});
const BookIndustryIdentifiersType = new GraphQLObjectType({
    name: 'BookIndustryIdentifiers',
    description: 'BookIndustryIdentifiers',
    fields: () => ({
        type: {
            type: GraphQLString,
            description: 'The type of the industry identifier.',
        },
        identifier: {
            type: GraphQLString,
            description: 'The identifier of the industry identifier.',
        }
    })
});
const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'Book',
    fields: () => ({
        id: {
            type: GraphQLString,
            description: 'The id for this book.',
        },
        authors: {
            type: new GraphQLList(GraphQLString),
            description: 'The authors of this book.',
        },
        categories: {
            type: new GraphQLList(GraphQLString),
            description: 'The categories of this book.',
        },
        title: {
            type: GraphQLString,
            description: 'The title of this book.',
        },
        publisher: {
            type: GraphQLString,
            description: 'The publisher of this book.',
        },
        publishedDate: {
            type: GraphQLString,
            description: 'The publishedDate of this book.',
        },
        description: {
            type: GraphQLString,
            description: 'The published date of this book. format YYYY',
        },
        industryIdentifiers: {
            type: new GraphQLList(BookIndustryIdentifiersType),
            description: 'The industry identifiers of this book.',
        },
        pageCount: {
            type: GraphQLString,
            description: 'The pageCount.',
        },
        printType: {
            type: GraphQLString,
            description: 'The printType for this book.',
        },
        maturityRating: {
            type: GraphQLString,
            description: 'The maturity rating for this book.',
        },
        language: {
            type: GraphQLString,
            description: 'The language for this book.',
        },
        link: {
            type: GraphQLString,
            description: 'The link for this book.',
        },
        thumbnail: {
            type: GraphQLString,
            description: 'The thumbnail for this book.',
        },
        images: {
            type: new GraphQLList(BookImageType),
            description: 'Images for this book.',
        },
        price: {
            type: GraphQLString,
            description: 'Price for this book.',
        },
        ISBN: {
            type: GraphQLString,
            description: 'ISBN for this book.',
        }
    })
});

const ProductCategoryType = new GraphQLObjectType({
    name: 'ProductCategory',
    description: 'ProductCategory',
    fields: () => ({
        id: {
            type: GraphQLString,
            description: 'Id of the category.',
        },
        name: {
            type: GraphQLString,
            description: 'Name of the category.',
        },
    })
});
// ASIN:Array(1) ["1976943248"]
// DetailPageURL:Array(1) ["https://www.amazon.com/Your-Trainers-Step-Guide-Tr…"]
// ItemAttributes:Array(1) [Object]
// ItemLinks:Array(1) [Object]

const ProductInputType = new GraphQLInputObjectType({
    name: 'ProductInput',
    description: 'Pennez creator Input',
    fields: () => ({
        _id: {
            type: GraphQLString,
            description: 'The id of the pennez.',
        },
        name: {
            type: GraphQLString,
            description: 'The name of the pennez.',
        },
        companyId: {
            type: GraphQLString,
            description: 'The id of the company that created this pennez.',
        }
    })
});


// end models


exports.schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            product: {
                type: new GraphQLList(BookType),
                args: {
                    _id: {
                        type: GraphQLString
                    },
                    categories: {
                        type: GraphQLString
                    },
                    keywords: {
                        type: GraphQLString
                    },
                    readingLevel: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: async function (self, args, request, fieldASTs) {
                    // logger.trace(`[context request header] - ${(request.headers) ? Object.keys(request.headers) : null}`);
                    // logger.trace(`[context request header authorizaton] - ${(request.headers && request.headers.authorization) ? request.headers.authorization : null}`);

                    // var includeFields = getProjection(fieldASTs);
                    // Use connect method to connect to the server


                    // http://webservices.amazon.com/onca/xml?AWSAccessKeyId=AKIAJRB6PRY4Q3K327WQ&AssociateTag=hivenetwork-20&Keywords=dog&Operation=ItemSearch&ResponseGroup=Images%2CItemAttributes%2COffers&SearchIndex=Books&Service=AWSECommerceService&Timestamp=2018-01-27T15%3A06%3A38.000Z&Signature=YRVckQ54jwPJ4IH6JGiBnRUoNB4IUg0wn5H2HhBNrQo%3D

                    const parentBrowseNodeId = hnAmazon.getBrowseNodeId(args.readingLevel);

                    var amazonProducts = await hnAmazon.findProducts(args.keywords, parentBrowseNodeId);
                    const amazonBooks = await hnAmazon.amazonProductToBook(amazonProducts);
                    // var googleProducts = await hnGoogle.findProducts(args.keywords);

                    // let q = { companyId: args.companyId, };
                    // q.status = { $ne: 'closed' };
                    // // Find some pennezs
                    // const pennezs = await pennezCollection.find(q, includeFields).toArray();
                    return amazonBooks;
                }
            },
            productCategories: {
                type: new GraphQLList(ProductCategoryType),
                args: {
                    readingLevel: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: async function (self, args, request, fieldASTs) {
                    var amazonProductCats = await hnAmazon.findProductCats(args.readingLevel);
                    return amazonProductCats;
                }
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            // createProduct: {
            //     type: ProductType,
            //     args: {
            //         input: {
            //             type: new GraphQLNonNull(ProductInputType)
            //         },
            //     },
            //     resolve: async function (self, args, request, fieldASTs) {
            //         var includeFields = getProjection(fieldASTs);

            //         const product = await pennezCollection.insertOne(args.input);

            //         const resultProduct = await pennezCollection.findOne({ _id: ObjectID(product.insertedId) }, {
            //             fields: includeFields
            //         });
            //         return resultProduct;
            //     }
            // },
            sendContactInfo: {
                type: GraphQLString,
                args: {
                    email: {
                        type: GraphQLString,
                        description: 'The email of the user sending the request',
                    },
                    name: {
                        type: GraphQLString,
                        description: 'The name of the user sending the request',
                    },
                    message: {
                        type: GraphQLString,
                        description: 'message from user',
                    },
                },
                resolve: async function (self, args, request, fieldASTs) {
                    // var includeFields = getProjection(fieldASTs);

                    let body = `<strong> New contact form submission from pennez.com </strong> <br /> <br />`;
                    body += `email: ${args.email} <br />`;
                    body += `name: ${args.name} <br />`;
                    body += `message: ${args.message}  <br />`;

                    hnEmail.send(['pennez@myhive.io'], 'pennez.com contact form', body)


                    return 'ok';
                }
            }
        }
    })
})


// Optional: Export a function to get context from the request. It accepts two
// parameters - headers (lowercased http headers) and secrets (secrets defined
// in secrets section). It must return an object (or a promise resolving to it).
exports.context = function (headers, secrets) {
    return {
        headers,
        secrets,
    };
};

// Optional: Export a root value to be passed during execution
// export const rootValue = {};

// Optional: Export a root function, that returns root to be passed
// during execution, accepting headers and secrets. It can return a
// promise. rootFunction takes precedence over rootValue.
// export function rootFunction(headers, secrets) {
//   return {
//     headers,
//     secrets,
//   };
// };