
apply:
	helmfile apply

forward:
	sudo -E kubefwd svc -n sentry -l "app.kubernetes.io/name in (nginx,casdoor)"
