/// <reference types="react" />

import type { History as History_2 } from 'history';
import * as React_2 from 'react';

declare type AppClass<AttrDefs extends AttributeDefinitions = AttributeDefinitions> = ObjClass<AttrDefs> | WidgetClass<AttrDefs>;

/** @public */
export declare class ArgumentError extends ScrivitoError {
    constructor(message: string);
}

declare type AttrDict<AttrDefs extends AttributeDefinitions> = {
    [AttrName in keyof AttrDefs]?: AttributeValueOf<AttrDefs, AttrName>;
};

declare interface AttributeDataContextConfig {
    [cmsAttributeName: string]: ContextDescription | DataLocatorAttributeName;
}

declare type AttributeDefinition = AttributeDefinitionWithoutConfig | AttributeDefinitionWithConfig;

declare interface AttributeDefinitions {
    [attributeName: string]: AttributeDefinition;
}

declare type AttributeDefinitionWithConfig = {
    [Type in keyof AttributeTypeToConfigMapping]: readonly [
    Type,
    AttributeTypeToConfigMapping[Type]
    ];
}[keyof AttributeTypeToConfigMapping];

declare type AttributeDefinitionWithoutConfig = AttributeTypeWithoutConfig | AttributeTypeWithOmittedConfig;

declare interface AttributeEditingConfig {
    title?: string;
    description?: string;
    values?: readonly LocalizedValue[];
    options?: AttributeEditingOptions;
}

declare interface AttributeEditingOptions {
    allowedTags?: readonly (keyof JSX.IntrinsicElements)[];
    showHtmlSource?: boolean;
    toolbar?: readonly ToolbarButton[];
}

declare interface AttributeMapping {
    binary: Binary | null;
    boolean: boolean;
    datalocator: DataLocator;
    date: Date | null;
    datetime: Date | null;
    enum: string | null;
    float: number | null;
    integer: number | null;
    html: string;
    link: Link | null;
    linklist: Link[];
    multienum: string[];
    reference: Obj | null;
    referencelist: Obj[];
    string: string;
    stringlist: string[];
    widget: Widget | null;
    widgetlist: Widget[];
}

declare interface AttributesEditingConfig {
    [attributeName: string]: AttributeEditingConfig;
}

declare type AttributeType = 'binary' | 'boolean' | 'datalocator' | 'date' | 'datetime' | 'enum' | 'float' | 'html' | 'integer' | 'link' | 'linklist' | 'multienum' | 'reference' | 'referencelist' | 'string' | 'stringlist' | 'widget' | 'widgetlist';

declare type AttributeTypeOf<K extends AttributeDefinition> = K extends AttributeTypeWithoutConfig | AttributeTypeWithOmittedConfig ? K : K[0];

declare type AttributeTypeToConfigMapping = {
    enum: {
        values: readonly string[];
    };
    multienum: {
        values: readonly string[];
    };
    reference: {
        only: string | readonly string[];
    };
    referencelist: {
        only: string | readonly string[];
    };
    widget: {
        only: string | readonly string[];
    };
    widgetlist: {
        only: string | readonly string[];
        maximum?: number;
    } | {
        only?: string | readonly string[];
        maximum: number;
    };
};

declare type AttributeTypeWithMandatoryConfig = 'enum' | 'multienum';

declare type AttributeTypeWithOmittedConfig = Exclude<AttributeType, AttributeTypeWithMandatoryConfig | AttributeTypeWithoutConfig>;

declare type AttributeTypeWithoutConfig = Exclude<AttributeType, keyof AttributeTypeToConfigMapping>;

declare type AttributeValidationCallback<T extends Obj | Widget> = (attributeValue: AttributeValue, options: {
    name: string;
    obj: T extends Obj ? T : never;
    widget: T extends Widget ? T : never;
    content: T;
}) => ValidationResult;

declare type AttributeValidationConstraints = object | AttributeValidationConstraintsWithOptions;

declare type AttributeValidationConstraintsWithOptions = [
AttributeValidationOptions,
object
];

declare type AttributeValidationName = string;

declare interface AttributeValidationOptions {
    severity?: ValidationSeverityLevel;
}

declare type AttributeValidations<T extends Obj | Widget> = readonly [
AttributeValidationName,
...Array<AttributeValidationConstraints | AttributeValidationCallback<T>>
];

declare type AttributeValue = AttributeMapping[keyof AttributeMapping];

declare type AttributeValueFunction = () => AttributeValue;

declare type AttributeValueOf<AttrDefs extends AttributeDefinitions, AttrName extends keyof AttrDefs> = AttributeMapping[AttributeTypeOf<AttrDefs[AttrName]>];

declare interface AuthGroups {
    [groupId: string]: string;
}

declare type BackendSingleSearchValue = string | number | boolean | null;

declare type Background = PlainBackground | ScrivitoBackground;

/** @public */
export declare const BackgroundImageTag: React_2.ComponentType<BackgroundImageTagProps>;

declare interface BackgroundImageTagProps {
    tag?: string;
    style?: BackgroundImageTagStyle | string;
    [key: string]: unknown;
}

declare interface BackgroundImageTagStyle {
    background?: BackgroundOrBackgroundList;
    [key: string]: unknown;
}

declare type BackgroundOrBackgroundList = Background | Background[];

declare interface BackgroundProperties {
    attachment?: string;
    clip?: string;
    color?: string;
    origin?: string;
    position?: string;
    repeat?: string;
    size?: string;
}

