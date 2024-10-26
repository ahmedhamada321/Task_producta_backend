export interface IMapper<TInput, TOutput> {
  mapSingle(input: TInput): Promise<TOutput>;
  mapList(inputs: TInput[]): Promise<TOutput[]>;
}
