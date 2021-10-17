# Vocya - vocabulary shop

Front-end for the vocjem data; dashboard and API.

## API

The API uses python3 and flask to host the API server.
The API returns a (potentially empty) list of results in JSON format.
The current API endpoint can be reached at: https://api.vocya.hetorus.nl/.

### Example queries

Query all words  
https://api.vocya.hetorus.nl/words  
Query words with id='2'  
https://api.vocya.hetorus.nl/word/id/2  
Query words with chapter='1'  
https://api.vocya.hetorus.nl/word/chapter/1  
Query words with wildcard search query='ho' (matching any value in the returned JSON)  
https://api.vocya.hetorus.nl/search/word/*/ho  
Query words with search in romaji/dutch fields with query='ho'  
https://api.vocya.hetorus.nl/search/word/romaji,dutch/ho

## Dashboard

The front-end dashboard of vocya showing the results of the API calls to the vocya API.
By default 'live search' is enabled, and every keystroke sends a 'search' API call and shows the results.
When 'live search' is disabled by clicking on the button, a manual search button is enabled to send the 'search' API call when clicked.
When clicking on the results, a single result page is opened where the 'raw properties' are shown.
'Search only in romaji/Dutch' is enabled by default.
If this is enabled, only the 'romaji' and 'dutch' fields are searched instead of every field (including id, chapter, chapter_name, etc) by issuing a wildcard search.
The current dashboard is hosted at: https://vocya.hetorus.nl

## Scripts

### Run the development server

run the following command to run the dev server:  
`yarn start`  
this starts the development server on `localhost:3000`

### Run a build (without incrementing version number)

run the following command to build the application:  
`yarn build`  
this updates the version number (if changed in `package.json`) and builds the application

### Run a build with version increment and git commit creation

the Semantic Versioning, also known as "semver", is used:  
version: `major.minor.patch`  
run one of the following commands:  
`yarn release-patch` // increments the `patch` number of the version  
`yarn release-minor` // increments the `minor` number of the version  
`yarn release-major` // increments the `major` number of the version  
all these three commands also create a git commit and git tag with the message:  
`v${npm_package_version}` (which is the major.minor.patch version)  
these three commands also perform a push to the master branch on github and push the tags

### Deploy the newly generated version to the server

run the following command to deploy the new version:  
`yarn deploy`  
this removes the previous build from the server and copies the build to the server
