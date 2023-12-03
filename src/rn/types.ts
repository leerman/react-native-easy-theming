import { Animated } from "react-native";

type Leaves<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never
        ? ""
        : `.${Leaves<T[K]>}`}`;
    }[keyof T]
  : never;

export interface TTheme {
  name: string;
}
type TThemeKeys = Leaves<TTheme>;

type Prefix = "s-";
type FlexAlignType =
  | "flex-start"
  | "flex-end"
  | "center"
  | "stretch"
  | "baseline";

type DimensionValue =
  | number
  | "auto"
  | `${number}%`
  | Animated.AnimatedNode
  | null;
type AnimatableNumericValue = number | Animated.AnimatedNode;
type AnimatableStringValue = string | Animated.AnimatedNode;

/**
 * Flex Prop Types
 * @see https://reactnative.dev/docs/flexbox
 * @see https://reactnative.dev/docs/layout-props
 */
interface FlexStyle {
  "align-content"?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "stretch"
    | "space-between"
    | "space-around"
    | undefined;
  "align-items"?: FlexAlignType | undefined;
  "align-self"?: "auto" | FlexAlignType | undefined;
  "aspect-ratio"?: number | string | undefined;
  "border-bottom-width"?: number | undefined;
  "border-end-width"?: number | undefined;
  "border-left-width"?: number | undefined;
  "border-right-width"?: number | undefined;
  "border-start-width"?: number | undefined;
  "border-top-width"?: number | undefined;
  "border-width"?: number | undefined;
  bottom?: DimensionValue | undefined;
  display?: "none" | "flex" | undefined;
  end?: DimensionValue | undefined;
  flex?: number | undefined;
  "flex-basis"?: DimensionValue | undefined;
  "flex-direction"?:
    | "row"
    | "column"
    | "row-reverse"
    | "column-reverse"
    | undefined;
  "row-gap"?: number | undefined;
  gap?: number | undefined;
  "column-gap"?: number | undefined;
  "flex-grow"?: number | undefined;
  "flex-shrink"?: number | undefined;
  "flex-wrap"?: "wrap" | "nowrap" | "wrap-reverse" | undefined;
  height?: DimensionValue | undefined;
  "justify-content"?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | undefined;
  left?: DimensionValue | undefined;
  margin?: DimensionValue | undefined;
  "margin-bottom"?: DimensionValue | undefined;
  "margin-end"?: DimensionValue | undefined;
  "margin-horizontal"?: DimensionValue | undefined;
  "margin-left"?: DimensionValue | undefined;
  "margin-right"?: DimensionValue | undefined;
  "margin-start"?: DimensionValue | undefined;
  "margin-top"?: DimensionValue | undefined;
  "margin-vertical"?: DimensionValue | undefined;
  "max-height"?: DimensionValue | undefined;
  "max-width"?: DimensionValue | undefined;
  "min-height"?: DimensionValue | undefined;
  "min-width"?: DimensionValue | undefined;
  overflow?: "visible" | "hidden" | "scroll" | undefined;
  padding?: DimensionValue | undefined;
  "padding-bottom"?: DimensionValue | undefined;
  "padding-end"?: DimensionValue | undefined;
  "padding-horizontal"?: DimensionValue | undefined;
  "padding-left"?: DimensionValue | undefined;
  "padding-right"?: DimensionValue | undefined;
  "padding-start"?: DimensionValue | undefined;
  "padding-top"?: DimensionValue | undefined;
  "padding-vertical"?: DimensionValue | undefined;
  position?: "absolute" | "relative" | undefined;
  right?: DimensionValue | undefined;
  start?: DimensionValue | undefined;
  top?: DimensionValue | undefined;
  width?: DimensionValue | undefined;
  "z-index"?: number | undefined;

  /**
   * @platform ios
   */
  direction?: "inherit" | "ltr" | "rtl" | undefined;
}

/**
 * @see https://reactnative.dev/docs/view#style
 */
interface ViewStyle extends FlexStyle {}

export type RemappedViewStyles = {
  [Key in keyof ViewStyle as `${Prefix}${Key}`]:
    | ViewStyle[Key]
    | TThemeKeys
    | ((theme: TTheme) => ViewStyle[Key] | TThemeKeys);
};

// import "react-native";

// declare module "react-native" {
//   interface ViewProps extends RemappedViewStyles {}
// }
