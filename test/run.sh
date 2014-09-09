#!/bin/sh

# taked from TJ
# https://github.com/visionmedia/commander.js/blob/master/test/run

export NODE_ENV=test

echo
for file in $@; do
  printf "\033[90m   ${file#test/}\033[0m \n"
  node $file 2> /tmp/stderr && echo "   -- \n   \033[90mall passed\033[0m \033[36m✓\033[0m"
  code=$?
  if test $code -ne 0; then
    echo "\033[31m   ✖ fail!\033[0m"
    cat /tmp/stderr >&2
    exit $code
  fi
done
echo
