declare module "react-native-easy-theming" {
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
  type ColorValue = never;
  /**
   * Flex Prop Types
   * @see https://reactnative.dev/docs/flexbox
   * @see https://reactnative.dev/docs/layout-props
   */
  interface FlexStyleNew {
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

  export interface ShadowStyleIOSNew {
    "shadow-color"?: ColorValue | undefined;
    "shadow-offset"?: Readonly<{ width: number; height: number }> | undefined;
    "shadow-pacity"?: AnimatableNumericValue | undefined;
    "shadow-radius"?: number | undefined;
  }

  interface PerpectiveTransform {
    perspective: AnimatableNumericValue;
  }

  interface RotateTransform {
    rotate: AnimatableStringValue;
  }

  interface RotateXTransform {
    rotateX: AnimatableStringValue;
  }

  interface RotateYTransform {
    rotateY: AnimatableStringValue;
  }

  interface RotateZTransform {
    rotateZ: AnimatableStringValue;
  }

  interface ScaleTransform {
    scale: AnimatableNumericValue;
  }

  interface ScaleXTransform {
    scaleX: AnimatableNumericValue;
  }

  interface ScaleYTransform {
    scaleY: AnimatableNumericValue;
  }

  interface TranslateXTransform {
    translateX: AnimatableNumericValue;
  }

  interface TranslateYTransform {
    translateY: AnimatableNumericValue;
  }

  interface SkewXTransform {
    skewX: AnimatableStringValue;
  }

  interface SkewYTransform {
    skewY: AnimatableStringValue;
  }

  interface MatrixTransform {
    matrix: AnimatableNumericValue[];
  }

  export interface TransformsStyleNew {
    transform?:
      | (
          | PerpectiveTransform
          | RotateTransform
          | RotateXTransform
          | RotateYTransform
          | RotateZTransform
          | ScaleTransform
          | ScaleXTransform
          | ScaleYTransform
          | TranslateXTransform
          | TranslateYTransform
          | SkewXTransform
          | SkewYTransform
          | MatrixTransform
        )[]
      | string
      | undefined;
  }
  /**
   * @see https://reactnative.dev/docs/view#style
   */
  interface ViewStyleNew
    extends FlexStyleNew,
      ShadowStyleIOSNew,
      TransformsStyleNew {
    "backface-visibility"?: "visible" | "hidden" | undefined;
    "background-color"?: ColorValue | undefined;
    "border-block-color"?: ColorValue | undefined;
    "border-block-end-color"?: ColorValue | undefined;
    "border-block-start-color"?: ColorValue | undefined;
    "border-bottom-color"?: ColorValue | undefined;
    "border-bottom-end-radius"?: AnimatableNumericValue | undefined;
    "border-bottom-left-radius"?: AnimatableNumericValue | undefined;
    "border-bottom-right-radius"?: AnimatableNumericValue | undefined;
    "border-bottom-start-radius"?: AnimatableNumericValue | undefined;
    "border-color"?: ColorValue | undefined;
    /**
     * On iOS 13+, it is possible to change the corner curve of borders.
     * @platform ios
     */
    "border-curve"?: "circular" | "continuous" | undefined;
    "border-end-color"?: ColorValue | undefined;
    "border-end-end-radius"?: AnimatableNumericValue | undefined;
    "border-end-start-radius"?: AnimatableNumericValue | undefined;
    "border-left-color"?: ColorValue | undefined;
    "border-radius"?: AnimatableNumericValue | undefined;
    "border-right-color"?: ColorValue | undefined;
    "border-start-color"?: ColorValue | undefined;
    "border-start-end-radius"?: AnimatableNumericValue | undefined;
    "border-start-start-radius"?: AnimatableNumericValue | undefined;
    "border-style"?: "solid" | "dotted" | "dashed" | undefined;
    "border-top-color"?: ColorValue | undefined;
    "border-top-end-radius"?: AnimatableNumericValue | undefined;
    "border-top-left-radius"?: AnimatableNumericValue | undefined;
    "border-top-right-radius"?: AnimatableNumericValue | undefined;
    "border-top-start-radius"?: AnimatableNumericValue | undefined;
    opacity?: AnimatableNumericValue | undefined;
    /**
     * Sets the elevation of a view, using Android's underlying
     * [elevation API](https://developer.android.com/training/material/shadows-clipping.html#Elevation).
     * This adds a drop shadow to the item and affects z-order for overlapping views.
     * Only supported on Android 5.0+, has no effect on earlier versions.
     *
     * @platform android
     */
    elevation?: number | undefined;
    /**
     * Controls whether the View can be the target of touch events.
     */
    "pointer-events"?: "box-none" | "none" | "box-only" | "auto" | undefined;
  }

