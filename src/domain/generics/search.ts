import { IIndexable } from './indexable';

export namespace ISearch {
  type Without<A, B> = {
    [P in Exclude<keyof A, keyof B>]?: never;
  };

  type XOR<A, B> = A | B extends object ? (Without<A, B> & B) | (Without<B, A> & A) : A | B;

  export type FullText = {
    text?: string;
  };

  export namespace Operators {
    export namespace Match {
      export type Positive = 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'like';
      export type Negative = `n${Positive}`;
    }

    export namespace Range {
      export type Positive = 'in';
      export type Negative = `n${Positive}`;
    }

    export type Match = Match.Positive | Match.Negative;

    export type Range = Range.Positive | Range.Negative;
  }

  export type Operators = Operators.Match | Operators.Range;

  export type Pagination = {
    offset?: number;
    limit?: number;
  };

  export namespace Query {
    export type Where<T extends IIndexable> =
      | { [Key in keyof T]?: { [O in Operators.Match]?: T[Key] } }
      | { [Key in keyof T]?: { [O in Operators.Range]?: Array<T[Key]> } };

    export namespace Fields {
      export type Select<T> = { select: Array<string & keyof T> };
      export type Remove<T> = { remove: Array<string & keyof T> };
    }

    export type Fields<T extends IIndexable> = XOR<Fields.Select<T>, Fields.Remove<T>>;

    export type Sort<T extends IIndexable> = { [K in keyof T]?: -1 | 1 };
  }

  export type Query<T extends IIndexable> = FullText &
    Pagination & {
      where?: Query.Where<T> | Array<Query.Where<T>>;
      fields?: Query.Fields<T>;
      sort?: Query.Sort<T>;
    };

  export type Result<T extends IIndexable> = Required<Pagination> & {
    items: T[];
    total: number;
  };
}
