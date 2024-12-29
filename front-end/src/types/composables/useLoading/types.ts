export type UseLoadingType = {
  loading: () => Promise<void>;
  endLoading: () => Promise<void>;
}
