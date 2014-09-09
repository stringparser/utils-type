#!/bin/sh

# taked from TJ
# https://github.com/visionmedia/commander.js/blob/master/test/run

export NODE_ENV=test

echo
for file in $@; do
  printf "  \033[90m${file#test/}\033[0m\n  --- \n"
  node $file 2> /tmp/stderr && echo "\n  --- \n   \033[36m✔\033[0m all passed"
  code=$?
  if test $code -ne 0; then
    echo "\n  --- \n\033[31m   ✖ fail!\033[0m"
    cat /tmp/stderr >&2
    exit $code
  fi
done
echo
