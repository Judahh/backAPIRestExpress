#!/usr/bin/env bash
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

pwd=$PWD

cd "$pwd"

if [ -f ".env" ]; then
  echo ".env exists."
  cat .env | grep -v '#' | grep PORT
  export "$(cat .env | grep -v '#' | grep PORT)"
fi

case $exec in
  "dev")
    echo "Starting dev server"
    (
      cd "$pwd"
      ./node_modules/nodemon/bin/nodemon.js -e ts --exec "npm run build && npm run start"
    )
    ;;

  "build")
    echo "Starting build"
    (
      cd "$pwd"
      npm run --prefix "$pwd" tsc
    )
    ;;

  "")
    echo "Starting"
    if test -f "$file"; then
      (node "$file")
    else
      (node ./node_modules/@backapirest/express/script/simpleServer.mjs -f "$pwd")
    fi
    ;;
esac
