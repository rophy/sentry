# https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help
help:			## This help command.
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

apply:			## Install sentry
	helmfile apply

forward:		## Expose various sentry web interfaces via kubefwd.
	sudo -E kubefwd svc -n sentry -l "app.kubernetes.io/name in (nginx,casdoor)"


prereq:			## Install pre-requisites tools in your machine.
	@scripts/install-cli.sh


clean:			## Remove the whole sentry namespace.
	kubectl delete namespace sentry