declare interface BaseObjClassDefinition {
    extractTextAttributes?: readonly string[];
    name?: string;
    onlyAsRoot?: boolean;
    onlyChildren?: readonly string[] | string;
    onlyInside?: readonly string[] | string;
    validAsRoot?: boolean;
}

declare type BaseUrlForSiteCallback = (siteId: string) => string | undefined;

declare interface BaseWidgetClassDefinition {
    extractTextAttributes?: readonly string[];
    name?: string;
    onlyChildren?: undefined;
    onlyInside?: readonly string[] | string;
}

/** @public */
export declare class Binary {
    static upload(source: Blob | File, options?: BinaryUploadOptions): FutureBinary;
    copy(options?: BinaryUploadOptions): FutureBinary;
    isPrivate(): boolean;
    optimizeFor(transformation: TransformationDefinition): Binary;
    original(): Binary;
    raw(): Binary;
    url(): string;
    filename(): string;
    metadata(): MetadataCollection;
    contentType(): string;
    contentLength(): number;
}

declare type BinaryMetadataValue = string | string[] | number | Date;

declare interface BinaryUploadOptions {
    filename?: string;
    contentType?: string;
}

/** @public */
export declare function canEdit(obj: Obj): boolean;

/** @public */
export declare function canWrite(): boolean;

/** @public */
export declare const ChildListTag: React_2.ComponentType<ChildListTagProps>;

declare type ChildListTagProps = React_2.HTMLAttributes<HTMLElement> & {
    parent?: Obj;
    tag?: string;
    renderChild?: RenderChild;
};

declare interface ClassicConfig {
    origin?: string;
    routingBasePath?: string;
    baseUrlForSite?: undefined;
    siteForUrl?: undefined;
}

/** @public */
export declare class ClientError extends ScrivitoError {
    readonly message: string;
    readonly code: string | undefined;
    readonly details: unknown;
    constructor(message: string, code: string | undefined, details: unknown);
}

declare type ComponentGroupDescription = LivingComponentGroupDescriptionForUi | RegisteredComponentGroupDescription;

declare interface Configuration {
    tenant: string;
    adoptUi?: boolean | string;
    baseUrlForSite?: SiteMappingConfiguration['baseUrlForSite'];
    endpoint?: string;
    constraintsValidation?: ConstraintsValidationCallback;
    homepage?: () => Obj | null;
    origin?: string;
    routingBasePath?: string;
    siteForUrl?: SiteMappingConfiguration['siteForUrl'];
    visitorAuthentication?: boolean;
    apiKey?: string;
    priority?: Priority;
    editorLanguage?: ForcedEditorLanguage;
    strictSearchOperators?: boolean;
    optimizedWidgetLoading?: boolean;
    contentTagsForEmptyAttributes?: boolean;
    jrRestApiEndpoint?: string;
    treatLocalhostLike?: string;
}

declare interface Configuration_2 {
    filters: ContentBrowserFilters | FilterBuilder | undefined;
    baseFilter: {
        query?: ObjSearch;
    };
}

/** @public */
export declare function configure(configuration: Configuration): void;

/** @public */
export declare function configureContentBrowser(configuration: Partial<Configuration_2>): void;

/** @public */
export declare function configureObjClassForContentType(configuration: ObjClassForContentTypeMapping): void;

/** @public */
export declare function configurePreviewSizes(previewSizes: PreviewSize[]): void;

/** @public */
export declare function connect<Props>(component: React_2.FunctionComponent<Props>): React_2.FunctionComponent<Props>;

/** @public */
export declare function connect<Props>(component: React_2.ComponentClass<Props>): React_2.ComponentClass<Props>;

/** @public */
export declare function connect<Props>(component: React_2.ComponentType<Props>): React_2.ComponentType<Props>;

declare type ConstraintsValidationCallback = (constraints: object) => AttributeValidationCallback<Obj | Widget>;

declare interface ContentBrowserFilterItem {
    expanded?: boolean;
    field?: string | readonly string[];
    icon?: string;
    operator?: 'contains' | 'containsPrefix' | 'equals' | 'startsWith' | 'isGreaterThan' | 'isLessThan' | 'matches';
    options?: ContentBrowserFilters;
    query?: unknown;
    selected?: boolean;
    title?: string;
    type?: 'tree' | 'radioButton' | 'checkbox';
    value?: unknown;
}

declare type ContentBrowserFilters = {
    [key: string]: ContentBrowserFilterItem;
};

/** @public */
export declare const ContentTag: ContentTagType;

declare interface ContentTagProps<AttrDefs extends AttributeDefinitions = AttributeDefinitions> {
    tag?: string;
    content: Obj<AttrDefs> | Widget<AttrDefs> | null;
    attribute: keyof AttrDefs & string;
    dataContext?: DataContext | Obj | DataItem | DataScope | null;
    widgetProps?: WidgetProps;
    [key: string]: unknown;
}

declare type ContentTagType = {
    <AttrDefs extends AttributeDefinitions = AttributeDefinitions>(props: ContentTagProps<AttrDefs>): React_2.ReactElement | null;
};

declare type ContentValidationCallback<T extends Obj | Widget> = (content: T) => ValidationResult;

declare type ContextAttributeDescription = string;

declare interface ContextDescription {
    [contextAttributeName: string]: ContextAttributeDescription;
}

/* Excluded from this release type: CreateCallback */

/** @public */
export declare function createObjClass<Attrs extends AttributeDefinitions = AttributeDefinitions>(definition: SimpleObjClassDefinition<Attrs>): ObjClass<Attrs>;

/** @public */
export declare function createObjClass<Attrs extends AttributeDefinitions = AttributeDefinitions>(definition: ExtendObjClassDefinition<Attrs>): ObjClass<Attrs>;

