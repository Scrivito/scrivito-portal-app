import {
  type ImgHTMLAttributes,
  type ReactElement,
  type Ref,
  type SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { ImageDecoder } from 'scrivito_sdk/app_support/image_decoder';
import {
  isInitialUrlAvailable,
  scaleDownBinary,
} from 'scrivito_sdk/app_support/scale_down_binary';
import { ArgumentError, throwNextTick } from 'scrivito_sdk/common';
import { BasicField, BasicObj, Binary } from 'scrivito_sdk/models';
import {
  ContentTag,
  ContentTagWithElementCallback,
} from 'scrivito_sdk/react/components/content_tag';
import { handleRefAssignment } from 'scrivito_sdk/react/handle_ref_assignment';
import { imagePlaceholder } from 'scrivito_sdk/react/image_placeholder';
import { connect } from 'scrivito_sdk/react_connect';
import { AttributeDefinitions, Obj, Schema, Widget } from 'scrivito_sdk/realm';

type Width = ImgHTMLAttributes<HTMLImageElement>['width'];

interface ImageTagProps<
  AttrDefs extends AttributeDefinitions = AttributeDefinitions,
> {
  attribute?: keyof AttrDefs & string;
  content?: Binary | Obj<AttrDefs> | Widget<AttrDefs> | null;
  width?: Width;
  onLoad?: ImgHTMLAttributes<HTMLImageElement>['onLoad'];
  ref?: Ref<Element>;
  [key: string]: unknown;
}

type ImageTagType = {
  <AttrDefs extends AttributeDefinitions = AttributeDefinitions>(
    props: ImageTagProps<AttrDefs>,
  ): ReactElement | null;
};

/** @public */
export const ImageTag = connect(function ImageTag({
  content,
  attribute = 'blob',
  width,
  onLoad,
  ref,
  ...htmlOptions
}: ImageTagProps) {
  const [isLazy, setIsLazy] = useState(htmlOptions.loading === 'lazy');

  const load = useCallback(
    (event: SyntheticEvent<HTMLImageElement, Event>) => {
      setIsLazy(false);
      return onLoad?.call(null, event);
    },
    [onLoad],
  );

  const setEagerIfComplete = useCallback((node: HTMLImageElement) => {
    if (isComplete(node)) setIsLazy(false);
  }, []);

  const [, setImageDecoderUpdateCounter] = useState(0);

  const decoder = useMemo(
    () =>
      isLazy
        ? undefined
        : new ImageDecoder(() =>
            setImageDecoderUpdateCounter((counter) => counter + 1),
          ),
    [isLazy],
  );

  useEffect(() => {
    decoder?.resumeUpdateCallback();
    return () => decoder?.cancelUpdateCallback();
  }, [decoder]);

  if (!content) return null;

  if (content instanceof Binary) {
    const fullWidth = getFullWidth(content, width, isLazy);
    return fullWidth === null ? null : (
      <img
        src={scaledSrc(decoder, content)}
        width={fullWidth}
        {...htmlOptions}
        onLoad={load}
        ref={(element: HTMLImageElement) => {
          handleRefAssignment(element, ref);
          return setEagerIfComplete(element);
        }}
      />
    );
  }

  const binary = getBinary(content, attribute);

  if (binary === undefined) return null;

  if (binary !== null) {
    const fullWidth = getFullWidth(binary, width, isLazy);

    if (fullWidth !== null) {
      return (
        <ContentTagWithElementCallback
          attribute={attribute}
          content={content}
          width={fullWidth}
          tag={'img'}
          src={scaledSrc(decoder, binary)}
          {...htmlOptions}
          onLoad={load}
          elementCallback={setEagerIfComplete}
          ref={ref}
        />
      );
    }

    if (isLazy) return null;
  }

  return (
    <ContentTag
      attribute={attribute}
      content={content}
      tag={'img'}
      src={imagePlaceholder}
      data-scrivito-image-placeholder={true}
      width={width}
      ref={ref}
      {...htmlOptions}
    />
  );
}) as ImageTagType;

function scaledSrc(decoder: ImageDecoder | undefined, binary: Binary): string {
  const { initialUrl, highResUrlToDecode } = scaleDownBinary(binary);

  const decodedImg =
    highResUrlToDecode && decoder?.getImage(highResUrlToDecode);

  return decodedImg || initialUrl;
}

// return value:
// * number, string or undefined => render with this width
// * null => render null (since width is not yet loaded)
function getFullWidth(
  binary: Binary,
  width: Width,
  isLazy: boolean,
): Width | null {
  if (isLazy && !isInitialUrlAvailable(binary)) return null;
  if (width !== undefined) return width;

  if (binary.isRaw() || binary.isExplicitlyTransformed()) return;

  const metadata = binary.raw().metadata();

  if (metadata.contentType() === 'image/svg+xml') return;

  const metadataWidth = metadata.get('width');

  return typeof metadataWidth === 'number' ? metadataWidth : null;
}

function getBinary(content: Obj | Widget, attribute: string) {
  const field = Schema.basicFieldFor(content, attribute);
  if (!field) {
    if (Schema.forInstance(content)) {
      throwNextTick(
        new ArgumentError(
          'Component "Scrivito.ImageTag" received prop "content"' +
            ` with an object missing attribute "${attribute}".`,
        ),
      );
    }

    return;
  }

  const attributeType = field.type();
  if (attributeType === 'binary') return (field as BasicField<'binary'>).get();

  if (attributeType === 'reference') {
    const referenced = (field as BasicField<'reference'>).get();

    if (!(referenced instanceof BasicObj)) return null;

    return referenced.blob();
  }

  throwNextTick(
    new ArgumentError(
      'Component "Scrivito.ImageTag" received prop "content"' +
        ` with an object, whose attribute "${attribute}"` +
        ` is of unexpected type "${attributeType}".` +
        ' Valid attribute types are "binary" and "reference".',
    ),
  );
}

function isComplete(node?: HTMLElement | null) {
  // Type cast is OK assuming we're dealing with `img` elements in this module
  return node && (node as HTMLImageElement).complete;
}
