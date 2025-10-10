import { ArgumentError } from 'scrivito_sdk/common';
import {
  DataClass,
  DataItem,
  DataItemAttributes,
  DataScope,
  DataScopeError,
  DataScopeParams,
  EmptyDataScopePojo,
} from 'scrivito_sdk/data_integration/data_class';

export class EmptyDataScope extends DataScope {
  constructor(
    private readonly params: {
      dataClass?: DataClass;
      error?: DataScopeError;
      isDataItem?: boolean;
    } = {}
  ) {
    super();
  }

  dataClass(): DataClass | null {
    return this.params.dataClass || null;
  }

  dataClassName(): string | null {
    return this.dataClass()?.name() || null;
  }

  async create(_attributes: DataItemAttributes): Promise<DataItem> {
    throw new ArgumentError('Cannot create items from an empty data scope');
  }

  get(_id: string): null {
    return null;
  }

  take(): DataItem[] {
    this.throwErrorIfPresent();
    return [];
  }

  dataItem(): null {
    return null;
  }

  isDataItem(): boolean {
    return !!this.params.isDataItem;
  }

  attributeName(): null {
    return null;
  }

  transform(_params: DataScopeParams): DataScope {
    return this.clone();
  }

  filter(_attributeName: string, _value: string): DataScope {
    return this.clone();
  }

  search(_text: string): DataScope {
    return this.clone();
  }

  objSearch(): undefined {
    return;
  }

  count(): 0 {
    this.throwErrorIfPresent();
    return 0;
  }

  limit(): undefined {
    return;
  }

  /** @internal */
  toPojo(): EmptyDataScopePojo {
    return {
      _class: this.dataClassName(),
      _error: this.params.error?.message,
      isEmpty: true,
      isDataItem: this.isDataItem(),
    };
  }

  private clone() {
    return new EmptyDataScope(this.params);
  }

  private throwErrorIfPresent() {
    if (this.params.error) {
      throw new DataScopeError(this.params.error.message);
    }
  }
}
