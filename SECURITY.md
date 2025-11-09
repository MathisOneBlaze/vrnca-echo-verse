# Security Policy

- Do not commit secrets. Use environment variables and .env files locally only.
- .env files are ignored by Git; provide .env.example templates instead.
- Rotate any API keys that were ever exposed publicly.
- Enable GitHub Secret Scanning and Push Protection.
- Use read-only API scopes when possible.
- Never log secrets; scrub sensitive values in logs.

## Reporting
If you discover a vulnerability or secret exposure, report privately to the maintainer and rotate keys immediately.
