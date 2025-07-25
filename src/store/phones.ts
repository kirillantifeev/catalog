import { useScreen } from "@/hooks/useScreen";
import { mockPhones } from "@/mockData/mockPhonesData";
import { TDataPhone, TMockPhones } from "@/types/TMockPhones";
import { removeDuplicateProps } from "@/utils/removeDuplicateProp";
import { defineStore } from "pinia"
import { computed, onBeforeUnmount, onMounted, ref } from "vue"

export const usePhonesStore = defineStore('phonesComparison', () => {
  const allModels = ref<TDataPhone[]>(mockPhones);
  const currentModels = ref<TDataPhone[]>([]);
  const excludedModels = ref<TDataPhone[]>([]);
  const currentPage = ref(0);
  const windowWidth = ref(window.innerWidth);
  const numberOfModels = ref(0);
  const searchQuery = ref<string>('');
  const searchedModels = ref<TDataPhone[]>([]);
  const paginationModels = ref<TDataPhone[]>([]);

  const itemsPerPage = computed(() => {
    if (windowWidth.value < 570) {
      return 1
    } else if (windowWidth.value < 900) {
      return 2
    } else {
      return 3
    }
})

  const isNextDisabled = computed(() => 
    (currentPage.value) + itemsPerPage.value >= currentModels.value.length
  );

  const handleResize = () => {
    windowWidth.value = window.innerWidth;
    currentPage.value = 0; 
  };

  const updateExcludedModels = () => {
    excludedModels.value = allModels.value.filter(
      model => !currentModels.value.some(current => current.id === model.id)
    );
  };

  const setPhonesForComparison = (num: number) => {
    numberOfModels.value = num;
    currentPage.value = 0; 

    currentModels.value = allModels.value.slice(0, num);
    reloadPaginationModels();
    updateExcludedModels();
    searchedModels.value = excludedModels.value;
  
  };

  const reloadPaginationModels = () => {
    paginationModels.value = currentModels.value.slice(currentPage.value, currentPage.value + itemsPerPage.value);
  }

  const showDifferences = () => {
    currentModels.value = removeDuplicateProps(currentModels.value);
    reloadPaginationModels();
  }

  const returnFullArr = () => {

    currentModels.value = allModels.value.filter(model => 
      !excludedModels.value.some(excluded => excluded.id === model.id))
    updateExcludedModels();
    reloadPaginationModels();
  }

  const nextPage = () => {
    if (!isNextDisabled.value) 
      currentPage.value++;
    
    reloadPaginationModels();
  };

  const prevPage = () => {
    if (currentPage.value > 0) 
      currentPage.value--;

    reloadPaginationModels();
  };

  const setSearchQuery = (text: string) => {
    searchQuery.value = text;
    searchedPhones()
  }

  const searchedPhones = () => {
    if (!searchQuery.value) {
      updateExcludedModels();
    }
    searchedModels.value = excludedModels.value.filter(model => 
      model.name.toLowerCase().includes(searchQuery.value.toLowerCase())

      
    );
  };

  const replacePhone = (phone: TDataPhone, model: TDataPhone) => {

    const index = currentModels.value.findIndex(item => item.id === model.id);
    if (index >=0 && index < currentModels.value.length)
    currentModels.value[index] = phone;
    paginationModels.value = currentModels.value.slice(currentPage.value, currentPage.value + itemsPerPage.value);
    updateExcludedModels();
    searchedPhones();
  }

  onMounted(() => window.addEventListener('resize', handleResize));
  onBeforeUnmount(() => window.removeEventListener('resize', handleResize));

  return {
    allModels,
    currentModels,
    excludedModels,
    isNextDisabled,
    currentPage,
    numberOfModels,
    setPhonesForComparison,
    nextPage,
    prevPage,
    showDifferences,
    returnFullArr,
    setSearchQuery,
    searchQuery,
    searchedPhones,
    searchedModels,
    replacePhone,
    paginationModels
  };
});