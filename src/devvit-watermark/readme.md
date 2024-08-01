# Devvit Watermark

A watermark component that helps to distinguish your app as one that is built on Developer Platform. 

<img src="https://i.redd.it/cdnom5lo41gd1.png" alt="Usage example: 'Built by kebakark. Details'">

Served in two options
 - `DevvitWatermarkWrapper` - appends the watermark to the container it is wrapped around. Reduces the space available in the container, but does not overlap with the content. 
 - `DevvitWatermarkOverlay` - places the watermark over the container it is wrapped around. Does not reduce the space available in the container, but overlaps with the content.

## How to use

### Step 1: Install the Devvit kit

Open your project folder in the terminal app.

Run `npm install @devvit/kit --save`

### Step 2: Import the `DevvitWatermarkWrapper` or `DevvitWatermarkOverlay` component

Add the line `import { DevvitWatermarkWrapper } from '@devvit/kit';` in the beginning of the component file.

### Step 3: Use Watermark in your app

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