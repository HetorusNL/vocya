FROM node:16-bookworm AS builder

# add the dashboard files to the docker
COPY dashboard/ /code

# build the project
RUN cd /code && \
    corepack enable && \
    yarn set version stable && \
    yarn install && \
    yarn build

# use the caddy image as base to host the dashboard website
FROM caddy

# add the built website to the caddy srv/ directory
COPY --from=builder /code/build /srv/dashboard
# add the Caddyfile for the dashboard
COPY gha/Caddyfile /etc/caddy/Caddyfile

# add/update the container labels
LABEL org.label-schema.vcs-ref=$VCS_REF
LABEL org.label-schema.vcs-url=https://github.com/HetorusNL/vocya
LABEL org.opencontainers.image.authors=tim@hetorus.nl
LABEL org.opencontainers.image.source=https://github.com/HetorusNL/vocya
LABEL org.opencontainers.image.description="Vocya Dashboard for learning Japanese words"
LABEL org.opencontainers.image.licenses=MIT
