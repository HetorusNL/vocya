# Vocya - vocabulary shop

'Vocabulary shop' to view, search and study Japanese words.  
This is a front-end for the [VocJEM](https://github.com/HetorusNL/vocjem) data; dashboard and API.  
Both the dashboard and API are available as docker containers:

- https://hub.docker.com/r/hetorusnl/vocya-api
- https://hub.docker.com/r/hetorusnl/vocya-dashboard

## API

The API uses python3 and flask to host the API server.
The API returns a (potentially empty) list of results in JSON format.
The current API endpoint can be reached at: https://api.vocya.hetorus.nl/.

### Running the API

Either run the API using the docker container mentioned above, or manually using the steps below.

#### Installing poetry

Install poetry: https://python-poetry.org/docs/

Ensure poetry works by running:  
`poetry --version`  
Otherwise ensure that the location poetry is installed in, is added to the path.

Configure poetry to create the virtualenvs in the project folder:  
`poetry config virtualenvs.in-project true`

#### Running the API

```bash
# go to the api directory
cd api

# install the required dependencies
poetry install

# run the API
poetry run python3 main.py
```

### Example queries

_Make sure to change the `api.vocya.hetorus.nl` domain name when running the API locally_

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

The front-end dashboard of Vocya showing the results of the API calls to the Vocya API.
By default 'live search' is enabled, and every keystroke sends a 'search' API call and shows the results.
When 'live search' is disabled by clicking on the button, a manual search button is enabled to send the 'search' API call when clicked.
When clicking on the results, a single result page is opened where the 'raw properties' are shown.
'Search only in dutch/hiragana/nihongo/romaji' is enabled by default.
If this is enabled, only these specific fields (equivalent fields for courses and chapters) are searched instead of every field (including id, chapter, chapter_name, etc) by issuing a 'wildcard search'.
The current dashboard is hosted at: https://vocya.hetorus.nl

### Running the Dashboard

Either run the Dashboard using the docker container mentioned above, or manually using the steps/scripts below.

### Configuring yarn

```bash
# if any of the below commands fail on permission errors, prefix them with sudo

# remove yarn is previously present on the system
sudo apt remove yarn

# make sure that node.js >= 16.10 is installed

# enable corepack
corepack enable

# update to the latest version
yarn set version stable

# install the dependencies of the project
yarn install
```

## Scripts

### Run the development server

Run the following command to run the dev server:  
`yarn start`  
This starts the development server on `localhost:3000`

### Run a build (without incrementing version number)

Run the following command to build the application:  
`yarn build`  
This updates the version number (if changed in `package.json`) and builds the application

### Increment the version number of Vocya

The Semantic Versioning, also known as "semver", is used:  
Version: `major.minor.patch`  
Run one of the following commands:  
`yarn release-patch` // increments the `patch` number of the version  
`yarn release-minor` // increments the `minor` number of the version  
`yarn release-major` // increments the `major` number of the version

After these commands are executed, make sure to create a tag with matching version number (e.g. matching `v${npm_package_version}`), and push this to the repository, e.g:  
`git tag -a vX.Y.Z -m "vX.Y.Z"`  
`git push --tags`  
This causes the CI/CD to create a tagged docker image for both the API and the dashboard with this version number.

## License

MIT License, Copyright (c) 2023 Tim Klein Nijenhuis <tim@hetorus.nl>
