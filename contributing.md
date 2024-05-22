## How to make a pull request

Make sure to fork the repository and create a new branch when making changes to a project.
Full instructions on setting up dependencies from your branch off our monorepo are detailed below.
If you need to brush up on the process of creating a PR, [learn more here](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project).

## Best Practices

- Keep PRs small and as specific to a feature or file as possible
- Review the code structure and patterns prior to making changes
- Keep your contributions consistent with the existing codebase
- Consider where to add helpful in-line comments or sample code
- Use langauge that is clear, concice, and simple

## When changes are reviewed

We'll try to review your PR as soon as possible within one business week of submission.
Small changes or updates to our documentation will be reviewed faster than new features.
Please note that all not PRs will be accepted and review times may vary.

## Development

This is a library package, so there is no local development environment.

You can test the components and helpers with unit-tests, in [Play](https://developers.reddit.com/play) and in the Devvit app.

Instructions below assume that you have Node.js installed.

It is recommended to have `nvm` and run `nvm use` before you start.

### Installing dependencies

```bash
npm run install:npmjs
```

### Unit Tests

This project uses Vitest for testing.

See [Getting Started instructions](https://vitest.dev/guide/#writing-tests) and check out existing tests to learn how to write unit tests for this project.

To run tests, execute this command the `devvit-kit` root directory

```bash
npm test
```

### Testing in Play

1. Open the [empty example](https://developers.reddit.com/play#pen/N4IgdghgtgpiBcIQBoQGcBOBjBICWUADgPYYAuABMACIwBudeZAvhQGYbFQUDkAAgBN6jMgHpCAVwBGAGzxYAtBEJ4eAHTAbaDJgDoIAgQGEJaMlwAKxMwBUAnoRgAKYBooVIseLwBy0GDzIbhQYMGBCGN4A+ljEYGQwAB6UALwAfFTB7qFkEhhgFE5Z7hQAPLLEWADWaGnF7qWiFdW1xQCUwcwazB2aYKIAVBQWEGYwFHbEeRQAFjAyjhgUsUIUUvPEAO4UA6IaGoPDowkTU0tzCzBLK+MQUsR047v7YEkk5BRCbBASMpTaIhQIEeGDQeDiCAAjMwgA) in Play
2. Paste the source code of your helper or component between the `Paste your code` markers
3. Update the `render` function to use the helper
4. Make sure things work the way they are supposed to

### Testing in Devvit app

To test the helper or component in Devvit app you need to link the `@devvit/kit` to your local version of devvit-kit

1. In your devvit app project folder run `npm install`
2. Run `npm link ~/path/to/devvit-kit` (make sure to replace with actual path to devvit-kit folder)
3. Import the helper or component in your app with `import {YourComponent} from '@devvit-kit';` as usual
4. Test your app with `devvit playtest` and make sure everything works fine
5. When finished, you can unlink the local `devvit-kit` by running `npm install` again
