FROM bigblueswimschool/alpine-node

ARG NPM_TOKEN

ENV APP=/usr/app/

WORKDIR $APP

COPY . $APP

RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" >> .npmrc
RUN yarn
RUN yarn build

ENTRYPOINT ["./entrypoint.sh"]
CMD ["start"]
