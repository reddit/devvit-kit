# PixelPadding

A component that lets you set padding from any side using pixel values.

## Set up

### Step 1: Install the Devvit kit

Open your project folder in the terminal app.

Run `npm install @devvit/kit --save`

### Step 2: Import the `PixelPadding` component

Add the line `import { PixelPadding } from '@devvit/kit';` in the beginning of the component file.

### Step 3: Use PixelPadding in your component

Add `PixelPadding` element to any component in your app, like in example below:

[Interactive Example](https://developers.reddit.com/play#pen/N4IgdghgtgpiBcIQBoQGcBOBjBICWUADgPYYAuABMACIwBudeZAvhQGYbFQUDkAAgBN6jMgHpCAVwBGAGzxYAtBEJ4eAHTAbaDJgDoIAgQGEJaMlwAKxMwBUAnoRgAKYBooVIseLwBy0GDzIbhQYMGBCGN4upjAYAJICzACUFAC8AHxUwe6hZBIYYBRO2e4UADx0ZhBYANYUEHIA5mCwYGSpaiBYYWSxFFB4hjIwnRQA7oNkABapwACMAAwLrFMweI1T7fNLzOklpeUWeAAeMDIWBgJ4YI31MjIdIIuEx6NSxGTmUI8AbAsvnT2hQOILKUyqtQo7wwESMxBkpEeoQEo32IPR7lW602jwATEsASA0RiQRMBNM8QTXkTgSSSVhSGBYgAlAx4UyPWBXCRQTrEunuRrKR5oKANGR82kCkENdYtHqPbptPoDIYjGnSihAzVgiF1KTVGqNTgScJwhEYRV2CCaEDjSYzTqLf7UihYjbtTp-QmibXS3VkQ1Qw3G4im4zwxGdY0wMKjMkUzr4wlutYeyk+v0ksqicGB2pZ0GiI6nc6Xa6NQvuHOVfM1QtJADcwWYGmSzc0nY0MGOJHIFAZYDMFBLZwuhgraSKhE4hDQ3m0Il0ACEEbU4URiEy2hZZ2gyqOyxObrviHP0klvAApADKAA1dABRYatSgZLLAvBsIoAQgAghgGAQHYuh4GgAFAXYTgzmeaC6FgUx4DIAihGAKQAD7oRQP4wXO8GIchqG6MMNzTCkrhSrk+SFGU6TALhcEIUhKFhMwObpB27itp27hftOe74cxREkY00xahQczkSUVEFOUdG6ApDGCYRrHsZxFDccEg7DkxyGrsQkKpBQSm6SxYAANoLAAuupfFOGQDgwMQ36mfpkI-qkRk8MQUgAFYwFgZA8BQmHYa5a41FJlEwHksm0cACm6CZBFmWxvrqZpwLaZQ4UGTUz4wK+U65ZCEBoBQN51gVr7qdlFBgQAEnqxUpW5+Uvj0ugOY4aSebweaGjwtVbsOYEAGrNUZJXtYVnXdTAvVebWg3DUOlBgQAWpNA6tRF1VzY5i28AAXnqQ3BHZP6Nc1ABkN3YeNt33VdaBbXWUUHDJNHyYpAmmahaUcS2GhaSNlCEOWNw2GeU5KeYhAhVhSl2IjxkCeKqNCGwEASDIZDjlcNyrcOEPHo0y4fF8sMCe8nxcKjyMM+j9yYzA2O4-jkONMT4NcwAMmzb5o7BxGC0zIvHOLeEY6FWM43jBMVjzxlc8y2JC0pGDq1LcGS6FSky1hcsc4rRMg1lYMUPDADqQGEI4GCnnOxVnnYTtoE4037W0yAUOZJQ8AmUyBAH7qbCHUo8AMYDWw6EcHFH1wNWm4dBJHYrHLH5LB2nCcZ8n6vx6U3lgLuMBoGgRfuDwoZjFXvDQhE9c8I3sTmqQzdNJsFMwm3kYYM3AgQBgNQ97C-fNwyBQsmypjNwatShuG7cD7nxdd2Qy4hiaZoT2v1dDyPW+LzvEYWkXVlNqDa31WATIYJVhruy7hBu3unu7Xl3tkL7-uR6EdBYhoACPvXgspmivmbkKQgF8r4WxvsaG0Ah-phCnI0GKN4ZwwAMBAWQMAjApVQh-ZibVv7KTMnA9wdVrj30foZeqaAmp1hKAAfnKANSECUFI0NiHQmo7tWC1x+roRB4QUFgDShw+sJRvCPWYVKdwbCKjNS4aBO+vC6wCIoEI1RojkGENUqIZaBY0TeDKKdOsVBEo8IfpovcgjOBjGEXo8RaULGGiBjxAclshBSAkI0Fe1MRbXDQI4QKFA2HAAXkaU+K9vCdAAMRYAAMy+IABydFYN4YAzAOzBC+kUEoAYgyqJtnbB2AiqzsOakHWYpNCaNAFmwFgViFK+P8SvZgvo0TKMsUI-kvSgxhy2PUis0NCCsFUe0gJ-culVPcMAGxfDuLZmMXUYZdSuYUzplASZiVpmdO6Qo8oRi9RVOKZCWp9FVbqz2W0mAfiZkWjmUU3MZzghwNyebeaFU8DHRgBYSWRkAAGAASYAYAeRSFiMwF4wK8ltEOnw7+U4KLuHmt4MwWszZeIYguYQeg2pwT4c-LC4Y2bXBgAIWqBiwDXnvLoAhQlUFkvCBSpk1K2wIp+YeU2jRn5GTRXcGQLDvA3j+QC44CL3DHFFb8-5gL1J2DleKhVUrzborPCqiVirgi0y+NqtV6lhjNMNZK9SWsPRmt1V4kJYSyByvePCbBYAOxfLAHVY2CsuZTh4C6c6nY2CmkCngLc2iMFYJwXgplKkwDENjfSh8MazIhQoOStglKBCXgoLeB839zJWQ-DkGK1EdrMq8YoigEFgKgXAoBYC8aKFojYeI0xftxFWRkX7GybZzZBo9WQUNhQGSv3dk4NAYZsAwDFVVDqPthaED5mBMg3hq12DKDUGAdhnIUEXISiKxK7GwQvPinQZAVwHt0CSvcRaQgltkrhJdZhdDIgkN0JwThqhYF9lgfIqEyApHfEK4tsVCjAdKIlL9oD3CJXHZO7oSU9wsN0OZX9gEeiFsiahv9GHMXwZgIh2CyHsPobaFZLJVBkigPdVxX2OTPnm3Nj2PslAvWUD3WQFAIBAEYDQEOhAcxmBAA)

```typescript jsx
<PixelPadding x="20px" y="10px">
  <hstack borderColor="red"
          height="200px"
          width="200px"
          cornerRadius="medium"
          gap="small"
          alignment="center middle"
  >
    <hstack backgroundColor="cyan" width="100px" height="60px"/>
    <hstack backgroundColor="green" width="20px" height="20px"/>
  </hstack>
</PixelPadding>
```

## Props and values

### `all`

Pixel value for padding on all sides. This can be overridden by more specific padding properties.

### `x`

Pixel value for padding on left and right sides. This can be overridden by more specific padding properties.

### `y`

Pixel value for padding on top and bottom sides. This can be overridden by more specific padding properties.

### `left`

Pixel value for padding on the left side.

### `right`

Pixel value for padding on the right side.

### `top`

Pixel value for padding on the top side.

### `bottom`

Pixel value for padding on the bottom side.

### `inspect`

Enables the inspector mode and highlights the padding applied in green.