/** @public */
export declare function createObjClass<Attrs extends AttributeDefinitions = AttributeDefinitions, ExtendAttrs extends AttributeDefinitions = AttributeDefinitions>(definition: MixedObjClassDefinition<Attrs, ExtendAttrs>): ObjClass<Omit<ExtendAttrs, keyof Attrs> & Attrs>;

/** @public */
export declare function createWidgetClass<Attrs extends AttributeDefinitions = AttributeDefinitions>(definition: SimpleWidgetClassDefinition<Attrs>): WidgetClass<Attrs>;

/** @public */
export declare function createWidgetClass<Attrs extends AttributeDefinitions = AttributeDefinitions>(definition: ExtendWidgetClassDefinition<Attrs>): WidgetClass<Attrs>;

/** @public */
export declare function createWidgetClass<Attrs extends AttributeDefinitions = AttributeDefinitions, ExtendAttrs extends AttributeDefinitions = AttributeDefinitions>(definition: MixedWidgetClassDefinition<Attrs, ExtendAttrs>): WidgetClass<Omit<ExtendAttrs, keyof Attrs> & Attrs>;

/** @public */
export declare function currentEditor(): Editor | null;

/** @public */
export declare const CurrentPage: React_2.ComponentType<unknown>;

/** @public */
export declare function currentPage(): Obj | null;

/** @public */
export declare function currentPageParams(): QueryParameters;

/** @public */
export declare function currentSiteId(): string | null;

/** @public */
export declare function currentUser(): User | null;

/** @public */
export declare function currentWorkspace(): Workspace;

/** @public */
export declare function currentWorkspaceId(): string;

declare interface CustomMenuItem {
    id: string;
    description?: string;
    enabled?: boolean;
    group?: string;
    icon?: string;
    onClick?: () => void;
    position?: {
        after?: string;
        before?: string;
    };
    title?: string;
}

/** @public */
export declare interface CustomPageComponentProps {
    obj: Obj;
    page: Obj;
}

/** @public */
export declare interface CustomWidgetComponentProps {
    widget: Widget;
}

declare interface Data {
    [name: string]: unknown;
}

/** @public */
declare abstract class DataClass {
    /* Excluded from this release type: name */
    /* Excluded from this release type: create */
    /* Excluded from this release type: all */
    /* Excluded from this release type: get */
    /* Excluded from this release type: getUnchecked */
}

/** @public */
declare interface DataClassEditingConfig {
    title?: string;
    attributes?: AttributesEditingConfig;
}

declare type DataContext = Record<DataIdentifier, DataContextValue>;

declare type DataContextValue = string;

declare type DataId = string;

declare type DataIdentifier = string;

/** @public */
declare abstract class DataItem {
    /* Excluded from this release type: id */
    /* Excluded from this release type: dataClass */
    /** @public */
    abstract obj(): Obj | undefined;
    /** @public */
    abstract get(attributeName: string): unknown;
    /* Excluded from this release type: update */
    /* Excluded from this release type: destroy */
}

declare type DataItemAttributes = Record<string, unknown>;

/** @public */
declare type DataItemFilters = Record<string, string>;

/** @public */
export declare class DataLocator {
    private readonly _class;
    private readonly _query?;
    private readonly _order_by?;
    private readonly _size?;
}

declare type DataLocatorAttributeName = string;

/* Excluded from this release type: DataLocatorError */

/** @public */
declare abstract class DataScope {
    /* Excluded from this release type: dataClass */
    /* Excluded from this release type: create */
    /* Excluded from this release type: get */
    /** @public */
    abstract take(): DataItem[];
    /** @public */
    abstract transform(params: DataScopeParams): DataScope;
    /** @public */
    abstract objSearch(): ObjSearch | undefined;
    /** @public */
    isEmpty(): boolean;
    /** @public */
    containsData(): boolean;
}

/** @public */
declare interface DataScopeParams {
    filters?: DataItemFilters;
    search?: string;
    order?: OrderSpec;
    limit?: number;
}

declare function _delete(path: string, options?: Options): Promise<unknown>;

/* Excluded from this release type: DeleteCallback */

declare interface DynamicComponentGroupDescription {
    title: string;
    component: string | PropertiesGroupComponent | null;
    key: string;
    properties?: readonly GroupProperty[];
    enabled?: boolean;
}

declare interface DynamicPropertiesGroupDescription extends PropertiesGroupDescription {
    key: string;
}

declare type DynamicPropertyGroup = DynamicPropertiesGroupDescription | DynamicComponentGroupDescription;

/** @public */
declare class Editor extends User {
    teams(): Team[];
    /* Excluded from this release type: authToken */
}

/** @public */
export declare function editorLanguage(): Locale_2 | null;

/** @public */
export declare function ensureUserIsLoggedIn(): void;

/** @public */
export declare function extendMenu(menuCallback: MenuCallback): void;

declare interface ExtendObjClassDefinition<ExtendAttrs extends AttributeDefinitions> extends BaseObjClassDefinition {
    extend?: ObjClass<ExtendAttrs>;
}

declare interface ExtendWidgetClassDefinition<ExtendAttrs extends AttributeDefinitions> extends BaseWidgetClassDefinition {
    extend?: WidgetClass<ExtendAttrs>;
}

/** @public */
export declare function Extensions(): React_2.ReactPortal | null;

declare type ExternalData = Record<DataIdentifier, unknown>;

declare type ExternalDataItemReadCallback = () => Promise<ExternalData>;

