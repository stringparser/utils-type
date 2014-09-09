
export NODE_ENV=test;

TESTS = test/test.*.js

test:
	@./test/run.sh $(TESTS)

.PHONY: test
