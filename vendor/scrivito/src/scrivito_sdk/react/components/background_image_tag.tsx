// @rewire
import * as React from 'react';

import { BackgroundImageDecoder } from 'scrivito_sdk/app_support/background_image_decoder';
import { scaleDownBinary } from 'scrivito_sdk/app_support/scale_down_binary';
import {
  ArgumentError,
  docUrl,
  isObject,
  throwNextTick,
} from 'scrivito_sdk/common';
import { Binary } from 'scrivito_sdk/models';
import { connect } from 'scrivito_sdk/react_connect';
import { Obj, isBinaryBasicObj, unwrapAppClass } from 'scrivito_sdk/realm';

interface BackgroundImageTagProps {
  tag?: string;
  style?: BackgroundImageTagStyle | string;
  [key: string]: unknown;
}

interface BackgroundImageTagStyle {
  background?: BackgroundOrBackgroundList;
  [key: string]: unknown;
}

type BackgroundOrBackgroundList = Background | Background[];
export type Background = PlainBackground | ScrivitoBackground;

interface PlainBackground extends BackgroundProperties {
  image: string;
}

interface ScrivitoBackground extends BackgroundProperties {
  image: Obj | Binary | null | undefined;
}

interface BackgroundProperties {
  attachment?: string;
  clip?: string;
  color?: string;
  origin?: string;
  position?: string;
  repeat?: string;
  size?: string;
}

type BinaryToUrl = (binary: Binary) => string;

/** @public */
export const BackgroundImageTag: React.ComponentType<BackgroundImageTagProps> =
  connect(function BackgroundImageTag({
    style,
    tag,
    ...passThroughProps
  }: BackgroundImageTagProps) {
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

    const decoder = React.useMemo(
      () => createBackgroundImageDecoder(forceUpdate),
      []
    );

    React.useEffect(() => {
      decoder.resumeUpdateCallback();
      return () => decoder.clear();
    }, [decoder]);

    const Tag = (tag || 'div') as keyof React.JSX.IntrinsicElements;

    assertNoBackgroundRelatedProperties(style);

    return (
      <Tag
        {...passThroughProps}
        style={calculateCSSProperties(style || {}, binaryToUrl)}
      />
    );

    function binaryToUrl(binary: Binary): string {
      const { initialUrl, highResUrlToDecode } = scaleDownBinary(binary);
      const decodedBackgroundUrl =
        highResUrlToDecode && decoder.getBackgroundImage(highResUrlToDecode);

      return decodedBackgroundUrl || `url(${initialUrl})`;
    }
  });

// For test purpose only
export function createBackgroundImageDecoder(
  onUpdateCallback: () => void
): BackgroundImageDecoder {
  return new BackgroundImageDecoder(onUpdateCallback);
}

type BackgroundCSSProperties = Pick<
  React.CSSProperties,
  | 'backgroundAttachment'
  | 'backgroundClip'
  | 'backgroundColor'
  | 'backgroundImage'
  | 'backgroundOrigin'
  | 'backgroundPosition'
  | 'backgroundRepeat'
  | 'backgroundSize'
>;

function calculateCSSProperties(
  style: BackgroundImageTagStyle | string,
  binaryToUrl: BinaryToUrl
): BackgroundCSSProperties {
  if (isObject(style)) {
    const { background, ...otherStyles } = style as BackgroundImageTagStyle;

    return {
      ...otherStyles,
      ...calculateBackgroundCSSProperties(background, binaryToUrl),
    };
  }

  return {};
}

function calculateBackgroundCSSProperties(
  background: Background | Background[] | undefined,
  binaryToUrl: BinaryToUrl
): BackgroundCSSProperties {
  if (background === undefined) {
    return {};
  }

  if (Array.isArray(background)) {
    return mergeBackgroundCSSProperties(
      background.map((b) => cssPropertiesFor(b, binaryToUrl))
    );
  }

  return cssPropertiesFor(background, binaryToUrl);
}

