FROM node:alpine

ADD . /webhook

ENTRYPOINT ["node"]
CMD ["/webhook/index.js"]
