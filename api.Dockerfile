FROM hetorusnl/python-poetry

# add the api python files to the docker
COPY api/ /code

# add/update the container labels
LABEL org.label-schema.vcs-ref=$VCS_REF
LABEL org.label-schema.vcs-url=https://github.com/HetorusNL/vocya
LABEL org.opencontainers.image.authors=tim@hetorus.nl
LABEL org.opencontainers.image.source=https://github.com/HetorusNL/vocya
LABEL org.opencontainers.image.description="Vocya API for learning Japanese words"
LABEL org.opencontainers.image.licenses=MIT
