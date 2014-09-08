
TESTS = test/test.*.js

test:
	@NODE_ENV=test NODE_TLS_REJECT_UNAUTHORIZED=0 ./node_modules/.bin/mocha \
		--timeout 5000 \
		--growl \
		$(TESTS)

.PHONY: test