function mergeBackgroundCSSProperties(
  properties: BackgroundCSSProperties[]
): BackgroundCSSProperties {
  return {
    backgroundImage: mergeCSSProperty(properties, 'backgroundImage'),

    backgroundAttachment: mergeCSSProperty(properties, 'backgroundAttachment'),
    backgroundClip: mergeCSSProperty(properties, 'backgroundClip'),
    backgroundOrigin: mergeCSSProperty(properties, 'backgroundOrigin'),
    backgroundPosition: mergeCSSProperty(properties, 'backgroundPosition'),
    backgroundRepeat: mergeCSSProperty(properties, 'backgroundRepeat'),
    backgroundSize: mergeCSSProperty(properties, 'backgroundSize'),

    backgroundColor: lastBackgroundColor(properties),
  };
}

function mergeCSSProperty(
  properties: BackgroundCSSProperties[],
  name: keyof BackgroundCSSProperties
) {
  return properties.map((property) => property[name]).join(', ');
}

function lastBackgroundColor(
  properties: BackgroundCSSProperties[]
): string | undefined {
  const lastBackground = properties[properties.length - 1];

  if (lastBackground) {
    return lastBackground.backgroundColor;
  }
}

function cssPropertiesFor(
  background: Background,
  binaryToUrl: BinaryToUrl
): BackgroundCSSProperties {
  if (isPlainBackground(background)) {
    return cssPropertiesForPlainBackground(background);
  }

  return cssPropertiesForScrivitoBackground(background, binaryToUrl);
}

function cssPropertiesForPlainBackground(
  background: PlainBackground
): BackgroundCSSProperties {
  return {
    backgroundImage: background.image,

    backgroundAttachment: background.attachment || 'scroll',
    backgroundClip: background.clip || 'border-box',
    backgroundColor: background.color || 'transparent',
    backgroundOrigin: background.origin || 'padding-box',
    backgroundPosition: background.position || '0% 0%',
    backgroundRepeat: background.repeat || 'repeat',
    backgroundSize: background.size || 'auto',
  };
}

function cssPropertiesForScrivitoBackground(
  background: ScrivitoBackground,
  binaryToUrl: BinaryToUrl
): BackgroundCSSProperties {
  const image = background.image;

  if (image instanceof Binary) {
    return cssPropertiesForBinary(image, background, binaryToUrl);
  }

  if (image instanceof Obj) {
    const basicObj = unwrapAppClass(image)!;

    if (isBinaryBasicObj(basicObj)) {
      const blob = basicObj.blob();

      if (blob) {
        return cssPropertiesForBinary(blob, background, binaryToUrl);
      }
    }
  }

  return cssPropertiesForPlainBackground({ image: 'none' });
}

function cssPropertiesForBinary(
  binary: Binary,
  background: ScrivitoBackground,
  binaryToUrl: BinaryToUrl
): BackgroundCSSProperties {
  return {
    backgroundImage: binaryToUrl(binary),
    backgroundAttachment: background.attachment || 'scroll',
    backgroundClip: background.clip || 'border-box',
    backgroundColor: background.color || 'transparent',
    backgroundOrigin: background.origin || 'padding-box',
    backgroundPosition: background.position || 'center center',
    backgroundRepeat: background.repeat || 'no-repeat',
    backgroundSize: background.size || 'cover',
  };
}

function isPlainBackground(
  background: Background
): background is PlainBackground {
  return typeof background.image === 'string';
}

function assertNoBackgroundRelatedProperties(style: unknown) {
  if (isObject(style)) {
    for (const key of Object.keys(style as object)) {
      if (key.match(/^background.+/)) {
        throwNextTick(
          new ArgumentError(
            `Invalid background related CSS property "${key}". ` +
              'Expected property "background" alongside with any non-background properties' +
              `For further details, see ${docUrl('js-sdk/BackgroundImageTag')}`
          )
        );
      }
    }
  }
}