/** @public */
export declare function extractText(obj: Obj, options?: {
    length?: number;
}): string;

declare interface FacetQueryOptions {
    limit?: number;
    includeObjs?: number;
}

declare function fetch_2(path: string, { method, ...otherOptions }?: {
    method?: Method;
} & Options): Promise<unknown>;

declare interface FieldBoost {
    [key: string]: number;
}

declare type FilterBuilder = (c: FilterContext) => ContentBrowserFilters | undefined;

declare interface FilterContext {
    _validObjClasses?: string[];
}

/** @public */
export declare function finishLoading(): Promise<void>;

declare type ForcedEditorLanguage = 'en' | 'de' | null;

declare type ForContentCallback<T extends Obj | Widget> = (content: T) => string;

declare type FullTextSearchOperator = 'contains' | 'containsPrefix' | 'matches';

/** @public */
export declare class FutureBinary {
    into(target: Obj): Promise<Binary>;
}

declare function get(path: string, options?: Options): Promise<unknown>;

/** @public */
declare type GetCallback = (id: string) => Promise<unknown | null>;

/** @public */
export declare function getClass(name: string): AppClass | null;

declare type GroupProperty = GroupPropertyWithConfig | string;

declare type GroupPropertyWithConfig = readonly [string, {
    enabled: boolean;
}];

declare type Hash = string | null;

/** @public */
export declare const ImageTag: ImageTagType;

declare interface ImageTagProps<AttrDefs extends AttributeDefinitions = AttributeDefinitions> {
    attribute?: keyof AttrDefs & string;
    content?: Binary | Obj<AttrDefs> | Widget<AttrDefs> | null;
    width?: Width;
    onLoad?: React_2.ImgHTMLAttributes<HTMLImageElement>['onLoad'];
    [key: string]: unknown;
}

declare type ImageTagType = {
    <AttrDefs extends AttributeDefinitions = AttributeDefinitions>(props: ImageTagProps<AttrDefs>): React_2.ReactElement | null;
};

/** @public */
declare type IndexCallback = (params: IndexParams) => Promise<IndexResult>;

/** @public */
declare class IndexParams {
    private readonly _continuation;
    private readonly _params;
    constructor(_continuation: string | undefined, _params: DataScopeParams);
    continuation(): string | undefined;
    filters(): DataItemFilters;
    search(): string;
    order(): OrderSpec;
}

/** @public */
declare interface IndexResult {
    results: Array<DataId | ResultItem>;
    continuation?: string;
}

declare interface InitialContent {
    [attributeName: string]: AttributeValue | AttributeValueFunction;
}

declare type InitializeCallback<T extends Obj | Widget> = (instance: T) => void;

/** @public */
export declare function InPlaceEditingOff({ children }: {
    children: React_2.ReactNode;
}): JSX.Element | null;

/** @public */
export declare function isComparisonActive(): boolean;

/** @public */
export declare function isCurrentPage(page: Obj): boolean;

/** @public */
export declare function isEditorLoggedIn(): boolean;

/** @public */
export declare function isInPlaceEditingActive(): boolean;

/** @public */
export declare function isOnCurrentPath(page: Obj): boolean;

/** @public */
export declare function isUserLoggedIn(): boolean;

/** @public */
export declare class Link {
    constructor(attributes: LinkAttributes);
    title(): string | null;
    query(): string | null;
    hash(): string | null;
    rel(): string | null;
    target(): string | null;
    url(): string | null;
    obj(): Obj | null;
    queryParameters(): QueryParameters;
    copy(attributes: LinkAttributes): Link;
    isExternal(): boolean;
    isInternal(): boolean;
}

declare interface LinkAttributes {
    hash?: string;
    obj?: Obj | null;
    query?: string;
    rel?: string;
    target?: string;
    title?: string;
    url?: string;
}

/** @public */
export declare const LinkTag: React_2.FunctionComponent<{
    [key: string]: unknown;
    to?: Obj<AttributeDefinitions> | Link | null | undefined;
    target?: string | undefined;
    rel?: string | undefined;
    params?: false | QueryParameters | null | undefined;
    onClick?: ((e: React_2.MouseEvent<HTMLAnchorElement>) => void) | undefined;
    children?: React_2.ReactNode;
}>;

declare interface LivingComponentGroupDescriptionForUi {
    title: string;
    component: null;
    key: string;
    enabled?: boolean;
}

/** @public */
export declare function load<T>(loadableFunction: () => T): Promise<T>;

declare type Locale_2 = 'de' | 'en';

declare interface LocalizedValue {
    value: string;
    title: string;
}

/** @public */
export declare function logout(): void;

declare interface MenuBuilder {
    insert(menuItem: CustomMenuItem): void;
    modify(menuItem: MenuItem): void;
    remove(menuItemId: string): void;
}

declare type MenuCallback = (menu: MenuBuilder) => void;

declare interface MenuItem {
    id: string;
    icon?: string;
    group?: string;
    position?: {
        after?: string;
        before?: string;
    };
    title?: string;
}

/** @public */
declare class MetadataCollection {
    get(key: string): BinaryMetadataValue | null;
}

declare type Method = 'delete' | 'get' | 'patch' | 'post' | 'put' | 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';

declare interface MixedObjClassDefinition<Attrs extends AttributeDefinitions, ExtendAttrs extends AttributeDefinitions> extends BaseObjClassDefinition {
    attributes?: Attrs;
    extend?: ObjClass<ExtendAttrs>;
}

