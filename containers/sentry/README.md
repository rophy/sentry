# Customized sentry container

Instead of trying to fork the whole [getsentry/sentry](https://github.com/getsentry/sentry),
a list of git patches is maintained under [patches](patches) directory.

Those patches are applied directly to the upstream sentry container, under path `/usr/local/lib/python3.8/site-packages/sentry/`.

Since patches are sensitive to sentry version, whenever you upgrade sentry image version, be sure to review and update patch files.

## Getting Started

```bash
make help
```
