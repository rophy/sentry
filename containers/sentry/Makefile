default: help

.PHONY: help
help: ## Show this help.
	@grep -E '^[a-z.A-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: build

build: ## Build container image.
	docker-compose build

up:	## Run up dev container.
	docker-compose up -d

shell: ## Shell into dev container.
	docker-compose exec app bash

down: ## Tear down dev container.
	docker-compose down