declare interface MixedWidgetClassDefinition<Attrs extends AttributeDefinitions, ExtendAttrs extends AttributeDefinitions> extends BaseWidgetClassDefinition {
    attributes?: Attrs;
    extend?: WidgetClass<ExtendAttrs>;
}

declare type Modification = null | 'new' | 'edited' | 'deleted';

declare interface MultisiteConfig {
    baseUrlForSite: BaseUrlForSiteCallback;
    siteForUrl: SiteForUrlCallback;
}

/** @public */
export declare function navigateTo(target: Target | TargetFunction, options?: Options_2): void;

declare interface NormalizedAttributeDefinitions {
    [attributeName: string]: NormalizedTypeInfo<AttributeType>;
}

declare interface NormalizedTypeConfigMapping {
    enum: {
        values: readonly string[];
    };
    multienum: {
        values: readonly string[];
    };
    reference: {
        only?: readonly string[];
    };
    referencelist: {
        only?: readonly string[];
    };
    widget: {
        only?: readonly string[];
    };
    widgetlist: {
        only?: readonly string[];
        maximum?: number;
    };
}

declare type NormalizedTypeInfo<Type extends AttributeType> = Type extends keyof NormalizedTypeConfigMapping ? [Type, NormalizedTypeConfigMapping[Type]] : [Type, {}];

/** @public */
export declare const NotFoundErrorPage: React_2.ComponentType<NotFoundErrorPageProps>;

declare interface NotFoundErrorPageProps {
    children?: React_2.ReactNode;
}

/** @public */
export declare class Obj<AttrDefs extends AttributeDefinitions = AttributeDefinitions> {
    static get(id: string): Obj | null;
    static getByPath(path: string): Obj | null;
    static getByPermalink(permalink: string): Obj | null;
    static all(): ObjSearch;
    static root(): Obj | null;
    static where(attribute: SearchField, operator: SearchOperator, value: SearchValue, boost?: FieldBoost): ObjSearch;
    static whereFullTextOf(attribute: SearchField, operator: FullTextSearchOperator, value: SearchValue, boost?: FieldBoost): ObjSearch;
    static create(attributes?: Partial<ObjAttributes<AttributeDefinitions>>): Obj;
    static createFromFile(file: File, attributes?: Partial<ObjAttributes<AttributeDefinitions>>): Promise<Obj>;
    static onAllSites(): SiteContext;
    static onSite(siteId: string): SiteContext;
    id(): string;
    objClass(): string;
    get<AttributeName extends keyof AttrDefs & string>(attributeName: AttributeName): AttributeValueOf<AttrDefs, AttributeName>;
    update(attributes: ObjUpdateAttributes<AttrDefs>): void;
    versionsOnAllSites(): Obj[];
    versionOnSite(siteId: string): Obj | null;
    createdAt(): Date | null;
    firstPublishedAt(): Date | null;
    publishedAt(): Date | null;
    lastChanged(): Date | null;
    path(): string | null;
    parent(): Obj | null;
    ancestors(): Array<Obj | null>;
    /**
     * Resolves when all previous updates have been persisted.
     * If an update fails the promise is rejected.
     */
    finishSaving(): Promise<void>;
    modification(): Modification;
    backlinks(): Obj[];
    children(): Obj[];
    orderedChildren(): Obj[];
    permalink(): string | null;
    siteId(): string | null;
    language(): string | null;
    slug(): string;
    isBinary(): boolean;
    isRestricted(): boolean;
    contentLength(): number;
    contentType(): string;
    contentUrl(): string;
    contentId(): string;
    metadata(): MetadataCollection;
    restrict(): void;
    unrestrict(): void;
    updateReferences(mapping: ReferenceMapping): Promise<void>;
    widget(id: string): Widget | null;
    widgets(): Widget[];
    copy(): Promise<Obj<AttrDefs>>;
    destroy(): void;
    attributeDefinitions(): NormalizedAttributeDefinitions;
}

declare type ObjAttributes<AttrDefs extends AttributeDefinitions> = ObjSystemAttributes & AttrDict<AttrDefs>;

declare interface ObjClass<AttrDefs extends AttributeDefinitions = AttributeDefinitions> {
    /** bogus constructor, to let TypeScript understand that this is a class. */
    new (dontUseThis: never): Obj<AttrDefs>;
    get(id: string): Obj<AttrDefs> | null;
    getByPath(path: string): Obj<AttrDefs> | null;
    getByPermalink(permalink: string): Obj<AttrDefs> | null;
    all(): ObjSearch<AttrDefs>;
    root(): Obj<AttrDefs> | null;
    where(attribute: SearchField, operator: SearchOperator, value: SearchValue, boost?: FieldBoost): ObjSearch<AttrDefs>;
    whereFullTextOf(attribute: SearchField, operator: FullTextSearchOperator, value: SearchValue, boost?: FieldBoost): ObjSearch<AttrDefs>;
    create(attributes?: ObjAttributes<AttrDefs>): Obj<AttrDefs>;
    createFromFile(file: File, attributes?: ObjAttributes<AttrDefs>): Promise<Obj<AttrDefs>>;
    onAllSites(): SiteContext<AttrDefs>;
    onSite(siteId: string): SiteContext<AttrDefs>;
}

declare interface ObjClassForContentTypeMapping {
    [key: string]: string | undefined;
}

/** @public */
export declare type ObjEditingConfig<AttrDefs extends AttributeDefinitions = AttributeDefinitions> = SharedEditingConfig<Obj<AttrDefs>> & ObjOnlyEditingConfig<AttrDefs>;

/** @public */
export declare class ObjFacetValue {
    name(): string;
    count(): number;
    includedObjs(): Obj[];
}

