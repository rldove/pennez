
var books = require('google-books-search');
var fetch = require('node-fetch');
const { URL } = require('url');
// var URL = require('url-search-params');

module.exports.findProducts = function (keywords) {

    return new Promise(function (resolve, reject) {

        // var options = {
        //     key: "AIzaSyB-TKF7wHGZqJnQKYXrubnPGOl48-6oGWs",
        //     // field: 'title',
        //     // offset: 0,
        //     // limit: 40,
        //     type: 'books',
        //     order: 'relevance',
        //     lang: 'en',
        //     projection: 'full',
        //     maxAllowedMaturityRating: 'not-mature'
        // };

        // books.search(keywords, options, function (error, results, apiResponse) {

        //     var array = Object.keys(results[0]);
        //     array.forEach(element => {
        //         console.log(element);
        //     });
        //     if (!error) {
        //         console.log(results);
        //         resolve(results);
        //     } else {
        //         console.log(error);
        //         reject(error);
        //     }
        // });
        let url = new URL("https://www.googleapis.com/books/v1/volumes/");

        const params = {
            // key: "AIzaSyB-TKF7wHGZqJnQKYXrubnPGOl48-6oGWs",
            // field: 'title',
            // offset: 0,
            maxResults: 40,
            type: 'books',
            order: 'relevance',
            lang: 'en',
            projection: 'full',
            maxAllowedMaturityRating: 'not-mature',
            q: keywords
        };

        const headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        fetch(url.href, headers)
            .then((resp) => resp.json())
            .then(function (dataResults) {
                if (dataResults.errors) {
                    console.log('dataResults.errors' + JSON.stringify(dataResults.errors));
                    reject();
                }
                // console.log('data - ' + JSON.stringify(books));
                resolve(dataResults);
            });




    });
}