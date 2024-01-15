# sentry

sentry.io demo deployment

## Requirements

- a k8s cluster and kubectl
- [helm](https://github.com/helm/helm)
- [helmfile](https://github.com/helmfile/helmfile)

## Getting Started


```bash
> helmfile apply

# Wait until helm ready, will take a couple minutes

> kubectl port-forward svc/sentry-web 9000:9000

# Open browser and load localhost:9000

```

