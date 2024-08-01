# Devvit watermark

A watermark indicates that your app was built on Developer Platform.

<img src="https://i.redd.it/cdnom5lo41gd1.png" alt="Usage example: 'Built by kebakark. Details'">

You can add a watermark to your app in one of two ways:

- `DevvitWatermarkWrapper` appends the watermark to the container it is wrapped around. This reduces the space available in the container, but the watermark does not overlap with the content.
- `DevvitWatermarkOverlay` places the watermark over the container it is wrapped around. This does not reduce the space available in the container, and the watermark overlaps with the content.

## How to use

### Step 1: Install Devvit Kit

Open your project folder in the terminal app.

Run `npm install @devvit/kit --save`

### Step 2: Import the `DevvitWatermarkWrapper` or `DevvitWatermarkOverlay` component

Add the line `import { DevvitWatermarkWrapper } from '@devvit/kit';` in the beginning of the component file.

### Step 3: Use the watermark in your app

Wrap the `DevToolbarWrapper` around the top element of your root component, like this:

```typescript jsx
return (
    <DevvitWatermarkWrapper appName="my-cool-app" developer="username">
        <hstack width={100} height={100}>
          ...
        </hstack>
    </DevvitWatermarkWrapper>
);
```

Make sure that `appName` matches the `name` in the `devvit.yaml` in your project folder and `developer` matches your Reddit username
