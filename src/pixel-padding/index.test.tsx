import { Devvit } from "@devvit/public-api";
import type { BlockElement } from "@devvit/public-api";
import { PixelPadding } from "./index.js";

describe("Better padding", () => {
  it("does nothing if wrapped around non-block element", () => {
    const referenceFragment = (<>foo</>) as BlockElement;
    const result = PixelPadding({
      children: "foo",
    }) as BlockElement;
    expect(result.children).toEqual(referenceFragment.children);
  });

  it("does nothing if wrapped around multiple elements", () => {
    const referenceFragment = (
      <>
        <hstack />
        <hstack />
      </>
    ) as BlockElement;
    const result = PixelPadding({
      children: [<hstack />, <hstack />],
    }) as BlockElement;
    expect(result.children).toEqual(referenceFragment.children);
  });

  it("does nothing if wrapped around non-block element in array", () => {
    const referenceFragment = (<>foo</>) as BlockElement;
    const result = PixelPadding({
      children: ["foo"],
    }) as BlockElement;
    expect(result.children).toEqual(referenceFragment.children);
  });

  it("does nothing if wrapped around non-stack", () => {
    const referenceFragment = (
      <>
        <spacer />
      </>
    ) as BlockElement;
    const result = PixelPadding({
      children: [<spacer />],
    }) as BlockElement;
    expect(result.children).toEqual(referenceFragment.children);
  });
  it("does nothing if wrapped around non-stack", () => {
    const referenceFragment = (
      <>
        <spacer />
      </>
    ) as BlockElement;
    const result = (
      <PixelPadding>
        <spacer />
      </PixelPadding>
    ) as BlockElement;
    expect(result.children).toEqual(referenceFragment.children);
  });
  describe("with stack elements", () => {
    const hstackWithProps = (
      <hstack
        width="1px"
        height="2px"
        minWidth="3px"
        minHeight="4px"
        maxWidth="5px"
        maxHeight="6px"
        onPress={() => {}}
        grow
        border="thin"
        borderColor="black"
        lightBorderColor="yellow"
        darkBorderColor="blue"
        cornerRadius="small"
        backgroundColor="white"
        lightBackgroundColor="black"
        darkBackgroundColor="red"
        reverse
        alignment="center middle"
        gap="large"
        padding="medium"
      >
        <spacer />
        <text>hehe</text>
      </hstack>
    ) as BlockElement;

    it("preserves the props that affect external appearance and behaviour", () => {
      const result = PixelPadding({
        children: [hstackWithProps],
      }) as BlockElement;

      expect(Object.keys(result.props!)).toEqual([
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
    });

    it("preserves the props that affect internal appearance and behaviour and applies grow", () => {
      const result = PixelPadding({
        children: [hstackWithProps],
      }) as BlockElement;

      const innerStack = (result.children[1] as BlockElement)
        .children[1]! as BlockElement;
      expect(Object.keys(innerStack.props!)).toEqual([
        "reverse",
        "alignment",
        "gap",
        "grow",
      ]);
    });

    it("preserves grandchildren", () => {
      const result = PixelPadding({
        children: [hstackWithProps],
      }) as BlockElement;

      const innerStack = (result.children[1] as BlockElement)
        .children[1]! as BlockElement;
      expect(innerStack.children).toEqual(hstackWithProps.children);
    });

    it("applies default padding", () => {
      const result = PixelPadding({
        children: [hstackWithProps],
      }) as BlockElement;

      expect(result.children.length).toBe(3);

      const leftSpacer = result.children[0] as BlockElement;
      const rightSpacer = result.children[2] as BlockElement;

      const innerBlock = result.children[1] as BlockElement;

      expect(innerBlock.children.length).toBe(3);

      const topSpacer = innerBlock.children[0] as BlockElement;
      const bottomSpacer = innerBlock.children[2] as BlockElement;

      expect(leftSpacer.props).toEqual({ width: "0px" });
      expect(rightSpacer.props).toEqual({ width: "0px" });

      expect(topSpacer.props).toEqual({ height: "0px" });
      expect(bottomSpacer.props).toEqual({ height: "0px" });
    });

    it("applies padding in px", () => {
      const result = PixelPadding({
        children: [hstackWithProps],
        all: "10px",
      }) as BlockElement;

      const leftSpacer = result.children[0] as BlockElement;
      const rightSpacer = result.children[2] as BlockElement;

      const innerBlock = result.children[1] as BlockElement;

      const topSpacer = innerBlock.children[0] as BlockElement;
      const bottomSpacer = innerBlock.children[2] as BlockElement;

      expect(leftSpacer.props).toEqual({ width: "10px" });
      expect(rightSpacer.props).toEqual({ width: "10px" });

      expect(topSpacer.props).toEqual({ height: "10px" });
      expect(bottomSpacer.props).toEqual({ height: "10px" });
    });

    it("applies axis overrides in px", () => {
      const result = PixelPadding({
        children: [hstackWithProps],
        all: "10px",
        x: "5px",
        y: "20px",
      }) as BlockElement;

      const leftSpacer = result.children[0] as BlockElement;
      const rightSpacer = result.children[2] as BlockElement;

      const innerBlock = result.children[1] as BlockElement;

      const topSpacer = innerBlock.children[0] as BlockElement;
      const bottomSpacer = innerBlock.children[2] as BlockElement;

      expect(leftSpacer.props).toEqual({ width: "5px" });
      expect(rightSpacer.props).toEqual({ width: "5px" });

      expect(topSpacer.props).toEqual({ height: "20px" });
      expect(bottomSpacer.props).toEqual({ height: "20px" });
    });

    it("applies specific overrides in px", () => {
      const result = PixelPadding({
        children: [hstackWithProps],
        all: "10px",
        x: "5px",
        y: "20px",
        top: "1px",
        bottom: "2px",
        left: "3px",
        right: "4px",
      }) as BlockElement;

      const leftSpacer = result.children[0] as BlockElement;
      const rightSpacer = result.children[2] as BlockElement;

      const innerBlock = result.children[1] as BlockElement;

      const topSpacer = innerBlock.children[0] as BlockElement;
      const bottomSpacer = innerBlock.children[2] as BlockElement;

      expect(leftSpacer.props).toEqual({ width: "3px" });
      expect(rightSpacer.props).toEqual({ width: "4px" });

      expect(topSpacer.props).toEqual({ height: "1px" });
      expect(bottomSpacer.props).toEqual({ height: "2px" });
    });

    it("applies visual treatment and displays padding in debug mode", () => {
      const result = PixelPadding({
        children: [hstackWithProps],
        all: "10px",
        x: "5px",
        y: "20px",
        top: "1px",
        bottom: "2px",
        left: "3px",
        right: "4px",
        inspect: true,
      }) as BlockElement;

      const leftSpacer = result.children[0] as BlockElement;
      const rightSpacer = result.children[2] as BlockElement;

      const innerBlock = result.children[1] as BlockElement;

      const topSpacer = innerBlock.children[0] as BlockElement;
      const bottomSpacer = innerBlock.children[2] as BlockElement;

      expect(leftSpacer.props).toEqual({
        width: "3px",
        backgroundColor: "#c3deb8",
      });
      expect(rightSpacer.props).toEqual({
        width: "4px",
        backgroundColor: "#c3deb8",
      });

      expect(topSpacer.props).toEqual({
        height: "1px",
        backgroundColor: "#c3deb8",
      });
      expect(bottomSpacer.props).toEqual({
        height: "2px",
        backgroundColor: "#c3deb8",
      });
    });
  });
});
