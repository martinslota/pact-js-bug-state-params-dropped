# Pact JS Bug: State parameters get dropped

Minimal example of a bug in pact-js: the `v3` provider drops state params in `v2` pact file.

## Steps to reproduce

```sh
npm ci
npm test
cat pacts/*.json
```
