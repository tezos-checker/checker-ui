# Demo Homepage
#
# Multi-stage build that:
#   - creates a production build of the frontend
#   - serves the build with nginx
#
# Required ARG variables:
#   - PUBLIC_URL
#   - REACT_APP_ENV ("local", "integration", "development", "production")
#
# Optional ARG variables:
#   - REACT_APP_EXAMPLE_URL
#

## Stage 1: install dependencies and copy files
FROM node:12.19.1-alpine3.12@sha256:3ae30348acd445501758896f691106cbc32111f3525651c7256a7df75aa8a97d AS base
WORKDIR /usr/src/app
COPY web/package.json /usr/src/app/package.json
COPY web/yarn.lock /usr/src/app/yarn.lock
RUN yarn install --frozen-lockfile --silent
COPY web/craco.config.js /usr/src/app/craco.config.js
COPY web/.eslintrc.js /usr/src/app/.eslintrc.js
COPY web/.eslintignore /usr/src/app/.eslintignore
COPY web/.prettierrc /usr/src/app/.prettierrc
COPY web/.prettierignore /usr/src/app/.prettierignore
COPY web/public /usr/src/app/public
COPY web/src /usr/src/app/src
COPY web/tsconfig* /usr/src/app/
ARG PUBLIC_URL
ARG REACT_APP_ENV
ARG REACT_APP_EXAMPLE_URL
RUN yarn build

# Stage 2: run caddy
FROM abiosoft/caddy:1.0.0-no-stats as caddy
ARG PROJECT_DIR
COPY --from=base /usr/src/app/build /srv
COPY web/Caddyfile /etc/Caddyfile

EXPOSE 80

