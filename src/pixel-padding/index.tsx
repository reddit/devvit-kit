import { Devvit } from "@devvit/public-api";

export const PixelPadding = (
  props: Devvit.BlockComponentProps<PixelPaddingProps>,
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
        <vstack />
      </vstack>
      <hstack width={paddingRight} {...debugColor} />
    </hstack>
  );
};

type SizePx = `${number}px`;

type StackElement = {
  type: string;

  props: Devvit.Blocks.StackProps | undefined;
  children: JSX.Children | undefined;
};

type PixelPaddingProps = {
  all?: SizePx;

  x?: SizePx;
  y?: SizePx;

  top?: SizePx;
  bottom?: SizePx;
  left?: SizePx;
  right?: SizePx;

  inspect?: boolean;
};
const defaultPadding = "0px";

function getSpreadableChildren(
  children: JSX.Children | undefined,
): JSX.Element[] {
  return children ? (Array.isArray(children) ? children : [children]) : [];
}

function copyProps(
  source: StackElement,
  propList: Array<keyof Devvit.Blocks.StackProps>,
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