declare interface ObjOnlyEditingConfig<AttrDefs extends AttributeDefinitions = AttributeDefinitions> {
    descriptionForContent?: ForContentCallback<Obj<AttrDefs>>;
    thumbnailForContent?: (content: Obj<AttrDefs>) => Obj | Binary | undefined | null;
}

/** @public */
export declare class ObjSearch<AttrDefs extends AttributeDefinitions = AttributeDefinitions> {
    and(field: SearchField, operator: SearchOperator, value: SearchValue, boost?: FieldBoost): this;
    andFullTextOf(field: SearchField, operator: FullTextSearchOperator, value: SearchValue, boost?: FieldBoost): this;
    andNot(field: SearchField, operator: SearchOperator, value: SearchValue): this;
    boost(field: SearchField, operator: SearchOperator, value: SearchValue, factor: number): this;
    facet(attribute: string, options?: FacetQueryOptions): ObjFacetValue[];
    suggest(prefix: string, options?: SuggestOptions): string[];
    first(): Obj<AttrDefs> | null;
    take(count?: number): Obj<AttrDefs>[];
    toArray(): Obj<AttrDefs>[];
    offset(offset: number): this;
    order(attribute: string, direction?: 'asc' | 'desc'): this;
    order(attributes: OrderAttributes): this;
    count(): number;
}

/** @public */
export declare function objsFromDataLocator(dataLocator: DataLocator): ObjSearch;

declare type ObjSystemAttributes = {
    _contentId?: string;
    _id?: string;
    _language?: string | null;
    _path?: string | null;
    _permalink?: string | null;
    _siteId?: string | null;
};

declare type ObjUpdateAttributes<AttrDefs extends AttributeDefinitions> = Omit<ObjAttributes<AttrDefs>, '_id'>;

/** @public */
export declare function openDialog(name: string): void;

declare interface Options {
    params?: Params;
    data?: Data;
}

declare type Options_2 = OptionsWithoutConvenienceParams | (QueryParameters & OptionsWithoutConvenienceParams);

declare interface OptionsWithoutConvenienceParams {
    hash?: Hash;
    params?: QueryParameters;
}

declare type OrderAttributes = Array<string | [string] | [string, 'asc' | 'desc' | undefined]>;

/** @public */
declare type OrderSpec = Array<[string, 'asc' | 'desc']>;

/** @public */
export declare interface PageComponentProps<AttrDefs extends AttributeDefinitions = AttributeDefinitions> {
    page: Obj<AttrDefs>;
    params?: QueryParameters;
}

declare interface Params {
    [name: string]: string;
}

declare function patch(path: string, options?: Options): Promise<unknown>;

declare interface PlainBackground extends BackgroundProperties {
    image: string;
}

declare function post(path: string, options?: Options): Promise<unknown>;

/**
 * tries to pre-warm the CMS cache using a preloadDump.
 * @public
 */
export declare function preload(preloadDump: string): Promise<{
    dumpLoaded: boolean;
}>;

declare interface PreviewSize {
    title: string;
    width?: number;
    description?: string;
    icon?: string;
}

declare type Priority = 'foreground' | 'background';

declare type PropertiesCallback<T extends Obj | Widget> = (content: T) => readonly GroupProperty[];

declare type PropertiesGroupComponent = React.ComponentType<{
    obj: Obj;
} | {
    page: Obj;
} | {
    widget: Widget;
}>;

declare interface PropertiesGroupDescription {
    title: string;
    properties: readonly GroupProperty[];
    key?: string;
    enabled?: boolean;
}

declare type PropertiesGroupsCallback<T extends Obj | Widget> = (content: T) => readonly PropertyGroup[];

declare type PropertyGroup = ComponentGroupDescription | PropertiesGroupDescription | DynamicPropertyGroup;

/** @public */
export declare function provideAuthGroups(authGroups: AuthGroups): void;

/** @public */
export declare function provideComponent<AttrDefs extends AttributeDefinitions>(objClass: ObjClass<AttrDefs>, component: React_2.ComponentType<PageComponentProps<AttrDefs>>): void;

/** @public */
export declare function provideComponent(classNameOrObjClass: string | ObjClass, component: React_2.ComponentType<Partial<PageComponentProps>>): void;

/** @public */
export declare function provideComponent<AttrDefs extends AttributeDefinitions>(widgetClass: WidgetClass<AttrDefs>, component: React_2.ComponentType<WidgetComponentProps<AttrDefs>>): void;

/** @public */
export declare function provideComponent(classNameOrWidgetClass: string | WidgetClass, component: React_2.ComponentType<Partial<WidgetComponentProps>>): void;

/** @public */
export declare function provideDataClass(name: string, dataClass: {
    connection: ReadOnlyDataConnection;
}): DataClass;

/* Excluded declaration from this release type: provideDataClass */

/* Excluded from this release type: provideDataErrorComponent */

/** @public */
export declare function provideDataItem(name: string, read: ExternalDataItemReadCallback, ...excessArgs: never[]): DataItem;

/** @public */
export declare function provideEditingConfig<AttrDefs extends AttributeDefinitions = AttributeDefinitions>(objClass: ObjClass<AttrDefs>, editingConfig: ObjEditingConfig<AttrDefs>): void;

/** @public */
export declare function provideEditingConfig(objClassName: string, editingConfig: ObjEditingConfig): void;

/** @public */
export declare function provideEditingConfig<AttrDefs extends AttributeDefinitions = AttributeDefinitions>(widgetClass: WidgetClass<AttrDefs>, editingConfig: WidgetEditingConfig<AttrDefs>): void;

