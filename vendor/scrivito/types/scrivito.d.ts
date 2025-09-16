/// <reference types="react" />

import { History as History_2 } from 'history';
import * as React_2 from 'react';

declare interface AndFilterSpec {
    operator: 'and';
    value: FilterSpec[];
}

declare interface AndOperatorSpec {
    operator: 'and';
    value: OperatorSpec[];
}

/** given a 'fetch' method, construct an ApiClient which offers convenience
 * methods for getting, putting etc.
 */
declare class ApiClient {
    private readonly fetchCallback;
    private readonly options?;
    constructor(fetchCallback: Fetch, options?: ApiClientOptions | undefined);
    fetch(path: string, options?: FetchOptions): Promise<unknown>;
    get(path: string, options?: FetchOptions): Promise<unknown>;
    getWithoutLogin(path: string, options?: FetchOptions): Promise<unknown>;
    post(path: string, options?: FetchOptions): Promise<unknown>;
    put(path: string, options?: FetchOptions): Promise<unknown>;
    patch(path: string, options?: FetchOptions): Promise<unknown>;
    delete(path: string, options?: FetchOptions): Promise<unknown>;
}

declare interface ApiClientBaseOptions {
    audience?: string;
    headers?: ApiClientHeaders;
    credentials?: RequestCredentials;
}

declare type ApiClientHeaders = HeadersInit | ({
    Authorization: null;
} & Record<string, string | null>);

/** @public */
export declare type ApiClientOptions = ApiClientBaseOptions & AuthViaOptions;

declare type AppClass<AttrDefs extends AttributeDefinitions = AttributeDefinitions> = ObjClass<AttrDefs> | WidgetClass<AttrDefs>;

/** @public */
export declare class ArgumentError extends ScrivitoError {
    constructor(message: string);
}

declare type AsyncOrSync<Type> = Promise<Type> | Type;

declare type AsyncOrSync_2<Type> = Promise<Type> | Type;

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
    restrictDataTo?: RestrictDataTo;
    values?: readonly LocalizedValue[];
    options?: AttributeEditingOptions;
    iteratesOver?: IteratesOver;
    editor?: AttributeEditor;
}

declare interface AttributeEditingOptions {
    allowedTags?: readonly (keyof React_2.JSX.IntrinsicElements)[];
    multiLine?: boolean;
    showHtmlSource?: boolean;
    toolbar?: readonly ToolbarButton[];
}

declare type AttributeEditor = 'colorPicker';

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

declare type AttributeTypeWithOmittedConfig = Exclude<CmsAttributeType, AttributeTypeWithMandatoryConfig | AttributeTypeWithoutConfig>;

declare type AttributeTypeWithoutConfig = Exclude<CmsAttributeType, keyof AttributeTypeToConfigMapping>;

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

declare type AuthViaOptions = {
    authViaAccount?: string;
    authViaInstance?: never;
} | {
    authViaInstance?: string;
    authViaAccount?: never;
};

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
    ref?: React_2.Ref<Element>;
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
    readonly details: object;
    readonly httpStatus?: number | undefined;
    readonly requestDetails: ClientErrorRequestDetails;
    constructor(message: string, code: string | undefined, details: object, httpStatus?: number | undefined, requestDetails?: ClientErrorRequestDetails);
}

declare interface ClientErrorRequestDetails {
    url?: string;
    method?: string;
}

declare type CmsAttributeType = 'binary' | 'boolean' | 'datalocator' | 'date' | 'datetime' | 'enum' | 'float' | 'html' | 'integer' | 'link' | 'linklist' | 'multienum' | 'reference' | 'referencelist' | 'string' | 'stringlist' | 'widget' | 'widgetlist';

declare interface CommonProvideDataClassParams {
    attributes?: LazyAsyncDataAttributeDefinitions;
    title?: LazyAsyncDataClassTitle;
    refetchOnWindowFocus?: false;
}

declare type CommonProvideDataItemParams = {
    attributes?: LazyAsyncDataAttributeDefinitions;
    title?: LazyAsyncDataClassTitle;
};

declare type ComponentGroupDescription = LivingComponentGroupDescription | RegisteredComponentGroupDescription;

declare type ComponentType<P = object> = React_2.ComponentClass<P> | SyncFunctionComponent<P>;

