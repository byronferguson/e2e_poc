#!/usr/bin/env sh
# $0 is a script name
# $1, $2, $3 etc are passed arguments
# $1 is our command
CMD=$1

case "$CMD" in
    "dev" )
    export NODE_ENV=development
    exec nodemon -L dist/server.js
    ;;
    "start" )
    export NODE_ENV=production
    exec node dist/main.js
    ;;
esac
