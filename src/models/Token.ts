import { CollectionOf, Description, Nullable, Property, Required } from "@tsed/schema";
import { Token } from "generated/prisma";

export class TokenModel {
  @Required() public readonly id: string;
  @Required() public readonly address: string;
  @Required() public readonly daily_volume: number | null;
  @Required() public readonly decimals: number;
  @Required() public readonly extensions: JSON;
  @Required() public readonly freeze_authority: string | null;
  @Required() public readonly logo_uri: string | null;
  @Required() public readonly mint_authority: string | null;
  @Required() public readonly minted_at: Date | null;
  @Required() public readonly name: string;
  @Required() public readonly permanent_delegate: string | null;
  @Required() public readonly symbol: string;
  @Required() @CollectionOf(String) public readonly tags: string[];
  @Required() public readonly created_at: Date;
  @Required() public readonly updated_at: Date | null;
  @Required() public readonly deleted_at: Date | null;

  public static build(token: Token): TokenModel {
    return {
      ...token,
      extensions: token.extensions as unknown as JSON
    };
  }

  public static buildArray(tokens: Token[]): TokenModel[] {
    return tokens.map((token) => TokenModel.build(token));
  }
}

export class PaginationParams {
  @Required() public readonly limit: number;
  @Property() public readonly last_id: string;
}

export class Address {
  @Required() public readonly address: string;
}

export class TokenListParams extends PaginationParams {
  @Property(String)
  @Description("A list of one or more tags, comma separated. The list is the union of tokens with these tags.")
  public readonly tags: string | null;

  @Property(String)
  @Description("Created after this timestamp. Pass this value as UNIX timestamp")
  public readonly created_at: string | null;
}
