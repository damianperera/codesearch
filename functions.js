/*
 *
 * Copyright 2018 Damian Perera
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * functions.js in codesearch
 * Created by Damian Perera on 2/22/2018
 *
 */

const
    request = require('request'),
    userAgent = 'codesearch',
    apiUrl = 'https://api.github.com/search/code';
let
    apiToken = '',
    resultJSON = {};

function setToken(token) {
    if (token === undefined)
        return apiToken;
    else
        apiToken = token;
}

function getSearch(term, language, callback) {
    resultJSON = {
        searchTerm: term,
        searchLanguage: language,
        generatedBy: userAgent,
        generatedOn: new Date().toJSON(),
        searchResults: []
    };
    request({
        url: apiUrl, method: 'GET',
        qs: {q: term, in: 'file', language: language, fork: true, archived: true},
        headers: {'Authorization': 'token ' + apiToken, 'User-Agent': userAgent}
    }, function (err, res, body) {
        if (!err)
            getRawText(term, language, JSON.parse(body).items, callback);
        else
            console.log(err);
    });
}

function getRawText(term, language, items, callback) {
    items.forEach(function (item, index) {
        item.html_url = item.html_url.replace('github.com', 'raw.githubusercontent.com');
        item.html_url = item.html_url.replace('/blob', '');
        request({
            url: item.html_url,
            headers: {'User-Agent': userAgent}
        }, function (err, res, body) {
            if (!err)
                buildJSON(term, language, item.score, item.repository.owner.login, body, index, items, callback);
            else {
                console.log(err);
            }
        });
    });
}

function buildJSON(term, language, score, author, result, index, array, callback) {
    resultJSON.searchResults.push({
        similarityScore: score,
        codeAuthor: author,
        codeSnippet: result
    });
    if (resultJSON.searchResults.length === array.length)
        callback(resultJSON);
}

module.exports = {
    search: getSearch,
    token: setToken
};