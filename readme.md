# Devvit-kit

Devvit Kit is a helper library that makes it easier to build [Devvit apps](https://developers.reddit.com),
or apps on Reddit’s developer platform.
Kit includes both UI components and general backend patterns that simplifies common tasks and enables developers to
build apps faster.

## Installation

To use Kit, navigate to your devvit project in your terminal and install the package:

`npm install @devvit/kit`

## Usage

Once you have Kit installed, you can import the helper you’re trying to use and then use it in applicable pieces of
code. This is an example using the Columns helper.

```typescript jsx
import {Columns} from '@devvit/kit'
import {Devvit} from '@devvit/public-api'

Devvit.addCustomPostType({
    name: 'Columns static content',
    render: () => {
        return (
            <vstack padding="medium">
                <Columns columnCount={2} gapX="5px" gapY="10px" order="column">
                    {/* columns children here */}
                </Columns>
            </vstack>
        );
    }
});
```

| Component Name    | Description                                                                                                       | Links                                                  |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Columns           | A component that provides a simple column layout and optionally allows you to specify gap sizing between elements | [Usage Instructions](./src/columns/readme.md)          |
| Item pagination   | A helper that enables pagination of data including UI elements for navigating through the elements                | [Usage Instructions](./src/item-pagination/readme.md)  |
| PixelPadding      | A component that lets you set padding from any side using pixel values.                                           | [Usage Instructions](./src/pixel-padding/readme.md)    |
| Developer toolbar | Adds a toolbar of actions only visible to developers.                                                             | [Usage Instructions](./src/dev-toolbar/readme.md)      |
| Watermark         | Adds a Developer Platform watermark.                                                                              | [Usage Instructions](./src/devvit-watermark/readme.md) |

## Contributing to the devvit-kit public repo

Reddit has a number of open source projects that developers are invited to contribute to in our GitHub repo.
There's a [public issue board](https://github.com/reddit/devvit-kit/issues) that tracks feature requests and bugs.
All feedback is welcome!

If you'd like to contribute to this repo as developer, you can find detailed instructions
in [contributing.md](contributing.md)

## Contributor License Agreement

The first time you submit a pull request (PR) to a Reddit
project, [you should complete our CLA](https://docs.google.com/forms/d/e/1FAIpQLScG6Bf3yqS05yWV0pbh5Q60AsaXP2mw35_i7ZA19_7jWNJKsg/viewform).
We cannot accept PRs from GitHub users that have not agreed to the CLA.
Note that this agreement applies to all open source Reddit projects, and you only need to submit it once.

[Submit your CLA here](https://docs.google.com/forms/d/e/1FAIpQLScG6Bf3yqS05yWV0pbh5Q60AsaXP2mw35_i7ZA19_7jWNJKsg/viewform?usp=sf_link).

## Bugs and requests

Most of our outstanding bugs and user requests are [visible here](https://github.com/reddit/devvit-kit/issues).
These are a combination of synced issues from our internal system and user contributions made directly in GitHub.
We do our best to keep this up to date with internal progress of bugs and issues.
Before adding an issue to the board, please search for a similar or duplicate issue.
You can always comment or react to issues you’d like to see prioritized.

## Filing a new issue

Please use one of these labels when submitting a new issue:

- bug
- documentation
- enhancement

Once issues are added to our internal tracking system, they will be labeled as “synced”.

## Security issues

Security issues take special priority and are handled separately from our public tracker
via [Hackerone](https://www.hackerone.com/).
Please do not submit security issues here on GitHub, as all issues are public and publishing them increases the risk of
abuse.

## How to make a pull request

Please follow instructions in [contributing.md](contributing.md)
