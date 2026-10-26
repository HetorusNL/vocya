FROM python:3.14-alpine

RUN \
    # mount uv as it doesn't need to be baked into the image
    --mount=from=ghcr.io/astral-sh/uv,source=/uv,target=/bin/uv \
    # add the src code to be moved into the src/ directory
    --mount=type=bind,source=api/,target=src-mount/,rw \
    \
    # make the script crash on errors and such
    set -eou; \
    \
    # use the system python, as we don't need a venv in the image
    export UV_PROJECT_ENVIRONMENT=/usr/local; \
    export UV_NO_EDITABLE=1; \
    # install the dependencies
    cd /src-mount; \
    uv sync --no-dev; \
    \
    # make the src/ directory and move everything there
    cd /; \
    mkdir -p /src/; \
    mv src-mount/*.py /src/;

# add/update the container labels
ARG VCS_REF
LABEL org.label-schema.vcs-ref=$VCS_REF
LABEL org.label-schema.vcs-url=https://github.com/HetorusNL/vocya
LABEL org.opencontainers.image.authors=tim@hetorus.nl
LABEL org.opencontainers.image.source=https://github.com/HetorusNL/vocya
LABEL org.opencontainers.image.description="Vocya API for learning Japanese words"
LABEL org.opencontainers.image.licenses=MIT

# set the working directory to /src where the python code resides
WORKDIR /src

# the flask development server running as PID 1 ignores SIGTERM, stop it with SIGINT (ctrl+c) instead
STOPSIGNAL SIGINT

ENTRYPOINT ["python3", "main.py"]
