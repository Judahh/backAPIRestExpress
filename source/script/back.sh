#! /bin/bash
while getopts p:db flag; do
  case "$flag" in
    p) port=$OPTARG ;;
    d) exec="dev" ;;
    b) exec="build" ;;
  esac
done

dist="${npm_package_config_path_dist:-.}"
server="${npm_package_config_path_server:-source/server.js}"
file=$dist/$server

echo "Starting server... (port: $port) (dist: $dist) (server: $server) (exec: $exec)"
case $exec in
  "dev")
    ./node_modules/nodemon/bin/nodemon.js -e ts --exec \"npm run build && npm run start\"
    ;;

  "build")
    npm run build
    ;;

  *)
    if test -f "$file"; then
        node $file
    else
        npm run simpleServer
    fi;;
esac