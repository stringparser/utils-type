
export NODE_ENV=test_types;

TESTS = test/test.*.js

test:
	@./test/run.sh $(TESTS)

.PHONY: test
