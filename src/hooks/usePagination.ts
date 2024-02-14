import { ref, Ref, computed } from 'vue';

export default function usePagination(
  currentPage: Ref<number>,
  loading: Ref<boolean>,
  totalItemsLength: Ref<number>,
  rowsPerPage: Ref<number>,
) {
  const currentPaginationNumber = ref(currentPage.value);
  const maxPaginationNumber = computed((): number => Math.ceil(totalItemsLength.value / rowsPerPage.value));
  // eslint-disable-next-line max-len
  const isLastPage = computed(
    (): boolean => maxPaginationNumber.value === 0 || currentPaginationNumber.value === maxPaginationNumber.value,
  );
  const isFirstPage = computed((): boolean => currentPaginationNumber.value === 1);

  const nextPage = () => {
    if (totalItemsLength.value === 0) return;
    if (isLastPage.value) return;
    if (loading.value) return;
    currentPaginationNumber.value += 1;
  };

  const prevPage = () => {
    if (totalItemsLength.value === 0) return;
    if (isFirstPage.value) return;
    if (loading.value) return;
    currentPaginationNumber.value -= 1;
  };

  const updatePage = (page: number) => {
    if (loading.value) return;
    currentPaginationNumber.value = page;
  };

  const updateCurrentPaginationNumber = (page: number) => {
    currentPaginationNumber.value = page;
  };

  return {
    currentPaginationNumber,
    maxPaginationNumber,
    isLastPage,
    isFirstPage,
    nextPage,
    prevPage,
    updatePage,
    updateCurrentPaginationNumber,
  };
}
