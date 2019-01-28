
const amazon = require('amazon-product-api');

const client = amazon.createClient({
    awsId: 'AKIAJQK2YMDMKVOWE2IQ',
    awsSecret: "AKIAJQK2YMDMKVOWE2IQ,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",
    awsTag: 'pennez3540-20'
});
module.exports.amazonProductToBook = function (amazonProducts) {
    return new Promise(function (resolve, reject) {

        const books = amazonProducts.map(b => {
            if (!b.ItemAttributes[0].IsAdultProduct || (b.ItemAttributes[0].IsAdultProduct && b.ItemAttributes[0].IsAdultProduct[0] == "0")) {
                return {
                    id: b.ASIN[0],
                    authors: b.ItemAttributes[0].Author,
                    categories: b.ItemAttributes[0].Label,
                    title: b.ItemAttributes[0].Title ? b.ItemAttributes[0].Title[0] : '',
                    publisher: b.ItemAttributes[0].Manufacturer ? b.ItemAttributes[0].Manufacturer[0] : '',
                    publishedDate: b.ItemAttributes[0].ReleaseDate ? b.ItemAttributes[0].ReleaseDate[0] : '',
                    description: b.ItemAttributes[0].Feature ? b.ItemAttributes[0].Feature[0] : '',
                    industryIdentifiers: [{ type: 'ISBN', identifier: b.ItemAttributes[0].ISBN ? b.ItemAttributes[0].ISBN[0] : '' }],
                    ISBN: b.ItemAttributes[0].ISBN ? b.ItemAttributes[0].ISBN[0] : '',
                    pageCount: b.ItemAttributes[0].NumberOfItems ? b.ItemAttributes[0].NumberOfItems[0] : '0',
                    printType: '',
                    maturityRating: '',
                    // language: b.ItemAttributes[0].Languages[0],
                    link: b.DetailPageURL ? b.DetailPageURL[0] : '',
                    thumbnail: b.SmallImage && b.SmallImage[0] && b.SmallImage[0].URL ? b.SmallImage[0].URL[0] : '',
                    images: [{ url: b.LargeImage && b.LargeImage[0].URL ? b.LargeImage[0].URL[0] : '' }],
                    price: b.ItemAttributes[0].ListPrice ? b.ItemAttributes[0].ListPrice[0] : '',
                }
            }
        });

        resolve(books);
    });
}
module.exports.findProducts = function (keywords, browseNode) {

    return new Promise(function (resolve, reject) {

        client.itemSearch({
            Condition: 'All',
            // director: 'Quentin Tarantino',
            // actor: 'Samuel L. Jackson',
            searchIndex: 'Books',
            Keywords: keywords,
            // ItemPage: 2,
            // BrowseNode: '7090642011', // children (all)
            // BrowseNode: '2578998011', // baby (2 )
            BrowseNode: browseNode ? browseNode : 7090642011, // baby (2 )
            responseGroup: 'ItemAttributes,Offers,Images',
            // audienceRating: 'R',
            // responseGroup: 'ItemAttributes,Offers,Images'
        }).then(function (results) {
            // console.log(JSON.stringify(results[0].ItemAttributes));
            var array = Object.keys(results[0].ItemLinks[0].ItemLink);
            array.forEach(element => {
                console.log(element);
            });
            resolve(results);
        }).catch(function (err) {
            console.log(err);
            reject(err);
        });

        // fetch(`http://webservices.amazon.com/onca/xml?AWSAccessKeyId=${AWSAccessKeyId}&AssociateTag=${AssociateTag}&Keywords=${keywords}&Operation=ItemSearch&ResponseGroup=Images%2CItemAttributes%2COffers&SearchIndex=Books&Service=AWSECommerceService&Timestamp=${timestamp}&Signature=YRVckQ54jwPJ4IH6JGiBnRUoNB4IUg0wn5H2HhBNrQo%3D`)
        //     .then((resp) => {
        //         resp.json();
        //     })
        //     .then(function (err, dataResults) {
        //         if (dataResults.errors) {
        //             console.log('dataResults.errors' + JSON.stringify(dataResults.errors));
        //             reject();
        //         }
        //         let products = dataResults.data;
        //         console.log('data - ' + JSON.stringify(products));
        //         resolve(products);
        //     });


    });
}
module.exports.findProductCats = function (grade) {

    return new Promise(function (resolve, reject) {


        client.browseNodeLookup({
            BrowseNodeId: parentBrowseNodeId
        }).then(function (results) {
            let cats = [];

            results[0].Children[0].BrowseNode.forEach(element => {
                const cat = { name: element.Name[0], id: element.BrowseNodeId[0] }
                cats.push(cat);
            });
            resolve(cats);
        }).catch(function (err) {
            console.log(err);
            reject(err);
        });


        // fetch(`http://webservices.amazon.com/onca/xml?AWSAccessKeyId=${AWSAccessKeyId}&AssociateTag=${AssociateTag}&Keywords=${keywords}&Operation=ItemSearch&ResponseGroup=Images%2CItemAttributes%2COffers&SearchIndex=Books&Service=AWSECommerceService&Timestamp=${timestamp}&Signature=YRVckQ54jwPJ4IH6JGiBnRUoNB4IUg0wn5H2HhBNrQo%3D`)
        //     .then((resp) => {
        //         resp.json();
        //     })
        //     .then(function (err, dataResults) {
        //         if (dataResults.errors) {
        //             console.log('dataResults.errors' + JSON.stringify(dataResults.errors));
        //             reject();
        //         }
        //         let products = dataResults.data;
        //         console.log('data - ' + JSON.stringify(products));
        //         resolve(products);
        //     });


    });
}
module.exports.getBrowseNodeId = function (grade) {

    var d = new Date();
    var n = d.getMonth();

    const gradeAge = [
        { min: 0, max: 5, grade: 0 },
        { min: 6, max: 7, grade: 1 },
        { min: 7, max: 8, grade: 2 },
        { min: 8, max: 9, grade: 3 },
        { min: 9, max: 10, grade: 4 },
        { min: 10, max: 11, grade: 5 },
        { min: 11, max: 12, grade: 6 },
        { min: 12, max: 13, grade: 7 },
        { min: 13, max: 14, grade: 8 },
        { min: 14, max: 15, grade: 9 },
        { min: 15, max: 16, grade: 10 },
        { min: 16, max: 17, grade: 11 },
        { min: 17, max: 18, grade: 12 }
    ]

    const ageRange = gradeAge.find(x => x.grade == grade);

    //if its the 2st half of the calendar year use the younger grade(just starting school year). if its the 1st half of the calendar year use the older grade (1st half of calendar year is the last half of school year)
    const age = n > 7 ? ageRange.min : ageRange.max;

    var browseNodeAgeRanges = [
        { min: 0, max: 2, browseNode: 2578998011 },
        { min: 3, max: 5, browseNode: 2578999011 },
        { min: 6, max: 8, browseNode: 2579000011 },
        { min: 9, max: 12, browseNode: 2579001011 },
        { min: 13, max: 21, browseNode: 28 },
    ];

    const browseNodeAgeRange = browseNodeAgeRanges.find(x => age >= x.min && age <= x.max);

    const parentBrowseNodeId = browseNodeAgeRange ? browseNodeAgeRange.browseNode : null;

    return parentBrowseNodeId ? parentBrowseNodeId : '4';// default to 4 the Children's Books cat on amazon

}