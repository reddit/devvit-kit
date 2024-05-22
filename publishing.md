# Publishing

Instructions for repository owners

```bash
# Checkout the latest main branch.
git checkout main && git pull

# Version (patch, minor, or major), build, and test a release.
VERSION_TYPE=patch tools/publish-stable.bash

# Click "generate release notes"
open https://github.com/reddit/devvit-kit/releases/new
```
