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
 * test.js in codesearch
 * Created by Damian Perera on 2/22/2018
 *
 */

const codeSearch = require('./index');

if (process.argv.slice(2).length !== 0) {
    codeSearch.token(process.argv.slice(2));
    console.log('Using token: ' + codeSearch.token()[0]);
    codeSearch.search('math.pow', 'javascript', function (result) {
        console.log('Test #1 completed for: ' + result.searchTerm + ' on ' + new Date(result.generatedOn));
        codeSearch.search('setcookie', 'php', function (result) {
            console.log('Test #2 completed for: ' + result.searchTerm + ' on ' + new Date(result.generatedOn));
        });
    });
} else {
    console.error('Token missing, pass your token as an arg to the test command');
}