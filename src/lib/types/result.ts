export type ResultType<TResult> =
  | { result: TResult; error: null }
  | { error: { details: string }; result: null };
