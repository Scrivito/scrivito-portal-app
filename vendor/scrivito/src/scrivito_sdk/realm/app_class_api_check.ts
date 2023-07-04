import { isFunction } from 'underscore';
import {
  PositiveInteger,
  checkArgumentsFor,
  classify,
  tcomb as t,
  underscore,
} from 'scrivito_sdk/common';
import { isAppClass } from 'scrivito_sdk/realm/schema';
import {
  ObjClassType,
  WidgetClassType,
} from 'scrivito_sdk/realm/tcomb_api_types';

const noop = () => {};

export const {
  checkCreateWidgetClass,
  checkCreateObjClass,
  checkProvideComponent,
  checkProvideLayoutComponent,
  checkProvideDataErrorComponent,
  checkProvideObjClass,
  checkProvideWidgetClass,
  checkProvideDataClass,
  checkProvideDataItem,
} = (() => {
  if (process.env.NODE_ENV !== 'development') {
    return {
      checkCreateWidgetClass: noop,
      checkCreateObjClass: noop,
      checkProvideComponent: noop,
      checkProvideLayoutComponent: noop,
      checkProvideDataErrorComponent: noop,
      checkProvideObjClass: noop,
      checkProvideWidgetClass: noop,
      checkProvideDataClass: noop,
      checkProvideDataItem: noop,
    };
  }

  const ObjClassDefinitionType = t.interface({
    attributes: t.maybe(
      t.dict(
        t.refinement(
          t.String,
          isCustomAttributeName,
          'String (alphanumeric, starting with a lower-case character)'
        ),
        t.union([
          t.enums.of([
            'binary',
            'boolean',
            'datalocator',
            'date',
            'datetime',
            'float',
            'html',
            'integer',
            'link',
            'linklist',
            'reference',
            'referencelist',
            'string',
            'stringlist',
            'widget',
            'widgetlist',
          ]),
          t.tuple([
            t.enums.of(['enum', 'multienum']),
            t.interface({
              values: t.list(t.String),
            }),
          ]),
          t.tuple([
            t.enums.of(['reference', 'referencelist']),
            t.interface({
              only: t.union([t.String, t.list(t.String)]),
            }),
          ]),
          t.tuple([
            t.enums.of(['widget']),
            t.interface({
              only: t.union([t.String, t.list(t.String)]),
            }),
          ]),
          t.tuple([
            t.enums.of(['widgetlist']),
            t.union([
              t.interface({
                only: t.union([t.String, t.list(t.String)]),
                maximum: t.maybe(PositiveInteger),
              }),
              t.interface({
                maximum: PositiveInteger,
              }),
            ]),
          ]),
        ]),
        'Attributes Specification'
      )
    ),
    extractTextAttributes: t.maybe(t.list(t.String)),
    extend: t.maybe(ObjClassType),
    onlyAsRoot: t.maybe(t.Boolean),
    onlyChildren: t.maybe(t.union([t.String, t.list(t.String)])),
    onlyInside: t.maybe(t.union([t.String, t.list(t.String)])),
    validAsRoot: t.maybe(t.Boolean),
  });

  const WidgetClassDefinitionType = t.interface({
    attributes: ObjClassDefinitionType.meta.props.attributes,
    extractTextAttributes: t.maybe(t.list(t.String)),
    extend: t.maybe(WidgetClassType),
    onlyInside: t.maybe(t.union([t.String, t.Array])),
  });

  return {
    checkCreateObjClass: checkArgumentsFor(
      'createObjClass',
      [['definition', ObjClassDefinitionType]],
      {
        docPermalink: 'js-sdk/createObjClass',
      }
    ),

    checkCreateWidgetClass: checkArgumentsFor(
      'createWidgetClass',
      [['definition', WidgetClassDefinitionType]],
      {
        docPermalink: 'js-sdk/createWidgetClass',
      }
    ),

    checkProvideComponent: checkArgumentsFor(
      'provideComponent',
      [
        [
          'classNameOrClass',
          t.union([t.String, ObjClassType, WidgetClassType]),
        ],
        ['component', t.irreducible('React component', isFunction)],
      ],
      {
        docPermalink: 'js-sdk/provideComponent',
      }
    ),

    checkProvideLayoutComponent: checkArgumentsFor(
      'provideLayoutComponent',
      [
        ['objClass', ObjClassType],
        ['component', t.irreducible('React component', isFunction)],
      ],
      {
        docPermalink: 'js-sdk/provideLayoutComponent',
      }
    ),

    checkProvideDataErrorComponent: checkArgumentsFor(
      'provideDataErrorComponent',
      [['component', t.irreducible('React component', isFunction)]],
      {
        docPermalink: 'js-sdk/provideDataErrorComponent',
      }
    ),

    checkProvideObjClass: (...args: unknown[]) => {
      checkProvideClass('objClass', ObjClassType, ObjClassDefinitionType, args);
    },

    checkProvideWidgetClass: (...args: unknown[]) => {
      checkProvideClass(
        'widgetClass',
        WidgetClassType,
        WidgetClassDefinitionType,
        args
      );
    },

    checkProvideDataClass: checkArgumentsFor(
      'provideDataClass',
      [
        ['name', t.String],
        [
          'dataClass',
          t.interface({
            connection: t.interface({
              get: t.Function,
              create: t.maybe(t.Function),
              index: t.maybe(t.Function),
              update: t.maybe(t.Function),
              delete: t.maybe(t.Function),
            }),
          }),
        ],
      ],
      {
        docPermalink: 'js-sdk/provideDataClass',
      }
    ),

    checkProvideDataItem: checkArgumentsFor(
      'provideDataItem',
      [
        ['name', t.String],
        ['read', t.Function],
      ],
      {
        docPermalink: 'js-sdk/provideDataItem',
      }
    ),
  };
})();

function checkProvideClass(
  name: string,
  classType: t.Refinement<object>,
  definitionType: t.Interface<unknown>,
  args: unknown[]
) {
  const className = classify(name);
  const classOrDefinition = args[1];
  const check = checkArgumentsFor(
    `provide${className}`,
    [
      ['name', t.String],
      typeof classOrDefinition === 'function' && isAppClass(classOrDefinition)
        ? ['class', classType]
        : typeof classOrDefinition === 'object' && classOrDefinition !== null
        ? ['definition', definitionType]
        : [
            `${name}OrDefinition`,
            t.union([classType, definitionType], className),
          ],
    ],
    {
      docPermalink: `js-sdk/provide${className}`,
    }
  );

  check(...args);
}

function isCustomAttributeName(name: string): boolean {
  return (
    /^[a-z](_+[A-Z0-9]|[A-Za-z0-9])*$/.test(name) &&
    underscore(name).length <= 50
  );
}