/** @public */
export declare function provideEditingConfig(dataClass: DataClass, editingConfig: DataClassEditingConfig): void;

/** @public */
export declare function provideEditingConfig(dataItem: DataItem, editingConfig: DataClassEditingConfig): void;

/** @public */
export declare function provideEditingConfig(widgetClassName: string, editingConfig: WidgetEditingConfig): void;

/** @public */
export declare function provideLayoutComponent<AttrDefs extends AttributeDefinitions>(objClass: ObjClass<AttrDefs>, component: React.ComponentType<{
    page: Obj<AttrDefs>;
}>): void;

/** @public */
export declare function provideLayoutComponent(objClass: ObjClass, component: React.ComponentType): void;

/** @public */
export declare function provideObjClass<Attrs extends AttributeDefinitions = AttributeDefinitions>(name: string, definition: SimpleObjClassDefinition<Attrs>): ObjClass<Attrs>;

/** @public */
export declare function provideObjClass<Attrs extends AttributeDefinitions = AttributeDefinitions>(name: string, definition: ObjClass<Attrs>): ObjClass<Attrs>;

/** @public */
export declare function provideObjClass<Attrs extends AttributeDefinitions = AttributeDefinitions>(name: string, definition: ExtendObjClassDefinition<Attrs>): ObjClass<Attrs>;

/** @public */
export declare function provideObjClass<Attrs extends AttributeDefinitions = AttributeDefinitions, ExtendAttrs extends AttributeDefinitions = AttributeDefinitions>(name: string, definition: MixedObjClassDefinition<Attrs, ExtendAttrs>): ObjClass<Omit<ExtendAttrs, keyof Attrs> & Attrs>;

/** @public */
export declare function provideWidgetClass<Attrs extends AttributeDefinitions = AttributeDefinitions>(name: string, definition: SimpleWidgetClassDefinition<Attrs>): WidgetClass<Attrs>;

/** @public */
export declare function provideWidgetClass<Attrs extends AttributeDefinitions = AttributeDefinitions>(name: string, definition: WidgetClass<Attrs>): WidgetClass<Attrs>;

/** @public */
export declare function provideWidgetClass<Attrs extends AttributeDefinitions = AttributeDefinitions>(name: string, definition: ExtendWidgetClassDefinition<Attrs>): WidgetClass<Attrs>;

/** @public */
export declare function provideWidgetClass<Attrs extends AttributeDefinitions = AttributeDefinitions, ExtendAttrs extends AttributeDefinitions = AttributeDefinitions>(name: string, definition: MixedWidgetClassDefinition<Attrs, ExtendAttrs>): WidgetClass<Omit<ExtendAttrs, keyof Attrs> & Attrs>;

declare function put(path: string, options?: Options): Promise<unknown>;

declare interface QueryParameters {
    [key: string]: string | null | Array<string | null>;
}

/** @public */
declare interface ReadOnlyDataConnection {
    index?: IndexCallback;
    get: GetCallback;
}

/* Excluded from this release type: ReadWriteDataConnection */

declare type ReferenceMapping = (refId: string) => string | undefined;

/** @public */
export declare function registerComponent<P extends Partial<CustomPageComponentProps> | Partial<CustomWidgetComponentProps>>(componentId: string, component: React_2.ComponentType<P>): void;

declare interface RegisteredComponentGroupDescription {
    title: string;
    component: string;
    properties?: readonly string[];
    enabled?: boolean;
    key?: string;
}

declare type RenderChild = (child: Obj) => React_2.ReactElement<{
    child: Obj;
}>;

/** @public */
export declare function renderPage<T>(obj: Obj, render: () => T): Promise<RenderResult<T>>;

declare interface RenderResult<T> {
    result: T;
    preloadDump: string;
}

/** @public */
export declare function resolveHtmlUrls(htmlString: string): string;

/** @public */
export declare function RestoreInPlaceEditing({ children, }: {
    children: React_2.ReactNode;
}): JSX.Element | null;

/** @public */
declare interface ResultItem extends ResultItemData {
    _id: DataId;
}

declare interface ResultItemData {
    [key: string]: unknown;
}

declare interface ScrivitoBackground extends BackgroundProperties {
    image: Obj | Binary | null | undefined;
}

/** @public */
export declare class ScrivitoError extends Error {
    __proto__?: Error;
    constructor(message?: string);
    get name(): string;
}

declare type SearchField = string | string[];

declare type SearchOperator = FullTextSearchOperator | 'equals' | 'startsWith' | 'isGreaterThan' | 'isLessThan' | 'linksTo' | 'refersTo';

declare type SearchValue = SingleSearchValue | SingleSearchValue[];

/** @public */
export declare function setVisitorIdToken(token: string): void;

declare interface SharedEditingConfig<T extends Obj | Widget> {
    attributes?: AttributesEditingConfig;
    description?: string;
    hideInSelectionDialogs?: boolean;
    initialContent?: InitialContent;
    initializeCopy?: InitializeCallback<T>;
    properties?: readonly string[] | PropertiesCallback<T>;
    propertiesGroups?: readonly PropertyGroup[] | PropertiesGroupsCallback<T>;
    thumbnail?: string;
    title?: string;
    initialize?: InitializeCallback<T>;
    titleForContent?: ForContentCallback<T>;
    validations?: ValidationsConfig<T>;
    attributeDataContext?: AttributeDataContextConfig;
}

declare interface SimpleObjClassDefinition<Attrs extends AttributeDefinitions> extends BaseObjClassDefinition {
    attributes?: Attrs;
}