declare interface Configuration {
    tenant: string;
    adoptUi?: boolean | string;
    autoConvertAttributes?: boolean;
    baseUrlForSite?: SiteMappingConfiguration['baseUrlForSite'];
    endpoint?: string;
    constraintsValidation?: ConstraintsValidationCallback;
    homepage?: () => Obj | null;
    origin?: string;
    routingBasePath?: string;
    siteForUrl?: SiteMappingConfiguration['siteForUrl'];
    visitorAuthentication?: boolean;
    apiKey?: string | IamApiKey;
    priority?: Priority;
    editorLanguage?: ForcedEditorLanguage;
    extensionsUrl?: string;
    strictSearchOperators?: boolean;
    optimizedWidgetLoading?: boolean;
    contentTagsForEmptyAttributes?: boolean;
    iamAuthLocation?: string;
    treatLocalhostLike?: string;
    activateDataIntegration?: boolean;
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
export declare function configureContentBrowser(configuration: Readonly<Partial<Configuration_2>>): void;

/** @public */
export declare function configureCropAspectRatios(cropAspectRatios: CropAspectRatio[]): void;

/** @public */
export declare function configureObjClassForContentType(configuration: ObjClassForContentTypeMapping): void;

/** @public */
export declare function configurePreviewSizes(previewSizes: PreviewSize[]): void;

/** @public */
export declare function connect<Props extends LoadingProps, LoadingProps>(component: SyncFunctionComponent<Props>, options?: ConnectOptions<LoadingProps>): SyncFunctionComponent<Props>;

/** @public */
export declare function connect<Props extends LoadingProps, LoadingProps>(component: React_2.ComponentClass<Props>, options?: ConnectOptions<LoadingProps>): React_2.ComponentClass<Props>;

/** @public */
export declare function connect<Props extends LoadingProps, LoadingProps>(component: ComponentType<Props>, options?: ConnectOptions<LoadingProps>): ComponentType<Props>;

declare interface ConnectOptions<LoadingProps> {
    loading?: ComponentType<LoadingProps>;
}

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
    renderEmptyAttribute?: boolean;
    ref?: React_2.Ref<Element>;
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

/** @public */
declare type CreateCallback = (data: ExternalData) => Promise<DataConnectionResultItem>;

/** @public */
export declare function createObjClass<Attrs extends AttributeDefinitions = AttributeDefinitions>(definition: SimpleObjClassDefinition<Attrs>): ObjClass<Attrs>;

/** @public */
export declare function createObjClass<Attrs extends AttributeDefinitions = AttributeDefinitions>(definition: ExtendObjClassDefinition<Attrs>): ObjClass<Attrs>;

/** @public */
export declare function createObjClass<Attrs extends AttributeDefinitions = AttributeDefinitions, ExtendAttrs extends AttributeDefinitions = AttributeDefinitions>(definition: MixedObjClassDefinition<Attrs, ExtendAttrs>): ObjClass<Omit<ExtendAttrs, keyof Attrs> & Attrs>;

/** @public */
export declare function createRestApiClient(baseUrl: string, options?: ApiClientOptions): ApiClient;

/** @public */
export declare function createWidgetClass<Attrs extends AttributeDefinitions = AttributeDefinitions>(definition: SimpleWidgetClassDefinition<Attrs>): WidgetClass<Attrs>;

/** @public */
export declare function createWidgetClass<Attrs extends AttributeDefinitions = AttributeDefinitions>(definition: ExtendWidgetClassDefinition<Attrs>): WidgetClass<Attrs>;

/** @public */
export declare function createWidgetClass<Attrs extends AttributeDefinitions = AttributeDefinitions, ExtendAttrs extends AttributeDefinitions = AttributeDefinitions>(definition: MixedWidgetClassDefinition<Attrs, ExtendAttrs>): WidgetClass<Omit<ExtendAttrs, keyof Attrs> & Attrs>;

declare interface CropAspectRatio {
    title: string;
    aspectRatio: number;
}

/** @public */
export declare function currentEditor(): Editor | null;

/** @public */
export declare function currentLanguage(): string | null;

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

declare type DataAttributeConfigs = {
    boolean: LocalizedAttributeConfig;
    date: LocalizedAttributeConfig;
    enum: EnumAttributeConfig;
    number: LocalizedAttributeConfig;
    reference: ReferenceAttributeConfig;
    string: LocalizedAttributeConfig;
    unknown: UnknownAttributeConfig;
};

declare type DataAttributeDefinition = DataAttributeDefinitionWithOptionalConfig | DataAttributeDefinitionWithConfig;

/** @public */
export declare interface DataAttributeDefinitions {
    [attributeName: string]: DataAttributeDefinition;
}

declare type DataAttributeDefinitionWithConfig = {
    [T in keyof DataAttributeConfigs]: readonly [T, DataAttributeConfigs[T]];
}[keyof DataAttributeConfigs];

declare type DataAttributeDefinitionWithOptionalConfig = Exclude<DataAttributeType, 'enum' | 'reference'>;

declare type DataAttributeType = 'boolean' | 'date' | 'enum' | 'number' | 'reference' | 'string' | 'unknown';

/** @public */
export declare abstract class DataClass {
    /** @public */
    abstract create(attributes: DataItemAttributes): Promise<DataItem>;
    /** @public */
    abstract all(): DataScope;
    /** @public */
    abstract get(id: string): DataItem | null;
    /* Excluded from this release type: getUnchecked */
    /** @public */
    abstract name(): string;
    /** @public */
    attributeDefinitions(): NormalizedDataAttributeDefinitions;
}

/** @public */
declare interface DataClassEditingConfig {
    title?: string;
    attributes?: AttributesEditingConfig;
}

declare type DataClassName = string;

declare type DataClassTitle = string | undefined;

/** @public */
export declare interface DataConnection {
    index: IndexCallback;
    get: GetCallback;
    create: CreateCallback;
    update: UpdateCallback;
    delete: DeleteCallback;
}

/** @public */
export declare class DataConnectionError extends ScrivitoError {
    readonly message: string;
    constructor(message: string);
}

/** @public */
export declare type DataConnectionFilters = Record<string, FilterSpec | AndFilterSpec>;

/** @public */
export declare class DataConnectionIndexParams {
    private readonly _continuation;
    private readonly _params;
    constructor(_continuation: string | undefined, _params: Params);
    continuation(): string | undefined;
    filters(): DataConnectionFilters;
    search(): string;
    order(): OrderSpec;
    limit(): number;
    includeCount(): boolean;
}

/** @public */
export declare type DataConnectionResultItem = ResultItemNumericConvenienceId | ResultItemNumericId | ResultItemConvenienceId | ResultItemStringId;

declare type DataContext = Record<DataIdentifier, DataContextValue>;

declare type DataContextValue = string;

declare type DataId = string;

/** @public */
declare type DataIdentifier = string;

/** @public */
export declare abstract class DataItem {
    /** @public */
    abstract id(): string;
    /** @public */
    abstract dataClass(): DataClass;
    /** @public */
    abstract dataClassName(): string;
    /** @public */
    abstract obj(): Obj | undefined;
    /** @public */
    abstract get(attributeName: string): unknown;
    /** @public */
    abstract update(attributes: DataItemAttributes): Promise<void>;
    /** @public */
    abstract delete(): Promise<void>;
    /** @public */
    attributeDefinitions(): NormalizedDataAttributeDefinitions;
}

declare class DataItemAttribute {
    private readonly _dataItem;
    private readonly _attributeName;
    constructor(_dataItem: DataItem, _attributeName: string);
    dataClass(): DataClass;
    dataClassName(): string;
    dataItem(): DataItem;
    attributeName(): string;
    get(): unknown;
    update(value: unknown): Promise<void>;
}

/** @public */
declare type DataItemAttributes = Record<string, unknown>;

/** @public */
export declare class DataLocator {
    private readonly _class;
    private readonly _field?;
    private readonly _viaRef?;
    private readonly _query?;
    private readonly _order_by?;
    private readonly _size?;
}

declare type DataLocatorAttributeName = string;

/** @public */
export declare abstract class DataScope {
    /** @public */
    abstract dataClass(): DataClass | null;
    /** @public */
    abstract dataClassName(): string | null;
    /* Excluded from this release type: get */
    /** @public */
    abstract create(attributes: DataItemAttributes): Promise<DataItem>;
    /** @public */
    abstract take(): DataItem[];
    /** @public */
    abstract transform(params: DataScopeParams): DataScope;
    /** @public */
    abstract objSearch(): ObjSearch | undefined;
    /** @public */
    abstract count(): number | null;
    /** @public */
    abstract isDataItem(): boolean;
    /** @public */
    abstract dataItem(): DataItem | null;
    /** @public */
    abstract attributeName(): string | null;
    /** @public */
    dataItemAttribute(): DataItemAttribute | null;
    /** @public */
    isEmpty(): boolean;
    /** @public */
    containsData(): boolean;
    /** @public */
    abstract limit(): number | undefined;
    protected attributesFromFilters(filters?: NormalizedDataScopeFilters): Record<string, unknown> | undefined;
}

/** @public */
declare type DataScopeFilters = Record<string, DataScopeFilterValue | DataScopeOperatorSpec | AndOperatorSpec>;

declare type DataScopeFilterValue = FilterValue | Date | DataItem;

declare interface DataScopeOperatorSpec {
    operator: FilterOperator;
    value: DataScopeFilterValue;
}

/** @public */
declare interface DataScopeParams {
    filters?: DataScopeFilters;
    search?: string;
    order?: OrderSpec;
    limit?: number;
    attributeName?: string;
}

/** @public */
declare type DeleteCallback = (id: string) => Promise<unknown>;

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
export declare function editorLanguage(): Locale | null;

declare type EmptyDataAttributeDefinition = [undefined, object];

/** @public */
export declare function ensureUserIsLoggedIn(params?: EnsureUserIsLoggedInParams): void;

declare interface EnsureUserIsLoggedInParams {
    idp?: string;
}

declare interface EnumAttributeConfig extends LocalizedAttributeConfig {
    values: readonly EnumValueConfig[];
}

declare type EnumValueConfig = string | LocalizedEnumValueConfig;

declare type EqOpCode = 'eq';

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

declare type ExternalDataItemConnection = {
    get: ExternalDataItemGetCallback;
    update?: ExternalDataItemUpdateCallback;
};

declare type ExternalDataItemGetCallback = () => Promise<unknown>;

declare type ExternalDataItemUpdateCallback = (data: ExternalData) => Promise<unknown>;

/** @public */
export declare function extractText(obj: Obj, options?: {
    length?: number;
}): string;

declare interface FacetQueryOptions {
    limit?: number;
    includeObjs?: number;
}

declare type Fetch = (path: string, options?: FetchOptions) => Promise<unknown>;

declare interface FetchBaseOptions extends ApiClientBaseOptions {
    params?: FetchParams;
    data?: FetchData | FormData;
    method?: Method;
    loginHandler?: LoginHandler;
}

declare interface FetchData {
    [name: string]: unknown;
}

declare type FetchOptions = FetchBaseOptions & AuthViaOptions;

declare interface FetchParams {
    [name: string]: string | null | undefined;
}

declare interface FieldBoost {
    [key: string]: number;
}

declare type FilterBuilder = (c: FilterContext) => ContentBrowserFilters | undefined;

declare interface FilterContext {
    _validObjClasses?: string[];
}

declare type FilterOperator = 'equals' | 'notEquals' | 'isGreaterThan' | 'isLessThan' | 'isGreaterThanOrEquals' | 'isLessThanOrEquals';

declare interface FilterSpec extends OperatorSpec {
    opCode: OpCode;
}

declare type FilterValue = string | number | boolean | null;

/** @public */
export declare function finishLoading(): Promise<void>;

declare type ForcedEditorLanguage = 'en' | 'de' | 'fr' | null;

declare type ForContentCallback<T extends Obj | Widget> = (content: T) => string;

declare type FullTextSearchOperator = 'contains' | 'containsPrefix' | 'matches';

declare type FuncOrAsyncOrSync<Type> = (() => AsyncOrSync<Type>) | AsyncOrSync<Type>;

/** @public */
export declare class FutureBinary {
    into(target: Obj): Promise<Binary>;
}

/** @public */
declare type GetCallback = (id: string) => Promise<unknown | null>;

/** @public */
export declare function getClass(name: string): AppClass | null;

/** @public */
export declare function getDataClass(dataClassName: string): DataClass | null;

/** @public */
export declare function getInstanceId(): string;

declare type GroupProperty = GroupPropertyWithConfig | string;

declare type GroupPropertyWithConfig = readonly [string, {
    enabled: boolean;
}];

declare type Hash = string | null;

declare interface IamApiKey {
    clientId: string;
    clientSecret: string;
}

/** @public */
export declare const ImageTag: ImageTagType;

declare interface ImageTagProps<AttrDefs extends AttributeDefinitions = AttributeDefinitions> {
    attribute?: keyof AttrDefs & string;
    content?: Binary | Obj<AttrDefs> | Widget<AttrDefs> | null;
    width?: Width;
    onLoad?: React_2.ImgHTMLAttributes<HTMLImageElement>['onLoad'];
    ref?: React_2.Ref<Element>;
    [key: string]: unknown;
}

declare type ImageTagType = {
    <AttrDefs extends AttributeDefinitions = AttributeDefinitions>(props: ImageTagProps<AttrDefs>): React_2.ReactElement | null;
};

/** @public */
declare type IndexCallback = (params: DataConnectionIndexParams) => Promise<IndexResult | DataConnectionError>;

/** @public */
declare interface IndexResult {
    results: Array<DataId | number | DataConnectionResultItem>;
    continuation?: string | null;
    count?: IndexResultCount;
}

declare type IndexResultCount = number | string | null;

declare interface InitialContent {
    [attributeName: string]: AttributeValue | AttributeValueFunction;
}

declare type InitializeCallback<T extends Obj | Widget> = (instance: T) => void;

/** @public */
export declare function InPlaceEditAsPageContent({ children, }: {
    children: React_2.ReactNode;
}): string | number | bigint | boolean | Iterable<React_2.ReactNode> | Promise<string | number | bigint | boolean | React_2.ReactPortal | React_2.ReactElement<unknown, string | React_2.JSXElementConstructor<any>> | Iterable<React_2.ReactNode> | null | undefined> | React_2.JSX.Element | null | undefined;

/** @public */
export declare const InPlaceEditingOff: React_2.FC<React_2.PropsWithChildren>;

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

declare type IteratesOver = 'data';

declare interface LayoutComponentProps<AttrDefs extends AttributeDefinitions = AttributeDefinitions> {
    page: Obj<AttrDefs>;
}

declare type LazyAsync<T> = T | Promise<T> | (() => T | Promise<T>);

declare type LazyAsyncDataAttributeDefinitions = LazyAsync<DataAttributeDefinitions>;

declare type LazyAsyncDataClassTitle = LazyAsync<DataClassTitle>;

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
export declare const LinkTag: SyncFunctionComponent<    {
[key: string]: unknown;
to?: LinkTagTo | undefined;
target?: string | undefined;
rel?: string | undefined;
params?: false | QueryParameters | null | undefined;
onClick?: ((e: React_2.MouseEvent<HTMLAnchorElement>) => void) | undefined;
children?: React_2.ReactNode;
ref?: React_2.Ref<HTMLAnchorElement | null> | undefined;
}>;

declare type LinkTagTo = Obj | Link | DataItem | string | null;

declare interface LivingComponentGroupDescription {
    title: string;
    component: PropertiesGroupComponent;
    key: string;
    enabled?: boolean;
}

/** @public */
export declare function load<T>(loadableFunction: () => T): Promise<T>;

declare type Locale = 'de' | 'fr' | 'en';

declare type LocalizedAttributeConfig = {
    title?: string;
};

declare interface LocalizedEnumAttributeConfig extends EnumAttributeConfig {
    values: Array<LocalizedEnumValueConfig>;
}

declare type LocalizedEnumValueConfig = {
    value: string;
    title: string;
};

declare interface LocalizedValue {
    value: string;
    title: string;
}

declare type LoginHandler<T = unknown> = (visit: string) => Promise<T>;

/** @public */
export declare function logout(returnTo?: string): void;

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
export declare function navigateTo(target: Target | TargetFunction, options?: Options): void;

declare type NeqOpCode = 'neq';

declare type NormalizedAttributeDefinition = NormalizedTypeInfo<CmsAttributeType>;

declare interface NormalizedAttributeDefinitions {
    [attributeName: string]: NormalizedAttributeDefinition;
}

declare interface NormalizedDataAttributeConfigs extends DataAttributeConfigs {
    enum: LocalizedEnumAttributeConfig;
}

declare type NormalizedDataAttributeDefinition = [DataAttributeDefinitionWithOptionalConfig, object] | NormalizedDataAttributeDefinitionWithConfig;

declare interface NormalizedDataAttributeDefinitions {
    [attributeName: string]: NormalizedDataAttributeDefinition;
}

declare type NormalizedDataAttributeDefinitionWithConfig = {
    [T in keyof NormalizedDataAttributeConfigs]: [
    T,
    NormalizedDataAttributeConfigs[T]
    ];
}[keyof NormalizedDataAttributeConfigs];

declare type NormalizedDataScopeFilters = Record<string, OperatorSpec | AndOperatorSpec>;

declare interface NormalizedDataScopeParams extends DataScopeParams {
    filters?: NormalizedDataScopeFilters;
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

declare type NormalizedTypeInfo<Type extends CmsAttributeType> = Type extends keyof NormalizedTypeConfigMapping ? [Type, NormalizedTypeConfigMapping[Type]] : [Type, object];

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
    static attributeDefinitions(): NormalizedAttributeDefinitions;
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
    /** @deprecated Use `Obj#delete` instead */
    destroy(): void;
    delete(): void;
    attributeDefinitions(): NormalizedAttributeDefinitions;
}

declare type ObjAttributes<AttrDefs extends AttributeDefinitions> = ObjSystemAttributes & AttrDict<AttrDefs>;

/** @public */
export declare interface ObjClass<AttrDefs extends AttributeDefinitions = AttributeDefinitions> {
    /** bogus constructor, to let TypeScript understand that this is a class. */
    new (dontUseThis: {
        dontUseThis: never;
    }): Obj<AttrDefs>;
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
    attributeDefinitions(): NormalizedAttributeDefinitions;
}

declare interface ObjClassForContentTypeMapping {
    [key: string]: string | undefined;
}

/** @public */
export declare type ObjEditingConfig<AttrDefs extends AttributeDefinitions = AttributeDefinitions> = SharedEditingConfig<Obj<AttrDefs>> & ObjOnlyEditingConfig<AttrDefs>;

/** @public */
export declare type ObjEditingConfigAttributes = Required<ObjEditingConfig>['attributes'];

/** @public */
export declare type ObjEditingConfigInitialContent = Required<ObjEditingConfig>['initialContent'];

/** @public */
export declare type ObjEditingConfigValidations = Required<ObjEditingConfig>['validations'];

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
    andIsChildOf(obj: Obj): this;
    andIsInsideSubtreeOf(obj: Obj): this;
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

declare type ObjSystemAttributes = {
    _contentId?: string;
    _id?: string;
    _language?: string | null;
    _path?: string | null;
    _permalink?: string | null;
    _siteId?: string | null;
};

declare type ObjUpdateAttributes<AttrDefs extends AttributeDefinitions> = Omit<ObjAttributes<AttrDefs>, '_id'>;

declare type OpCode = NeqOpCode | EqOpCode | RelationalOpCode;

/** @public */
export declare function openDialog(name: string): void;

/** @public */
declare interface OperatorSpec extends DataScopeOperatorSpec {
    value: FilterValue;
}

declare type Options = OptionsWithoutConvenienceParams | (QueryParameters & OptionsWithoutConvenienceParams);

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

declare interface Params extends NormalizedDataScopeParams {
    limit: number;
    count: boolean;
}

/** @public */
export declare function performWithIamToken<T>(audience: string, callback: (token: string) => Promise<ResultOrFail<T>>): Promise<T>;

declare interface PlainBackground extends BackgroundProperties {
    image: string;
}

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

declare type PropertiesGroupComponent = React_2.ComponentType<{
    obj: Obj;
}> | React_2.ComponentType<{
    page: Obj;
}> | React_2.ComponentType<{
    widget: Widget;
}> | React_2.ComponentType<{
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

declare type PropertiesGroupsCallback<T extends Obj | Widget> = (content: T) => readonly DynamicPropertyGroup[];

declare type PropertyGroup = ComponentGroupDescription | PropertiesGroupDescription | DynamicPropertyGroup;

/** @public */
export declare function provideAuthGroups(authGroups: AuthGroups): void;

/** @public */
export declare function provideComponent<AttrDefs extends AttributeDefinitions>(objClass: ObjClass<AttrDefs>, component: ComponentType<PageComponentProps<AttrDefs>>, options?: ProvidedComponentOptions<PageComponentProps<AttrDefs>>): void;

/** @public */
export declare function provideComponent(classNameOrObjClass: string | ObjClass, component: ComponentType<Partial<PageComponentProps>>, options?: ProvidedComponentOptions<Partial<PageComponentProps>>): void;

/** @public */
export declare function provideComponent<AttrDefs extends AttributeDefinitions>(widgetClass: WidgetClass<AttrDefs>, component: ComponentType<WidgetComponentProps<AttrDefs>>, options?: ProvidedComponentOptions<WidgetComponentProps<AttrDefs>>): void;

/** @public */
export declare function provideComponent(classNameOrWidgetClass: string | WidgetClass, component: ComponentType<Partial<WidgetComponentProps>>, options?: ProvidedComponentOptions<Partial<WidgetComponentProps>>): void;

/** @public */
export declare function provideDataClass(name: string, params: FuncOrAsyncOrSync<ProvideDataClassParamsWithRestApi | ({
    connection: AsyncOrSync<Partial<DataConnection>>;
} & CommonProvideDataClassParams)>): DataClass;

declare type ProvideDataClassParamsWithRestApi = {
    restApi: AsyncOrSync<RestApi>;
} & CommonProvideDataClassParams;

/* Excluded from this release type: provideDataErrorComponent */

/** @public */
export declare function provideDataItem(name: string, get: ExternalDataItemConnection['get']): DataItem;

/** @public */
export declare function provideDataItem(name: string, params: AsyncOrSync_2<ProvideDataItemParams>): DataItem;

/** @public */
export declare function provideDataItem(name: string, connection: AsyncOrSync_2<ExternalDataItemConnection>): DataItem;

declare type ProvideDataItemParams = ({
    restApi: AsyncOrSync_2<RestApi>;
} & CommonProvideDataItemParams) | ({
    connection: AsyncOrSync_2<ExternalDataItemConnection>;
} & CommonProvideDataItemParams);

declare interface ProvidedComponentOptions<Props> {
    loading?: ComponentType<Props>;
}

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
export declare function provideLayoutComponent<AttrDefs extends AttributeDefinitions = AttributeDefinitions>(objClass: ObjClass<AttrDefs>, component: ComponentType<LayoutComponentProps<AttrDefs>>, options?: ProvidedComponentOptions<LayoutComponentProps<AttrDefs>>): void;

/** @public */
export declare function provideLayoutComponent(objClass: ObjClass, component: ComponentType, options?: ProvidedComponentOptions<LayoutComponentProps>): void;

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

declare interface QueryParameters {
    [key: string]: string | null | Array<string | null>;
}

declare interface ReferenceAttributeConfig extends LocalizedAttributeConfig {
    to: DataClassName;
    reverseTitle?: string;
}

declare type ReferenceMapping = (refId: string) => string | undefined;

/** @public */
export declare function registerComponent<P extends Partial<CustomPageComponentProps> | Partial<CustomWidgetComponentProps>>(componentId: string, component: ComponentType<P>): void;

declare interface RegisteredComponentGroupDescription {
    title: string;
    component: string;
    properties?: readonly GroupProperty[];
    enabled?: boolean;
    key?: string;
}

declare type RelationalOpCode = 'gt' | 'lt' | 'gte' | 'lte';

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

declare type RestApi = string | ({
    url: string;
} & ApiClientOptions);

/** @public */
export declare const RestoreInPlaceEditing: React_2.FC<React_2.PropsWithChildren>;

declare type RestrictDataTo = Array<'scope' | 'item' | 'scopeAttribute' | 'itemAttribute'>;

declare interface ResultItemConvenienceId extends ResultItemData {
    _id?: undefined;
    id: DataId;
}

declare interface ResultItemData {
    [key: string]: unknown;
}

declare interface ResultItemNumericConvenienceId extends ResultItemData {
    _id?: undefined;
    id: number;
}

declare interface ResultItemNumericId extends ResultItemData {
    _id: number;
}

declare interface ResultItemStringId extends ResultItemData {
    _id: DataId;
}

declare type ResultOrFail<T> = {
    result: T;
} | {
    authenticationFailed: {
        error: string;
        code: string;
        details?: object;
    };
};

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
    properties?: readonly GroupProperty[] | PropertiesCallback<T>;
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

declare type SyncFunctionComponent<P = object> = {
    (props: P): React_2.ReactNode;
    displayName?: string | undefined;
};

declare type Target = Obj | Link | DataItem | string | null;

declare type TargetFunction = () => Target;

/** @public */
declare class Team {
    id(): string;
    name(): string;
    description(): string;
}

declare type ToolbarButton = 'abbr' | 'blockquote' | 'bold' | 'bulletList' | 'clean' | 'code' | 'codeBlock' | 'header1' | 'header2' | 'header3' | 'header4' | 'header5' | 'header6' | 'indent' | 'italic' | 'link' | 'mark' | 'orderedList' | 'outdent' | 'strikethrough' | 'subscript' | 'superscript' | 'underline';

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

declare interface UnknownAttributeConfig extends LocalizedAttributeConfig {
    type?: string;
}

/* Excluded from this release type: unstable_deleteOfflineStore */

/* Excluded from this release type: unstable_enableOfflineStore */

/* Excluded from this release type: unstable_enterOfflineMode */

/* Excluded from this release type: unstable_isInOfflineMode */

/* Excluded from this release type: unstable_isOfflineStoreEnabled */

/* Excluded from this release type: unstable_leaveOfflineMode */

/* Excluded from this release type: unstable_selectImageFromContentBrowser */

/** @public */
declare type UpdateCallback = (id: string, data: ExternalData) => Promise<unknown>;

/** @public */
export declare function updateContent(): Promise<void>;

/** @public */
export declare function updateMenuExtensions(): void;

/** @public */
export declare function urlFor(target: Binary | Link | Obj, options?: UrlForOptions): string;

/** @public */
export declare function urlForDataItem(dataItem: DataItem): string | null;

declare interface UrlForOptions {
    readonly query?: string;
    readonly hash?: string;
    readonly fragment?: string;
}

/** @public */
export declare function useAttributeDefinition(): NormalizedDataAttributeDefinition | EmptyDataAttributeDefinition;

/** @public */
export declare function useContent<A extends keyof AttributeDefinitions & string>(content: Obj | Widget, attributeName: string): AttributeValueOf<AttributeDefinitions, A>;

/** @public */
export declare function useData(): DataScope;

/** @public */
export declare function useDataItem(dataClassName?: string): DataItem | undefined;

/** @public */
export declare function useDataLocator(dataLocator: DataLocator | null | undefined): DataScope;

/** @public */
export declare function useDataScope(dataClassName?: string): DataScope | undefined;

/** @public */
export declare function useHistory(historyToUse: History_2): void;

/** @public */
declare class User {
    id(): string;
    name(): string;
    email(): string;
    picture(): string | null;
}

/** @public */
export declare function useResolvedHtmlValue(text: string): string;

/** @public */
export declare function useResolvedStringValue(text: string): string;

/* Excluded from this release type: useUrlFor */

declare type ValidationResult = string | string[] | ValidationResultObject | false | null | undefined;

declare interface ValidationResultObject {
    message: string;
    severity: ValidationSeverityLevel;
}

/** @public */
export declare function validationResultsFor(model: Obj | Widget, attributeName: string): ValidationResultObject[];

declare type ValidationsConfig<T extends Obj | Widget> = ReadonlyArray<ContentValidationCallback<T> | AttributeValidations<T>>;

declare type ValidationSeverityLevel = 'error' | 'warning' | 'info';

/** @public */
export declare class Widget<AttrDefs extends AttributeDefinitions = AttributeDefinitions> {
    constructor(attributes?: AttrDict<AttrDefs>);
    static attributeDefinitions(): NormalizedAttributeDefinitions;
    id(): string;
    objClass(): string;
    get<AttributeName extends keyof AttrDefs & string>(attributeName: AttributeName): AttributeValueOf<AttrDefs, AttributeName>;
    update(attributes: AttrDict<AttrDefs>): void;
    obj(): Obj;
    widgets(): Widget[];
    copy(): Widget<AttrDefs>;
    /** @deprecated Use `Widget#delete` instead */
    destroy(): void;
    delete(): void;
    container(): Obj | Widget;
    attributeDefinitions(): NormalizedAttributeDefinitions;
}

/** @public */
export declare interface WidgetClass<AttrDefs extends AttributeDefinitions = AttributeDefinitions> {
    new (attributes?: AttrDict<AttrDefs>): Widget<AttrDefs>;
    attributeDefinitions(): NormalizedAttributeDefinitions;
}

/** @public */
export declare interface WidgetComponentProps<AttrDefs extends AttributeDefinitions = AttributeDefinitions> {
    widget: Widget<AttrDefs>;
}

/** @public */
export declare type WidgetEditingConfig<AttrDefs extends AttributeDefinitions = AttributeDefinitions> = SharedEditingConfig<Widget<AttrDefs>>;

/** @public */
export declare type WidgetEditingConfigAttributes = Required<WidgetEditingConfig>['attributes'];

/** @public */
export declare type WidgetEditingConfigInitialContent = Required<WidgetEditingConfig>['initialContent'];

/** @public */
export declare type WidgetEditingConfigValidations = Required<WidgetEditingConfig>['validations'];

declare interface WidgetProps {
    [key: string]: unknown;
}

/** @public */
export declare const WidgetTag: React_2.ComponentType<WidgetTagProps>;

declare type WidgetTagProps = React_2.HTMLAttributes<HTMLElement> & {
    tag?: string;
    ref?: React_2.Ref<Element>;
};

declare type Width = React_2.ImgHTMLAttributes<HTMLImageElement>['width'];

/** @public */
declare class Workspace {
    id(): string;
    title(): string;
}

export { }
