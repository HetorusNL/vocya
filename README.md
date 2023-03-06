# Vocya - vocabulary shop

Front-end for the vocjem data; dashboard and API.

## API

The API uses python3 and flask to host the API server.
The API returns a (potentially empty) list of results in JSON format.
The current API endpoint can be reached at: https://api.vocya.hetorus.nl/.

### Running the API

Install poetry: https://python-poetry.org/docs/

Ensure poetry works by running:  
`poetry --version`  
Otherwise ensure that the location poetry is installed in, is added to the path.

Configure poetry to create the virtualenvs in the project folder:  
`poetry config virtualenvs.in-project true`

Install the required dependencies:  
`cd api`  
`poetry install`

Modify the path to the VocJEM database file in `database_file` in `api.py`, if that repository is stored in a different location.

Run the API  
`cd api`  
`poetry run python3 api.py`

### Example queries

Query all words  
https://api.vocya.hetorus.nl/words  
Query words with id='jem1-2'  
https://api.vocya.hetorus.nl/word/jem1-2  
Query words with chapter='jem1-1'  
https://api.vocya.hetorus.nl/chapter/jem1-1/words  
Query words with course='jem1' chapter='jem1-1' and id='jem1-1'  
https://api.vocya.hetorus.nl/course/jem1/chapter/jem1-1/word/jem1-1  
Searching is no longer supported on the API side, searching within returned words for a course/chapter/all should be performed client-side.

## Dashboard

The front-end dashboard of vocya showing the results of the API calls to the vocya API.
By default 'live search' is enabled, and every keystroke sends a 'search' API call and shows the results.
When 'live search' is disabled by clicking on the button, a manual search button is enabled to send the 'search' API call when clicked.
When clicking on the results, a single result page is opened where the 'raw properties' are shown.
'Search only in dutch/hiragana/nihongo/romaji' is enabled by default.
If this is enabled, only these specific fields (equivalent fields for courses and chapters) are searched instead of every field (including id, chapter, chapter_name, etc) by issuing a 'wildcard search'.
The current dashboard is hosted at: https://vocya.hetorus.nl

### Configuring yarn

```bash
# if any of the below commands fail on permission errors, prefix them with sudo

# remove yarn is previously present on the system
sudo apt remove yarn

# make sure that node.js >= 16.10 is installed

# enable corepack
corepack enable

# updating the global yarn version
corepack prepare yarn@stable --activate

# initialize yarn
yarn init -2

# update to the latest version
yarn set version stable
```

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