declare interface SimpleWidgetClassDefinition<Attrs extends AttributeDefinitions> extends BaseWidgetClassDefinition {
    attributes?: Attrs;
}

declare type SingleSearchValue = BackendSingleSearchValue | Date | Obj;

declare interface SiteContext<AttrDefs extends AttributeDefinitions = AttributeDefinitions> {
    create(params?: ObjAttributes<AttrDefs>): Obj<AttrDefs>;
    createFromFile(file: File, attributes?: ObjAttributes<AttrDefs>): Promise<Obj<AttrDefs>>;
    get(objId: string): Obj<AttrDefs> | null;
    getIncludingDeleted(objId: string): Obj<AttrDefs> | null;
    getByPath(path: string): Obj<AttrDefs> | null;
    getByPermalink(permalink: string): Obj<AttrDefs> | null;
    root(): Obj | null;
    all(): ObjSearch<AttrDefs>;
    where(fields: SearchField, operator: SearchOperator, value: SearchValue, boost?: FieldBoost): ObjSearch<AttrDefs>;
    whereFullTextOf(fields: SearchField, operator: FullTextSearchOperator, value: SearchValue, boost?: FieldBoost): ObjSearch<AttrDefs>;
}

declare type SiteForUrlCallback = (url: string) => SiteForUrlResult;

declare type SiteForUrlResult = {
    siteId: string;
    baseUrl: string;
} | undefined;

declare type SiteMappingConfiguration = ClassicConfig | MultisiteConfig;

declare interface SuggestOptions {
    attributes?: string[];
    limit?: number;
}

declare type Target = Obj | Link | null;

declare type TargetFunction = () => Target;

/** @public */
declare class Team {
    id(): string;
    name(): string;
    description(): string;
}

declare type ToolbarButton = 'blockquote' | 'bold' | 'bulletList' | 'clean' | 'code' | 'codeBlock' | 'header1' | 'header2' | 'header3' | 'header4' | 'header5' | 'header6' | 'indent' | 'italic' | 'link' | 'mark' | 'orderedList' | 'outdent' | 'strikethrough' | 'subscript' | 'superscript' | 'underline';

declare interface TransformationDefinition {
    height?: number;
    width?: number;
}

declare interface UiContext {
    theme: UiTheme;
}

/** @public */
export declare function uiContext(): UiContext | null;

declare type UiTheme = 'dark' | 'light';

/** @public */
export declare const unstable_JrRestApi: {
    delete: typeof _delete;
    fetch: typeof fetch_2;
    get: typeof get;
    patch: typeof patch;
    post: typeof post;
    put: typeof put;
};

/* Excluded from this release type: UpdateCallback */

/** @public */
export declare function updateContent(): Promise<void>;

/** @public */
export declare function updateMenuExtensions(): void;

/** @public */
export declare function urlFor(target: Binary | Link | Obj, options?: UrlForOptions): string;

declare interface UrlForOptions {
    readonly query?: string;
    readonly hash?: string;
    readonly fragment?: string;
}

/** @public */
export declare function useDataItem(): DataItem | undefined;

/** @public */
export declare function useDataLocator(dataLocator: DataLocator | null | undefined): DataScope;

/* Excluded from this release type: useDataScope */

/** @public */
export declare function useHistory(historyToUse: History_2): void;

/** @public */
declare class User {
    id(): string;
    name(): string;
    email(): string;
}

declare type ValidationResult = string | string[] | ValidationResultObject | false | null | undefined;

declare interface ValidationResultObject {
    message: string;
    severity?: ValidationSeverityLevel;
}

/** @public */
export declare function validationResultsFor(model: Obj | Widget, attributeName: string): ValidationResultObject[];

declare type ValidationsConfig<T extends Obj | Widget> = ReadonlyArray<ContentValidationCallback<T> | AttributeValidations<T>>;

declare type ValidationSeverityLevel = 'error' | 'warning' | 'info';

/** @public */
export declare class Widget<AttrDefs extends AttributeDefinitions = AttributeDefinitions> {
    constructor(attributes?: AttrDict<AttrDefs>);
    id(): string;
    objClass(): string;
    get<AttributeName extends keyof AttrDefs & string>(attributeName: AttributeName): AttributeValueOf<AttrDefs, AttributeName>;
    update(attributes: AttrDict<AttrDefs>): void;
    obj(): Obj;
    widgets(): Widget[];
    copy(): Widget<AttrDefs>;
    destroy(): void;
    container(): Obj | Widget;
    attributeDefinitions(): NormalizedAttributeDefinitions;
}

declare interface WidgetClass<AttrDefs extends AttributeDefinitions = AttributeDefinitions> {
    new (attributes?: AttrDict<AttrDefs>): Widget<AttrDefs>;
}

/** @public */
export declare interface WidgetComponentProps<AttrDefs extends AttributeDefinitions = AttributeDefinitions> {
    widget: Widget<AttrDefs>;
}

/** @public */
export declare type WidgetEditingConfig<AttrDefs extends AttributeDefinitions = AttributeDefinitions> = SharedEditingConfig<Widget<AttrDefs>>;

declare interface WidgetProps {
    [key: string]: unknown;
}

/** @public */
export declare const WidgetTag: React_2.ComponentType<WidgetTagProps>;

declare type WidgetTagProps = React_2.HTMLAttributes<HTMLElement> & {
    tag?: string;
};

declare type Width = React_2.ImgHTMLAttributes<HTMLImageElement>['width'];

/** @public */
declare class Workspace {
    id(): string;
    title(): string;
}

export { }