  // @see https://reactnative.dev/docs/text#style
  export interface TextStyleNew extends ViewStyleNew {
    color?: ColorValue | undefined;
    "font-family"?: string | undefined;
    "font-size"?: number | undefined;
    "font-style"?: "normal" | "italic" | undefined;
    /**
     * Specifies font weight. The values 'normal' and 'bold' are supported
     * for most fonts. Not all fonts have a variant for each of the numeric
     * values, in that case the closest one is chosen.
     */
    "font-weight"?:
      | "normal"
      | "bold"
      | "100"
      | "200"
      | "300"
      | "400"
      | "500"
      | "600"
      | "700"
      | "800"
      | "900"
      | undefined;
    "letter-spacing"?: number | undefined;
    "line-height"?: number | undefined;
    "text-align"?: "auto" | "left" | "right" | "center" | "justify" | undefined;
    "text-decoration-line"?:
      | "none"
      | "underline"
      | "line-through"
      | "underline line-through"
      | undefined;
    "text-decoration-style"?:
      | "solid"
      | "double"
      | "dotted"
      | "dashed"
      | undefined;
    "text-decoration-color"?: ColorValue | undefined;
    "text-shadow-color"?: ColorValue | undefined;
    "text-shadow-offset"?: { width: number; height: number } | undefined;
    "text-shadow-radius"?: number | undefined;
    "text-transform"?:
      | "none"
      | "capitalize"
      | "uppercase"
      | "lowercase"
      | undefined;
    testID?: string | undefined;
  }

  /**
   * Image style
   * @see https://reactnative.dev/docs/image#style
   */
  export interface ImageStyleNew
    extends FlexStyleNew,
      ShadowStyleIOSNew,
      TransformsStyleNew {
    "resize-mode"?:
      | "cover"
      | "contain"
      | "stretch"
      | "repeat"
      | "center"
      | undefined;
    "backface-visibility"?: "visible" | "hidden" | undefined;
    "border-bottom-left-radius"?: AnimatableNumericValue | undefined;
    "border-bottom-right-radius"?: AnimatableNumericValue | undefined;
    "background-color"?: ColorValue | undefined;
    "border-color"?: ColorValue | undefined;
    "border-radius"?: AnimatableNumericValue | undefined;
    "border-top-left-radius"?: AnimatableNumericValue | undefined;
    "border-top-right-radius"?: AnimatableNumericValue | undefined;
    overflow?: "visible" | "hidden" | undefined;
    "overlay-color"?: ColorValue | undefined;
    "tint-color"?: ColorValue | undefined;
    opacity?: AnimatableNumericValue | undefined;
    "object-fit"?: "cover" | "contain" | "fill" | "scale-down" | undefined;
  }

  type ExcludedStyles =
    | "object-fit"
    | "overflow"
    | "backface-visibility"
    | "resize-mode"
    | "testID"
    | "text-transform"
    | "text-decoration-style"
    | "text-decoration-line"
    | "text-align"
    | "font-weight"
    | "font-style"
    | "pointer-events"
    | "border-style"
    | "border-curve"
    | "transform"
    | "direction"
    | "position"
    | "justify-content"
    | "flex-wrap"
    | "flex-direction"
    | "display"
    | "align-self"
    | "align-items"
    | "align-content";

  type ReamapedStyles<T extends object> = {
    [Key in keyof T as `${Prefix}${string & Key}`]:
      | T[Key]
      | (Key extends ExcludedStyles ? never : TThemeKeys)
      | ((
          theme: TTheme
        ) => T[Key] | (Key extends ExcludedStyles ? never : TThemeKeys));
  };

  export type RemappedViewStyles = ReamapedStyles<ViewStyleNew>;
  export type RemappedTextStyles = ReamapedStyles<TextStyleNew>;
  export type RemappedImageStyles = ReamapedStyles<ImageStyleNew>;
  export declare const ThemeProvider: ({
    activeTheme,
    onChange,
    themes,
    children,
  }: React.PropsWithChildren<{
    themes: Record<string, TTheme>;
    activeTheme: string;
    onChange: (name: string) => void;
  }>) => any;
  export declare const useTheme: () => any;
  export declare const useThemeChange: () => any;
}

export type * from "react-native";
declare module "react-native" {
  import {
    RemappedViewStyles,
    RemappedTextStyles,
    RemappedImageStyles,
  } from "react-native-easy-theming";
  interface ViewProps extends RemappedViewStyles {}
  interface TextProps extends RemappedTextStyles {}
  interface TextInputProps extends RemappedTextStyles {}
  interface ImageProps extends RemappedImageStyles {}
}
