import { Devvit } from "@devvit/public-api";
import type { BlockElement } from "@devvit/public-api/devvit/Devvit.js";

type PixelPaddingProps = {
  /**
   * Pixel value for padding on all sides. This can be overridden by more specific padding properties.
   */
  all?: SizePx;
  /**
   * Pixel value for padding on left and right sides. This can be overridden by more specific padding properties.
   */
  x?: SizePx;
  /**
   * Pixel value for padding on top and bottom sides. This can be overridden by more specific padding properties.
   */
  y?: SizePx;
  /**
   * Pixel value for padding on the top side.
   */
  top?: SizePx;
  /**
   * Pixel value for padding on the bottom side.
   */
  bottom?: SizePx;
  /**
   * Pixel value for padding on the left side.
   */
  left?: SizePx;
  /**
   * Pixel value for padding on the right side.
   */
  right?: SizePx;
  /**
   * Enables the inspector mode and highlights the padding applied in green.
   */
  inspect?: boolean;
};

export const PixelPadding = (
  props: Readonly<Devvit.BlockComponentProps<PixelPaddingProps>>,
): JSX.Element => {
  if (!Array.isArray(props.children) || !props.children.length) {
    return <>{props.children}</>;
  }

  if (props.children.length > 1) {
    return <>{...props.children}</>;
  }

  const childBlock = props.children[0];
  if (typeof childBlock !== "object" || !childBlock) {
    return <>{...props.children}</>;
  }

  const childBlockElement = childBlock as StackElement;
  const isHstack = childBlockElement.type === "hstack";
  const isVstack = childBlockElement.type === "vstack";
  const isZstack = childBlockElement.type === "zstack";
  if (!isHstack && !isVstack && !isZstack) {
    return <>{...props.children}</>;
  }

  const paddingTop = props.top || props.y || props.all || defaultPadding;
  const paddingBottom = props.bottom || props.y || props.all || defaultPadding;
  const paddingLeft = props.left || props.x || props.all || defaultPadding;
  const paddingRight = props.right || props.x || props.all || defaultPadding;

  const topWrapperProps = copyProps(childBlockElement, [
    "width",
    "height",
    "minWidth",
    "minHeight",
    "maxWidth",
    "maxHeight",
    "onPress",
    "grow",
    "border",
    "borderColor",
    "lightBorderColor",
    "darkBorderColor",
    "cornerRadius",
    "backgroundColor",
    "lightBackgroundColor",
    "darkBackgroundColor",
  ]);
  const innerStackProps = copyProps(childBlockElement, [
    "reverse",
    "alignment",
    "gap",
  ]);
  const grandchildren = getSpreadableChildren(childBlockElement.children);
  const innerStack = isHstack ? (
    <hstack {...innerStackProps} grow>
      {...grandchildren}
    </hstack>
  ) : isVstack ? (
    <vstack {...innerStackProps} grow>
      {...grandchildren}
    </vstack>
  ) : (
    <zstack {...innerStackProps} grow>
      {...grandchildren}
    </zstack>
  );

  const debugColor = props.inspect ? { backgroundColor: "#c3deb8" } : {};

  return (
    <hstack {...topWrapperProps}>
      <hstack width={paddingLeft} {...debugColor} />
      <vstack grow>
        <vstack height={paddingTop} {...debugColor} />
        {innerStack}
        <vstack height={paddingBottom} {...debugColor} />
      </vstack>
      <hstack width={paddingRight} {...debugColor} />
    </hstack>
  );
};

type SizePx = `${number}px`;

type StackElement = BlockElement & {
  type: string;

  props: Devvit.Blocks.StackProps | undefined;
  children: JSX.Children | undefined;
};

const defaultPadding = "0px";

function getSpreadableChildren(
  children: Readonly<JSX.Children | undefined>,
): JSX.Element[] {
  return children ? (Array.isArray(children) ? children : [children]) : [];
}

function copyProps(
  source: Readonly<StackElement>,
  propList: ReadonlyArray<keyof Devvit.Blocks.StackProps>,
): Devvit.Blocks.StackProps {
  return propList.reduce((acc, current) => {
    return {
      ...acc,
      ...(source.props?.[current]
        ? { [current]: source.props?.[current] }
        : {}),
    };
  }, {});
}
