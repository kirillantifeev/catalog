import { computed, onBeforeUnmount, onMounted, Ref, ref } from "vue";
import { mockPhones } from "@/mockData/mockPhonesData";
import { TDataPhone, TMockPhones } from "@/types/TMockPhones";

export function useScreen (phones: Ref<TDataPhone[]>) {

    const currentPage = ref(0);
    const windowWidth = ref(window.innerWidth);

    const itemsPerPage = computed(() => {   
        if (windowWidth.value < 500) return 2;   
        return 3;                                
    });

    const visiblePhones = computed(() => {
        return phones.value.slice(currentPage.value, currentPage.value + itemsPerPage.value);
    })

    const isNextDisabled = computed(() => {
        return (currentPage.value + itemsPerPage.value) >= phones.value.length;
    })

    const handleResize = () => {
        windowWidth.value = window.innerWidth;
        currentPage.value = 0;
    };

    const nextPage = () => {
        if (!isNextDisabled.value) {
            currentPage.value++;
            console.log(visiblePhones.value)
        }
    };

    const prevPage = () => {
        if (currentPage.value > 0) {
            currentPage.value--;
            console.log(visiblePhones.value)
        }
    };

    onMounted(() => {
        window.addEventListener('resize', handleResize);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', handleResize);
    });

    return {
        currentPage,
        visiblePhones,
        nextPage,
        prevPage,
        isNextDisabled
    }




}