import { CollectionOf, Property, Required } from "@tsed/schema";

export class TokenModel {
  @Required() public readonly id: string;
  @Required() public readonly address: string;
  @Required() public readonly daily_volume: number;
  @Required() public readonly decimals: number;
  @Property() public readonly extensions: string | null;
  @Property() public readonly freeze_authority: string | null;
  @Property() public readonly logo_uri: string | null;
  @Property() public readonly mint_authority: string | null;
  @Required() public readonly minted_at: Date;
  @Required() public readonly name: string;
  @Property() public readonly permanent_delegate: string | null;
  @Required() public readonly symbol: string;
  @Required() @CollectionOf(String) public readonly tags: string[];
}

export class PaginationParams {
  @Required() public readonly limit: number;
  @Required() public readonly next_index: number;
}
