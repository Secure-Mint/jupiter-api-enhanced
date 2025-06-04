import { OnSerialize, serialize } from "@tsed/json-mapper";
import { Property, Required, Generics, CollectionOf } from "@tsed/schema";

// @tsed/json-mapper isn't able to process generics for serialization
// so this hack keeps generics data for serialization
const serializationMap = new WeakMap<any, any>();

@Generics("T")
export class SuccessResult<T> {
  @Required() @Property() public success: boolean;
  @OnSerialize((v) => serialize(v, { type: serializationMap.get(v) }))
  @Property("T")
  public data: T;

  public constructor(data: T, clazz: { new (...args: any[]): T }) {
    this.success = true;
    this.data = data;
    serializationMap.set(data, clazz);
  }
}

@Generics("T")
export class SuccessArrayResult<T> {
  @Required() @Property() public success: boolean;
  @OnSerialize((v) => serialize(v, { type: serializationMap.get(v) }))
  @Property("T")
  public data: T[];

  public constructor(data: T[], clazz: { new (...args: any[]): T }) {
    this.success = true;
    this.data = data;
    serializationMap.set(data, clazz);
  }
}

@Generics("T")
export class PaginationOffset<T> {
  @Required()
  @OnSerialize((v) => serialize(v, { type: serializationMap.get(v) }))
  @CollectionOf("T")
  public items: T[];

  @Required() public total: number;

  public constructor(items: T[], total: number, clazz: { new (...args: any[]): T }) {
    this.items = items;
    this.total = total;
    serializationMap.set(items, clazz);
  }
}

@Generics("T")
export class PaginationKeyset<T> {
  @Required()
  @OnSerialize((v) => serialize(v, { type: serializationMap.get(v) }))
  @CollectionOf("T")
  public items: T[];

  @Required() public total: number;

  @Required() public next_index: string;

  public constructor(items: T[], total: number, next_index: string, clazz: { new (...args: any[]): T }) {
    this.items = items;
    this.total = total;
    this.next_index = next_index;
    serializationMap.set(items, clazz);
  }
}
