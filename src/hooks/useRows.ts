import { ref, Ref, computed } from 'vue';

export default function useRows(rowsItems: Ref<number[]>, rowsPerPage: Ref<number>) {
  const rowsItemsComputed = computed((): number[] => {
    if (rowsItems.value.findIndex((item) => item === rowsPerPage.value) === -1) {
      return [rowsPerPage.value, ...rowsItems.value];
    }
    return rowsItems.value;
  });

  const rowsPerPageRef = ref(rowsPerPage.value);

  const updateRowsPerPage = (option: number) => {
    rowsPerPageRef.value = option;
  };

  return {
    rowsItemsComputed,
    rowsPerPageRef,
    updateRowsPerPage,
  };
}
