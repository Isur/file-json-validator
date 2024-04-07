export type ResultType<TResult> =
  | { result: TResult; error: null }
  | { error: string; result: null };
