
apply:
	helmfile apply

forward:
	sudo -E kubefwd svc -n sentry -f metadata.name=casdoor -f metadata.name=sentry-nginx
