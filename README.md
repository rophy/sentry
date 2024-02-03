# sentry

sentry.io demo deployment

## Requirements

- a k8s cluster and kubectl
- [helm](https://github.com/helm/helm)
- [helmfile](https://github.com/helmfile/helmfile)
- [kubefwd](https://github.com/txn2/kubefwd)

## Getting Started


```bash
> helmfile apply

# Wait until helm ready, will take a couple minutes

> sudo -E kubefwd svc -n sentry -l "app.kubernetes.io/name in (nginx,casdoor)"

```

- sentry web: http://sentry-nginx/, login with `admin@sentry.local / aaaa`
- casdoor web: http://casdoor:8000/, login with `admin / 123`

Login to sentry web and enable `casdoor` oidc.

Casdoor have 2 extra users for testing oidc integrations:
  - `user-1 / aaaa123`
  - `user-2 / aaaa123`

