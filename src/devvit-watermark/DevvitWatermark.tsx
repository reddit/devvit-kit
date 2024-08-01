import { Devvit } from "@devvit/public-api";

/**
 * appName - the app name that is specified in devvit.yaml.
 * developer - username of the app creator
 */
export type WatermarkProps = { appName: string; developer: string };

/**
 * A component that appends the watermark to the container it is wrapped around
 * @param appName - the app name that is specified in devvit.yaml
 * @param developer - username of the app creator
 */
export const DevvitWatermarkWrapper: Devvit.BlockComponent<WatermarkProps> = (
  props,
) => {
  return (
    <vstack height={100} width={100}>
      <vstack grow width={100}>
        {props.children}
      </vstack>
      <DevvitWatermark appName={props.appName} developer={props.developer} />
    </vstack>
  );
};

/**
 * A component that places the watermark over the container it is wrapped around
 * @param appName - the app name that is specified in devvit.yaml
 * @param developer - username of the app creator
 */
export const DevvitWatermarkOverlay: Devvit.BlockComponent<WatermarkProps> = (
  props,
) => {
  return (
    <zstack height={100} width={100} alignment="bottom center">
      <vstack height={100} width={100}>
        {props.children}
      </vstack>
      <DevvitWatermark appName={props.appName} developer={props.developer} />
    </zstack>
  );
};

/**
 * A watermark component. Renders Devvit logo, link to the author profile page and link to the app details
 * @param appName - the app name that is specified in devvit.yaml
 * @param developer - username of the app creator
 */
const DevvitWatermark: Devvit.BlockComponent<WatermarkProps> = (
  props,
  context,
) => {
  const is1stPartyApp = props.developer === "Reddit";

  return (
    <vstack
      darkBackgroundColor="#04090A"
      lightBackgroundColor="#F5F5F5"
      height="32px"
      width={100}
    >
      <hstack height={"1px"} grow darkBackgroundColor="#FFFFFF1A"></hstack>
      <hstack height={100}>
        <spacer size="small" />
        <hstack gap="small" grow alignment="start middle">
          <DevvitLogo />
          <hstack>
            <hstack alignment="start middle">
              <text
                size="small"
                darkColor="#B8C5C9"
                lightColor="#000"
                selectable={false}
              >
                {is1stPartyApp ? "Built on" : "Built by"}
              </text>
              <text selectable={false}>&nbsp;</text>
              <vstack
                onPress={() =>
                  context.ui.navigateTo(
                    is1stPartyApp
                      ? `https://developers.reddit.com?utm_medium=watermark&utm_source=${props.appName}`
                      : `https://www.reddit.com/user/${props.developer}/`,
                  )
                }
              >
                <text
                  size="small"
                  darkColor="#B8C5C9"
                  lightColor="#000"
                  selectable={false}
                >
                  {is1stPartyApp ? "DevPlatform" : props.developer}
                </text>
                <hstack height={"1px"} backgroundColor="#B8C5C9"></hstack>
              </vstack>
            </hstack>
          </hstack>
        </hstack>
        <hstack>
          <vstack
            onPress={() =>
              context.ui.navigateTo(
                `https://developers.reddit.com/apps/${props.appName}`,
              )
            }
            alignment="middle"
          >
            <text
              size="small"
              darkColor="#B8C5C9"
              lightColor="#000"
              selectable={false}
            >
              Details
            </text>
            <hstack height={"1px"} backgroundColor="#B8C5C9"></hstack>
          </vstack>
        </hstack>
        <spacer size="small" />
      </hstack>
    </vstack>
  );
};

function DevvitLogo(): JSX.Element {
  return (
    <image
      imageHeight={14}
      imageWidth={14}
      url={"https://i.redd.it/llj3dnlz1ufd1.png"}
    />
  );
}
