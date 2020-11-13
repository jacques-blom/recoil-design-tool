CI=true yarn test -- --coverage >/dev/null 2>&1
./node_modules/.bin/istanbul report --include coverage/coverage-final.json text > coverage.txt
node coverage.js