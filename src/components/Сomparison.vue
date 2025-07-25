<template>
    <div class="container">
        <div class="pagination-container">
            <h2 class="title">Смартфоны</h2>
            <div class="pagination-block">
                <p style="margin-right: 3px;">Отобразить товары:</p>
                <div class="pagination">
                    <p 
                    v-for="n in maxButtons" 
                    :key="n"
                    @click="storePhones.setPhonesForComparison(n + 1)"
                    class="number-button"
                    :class="{ 'active-button': n + 1 === storePhones.numberOfModels }"
                    >
                    {{ n + 1 }}
                    </p>
                </div>
                
            </div>
        </div>
        <div class="table-row" style="height: 226px; align-items: start;">
            <div class="data-width checkbox-block">
                <label class="custom-checkbox">
                    <input 
                    type="checkbox"
                    class="hidden-checkbox"
                    v-model="isChecked"
                    @change="handleCheckboxChange"
                    >
                    <span class="checkmark"></span>
                    <span class="label-text">Показать различия</span>
                </label>
            </div>
            <div class="line-data data-width" v-for="phone in displayedModels" :key="phone.id">
                <div style="display: flex;">
                    <div class="block-data-image">
                        <img class="data-image" :src="phone.image"/>
                    </div> 
                    <TooltipReplacementList v-if="storePhones.excludedModels.length !== 0" class="button-tooltip" :model="phone"/>
                </div>
                <p class="data-name">{{ phone.name }}</p>
                
            </div>
            <NextButton v-if="storePhones.isNextDisabled === false" class="page-button" @click="storePhones.nextPage"/>
            <PrevButton v-if="storePhones.currentPage > 0" class="page-button" @click="storePhones.prevPage"/>
               
                 
        </div>
        <Table :models="displayedModels"/>
    </div>
</template>

<script setup lang="ts">
import { usePhonesStore } from '@/store/phones';
import Table from './Table.vue';
import { computed, onMounted, ref } from 'vue';
import tooltip from './ui/Tooltip.vue';
import Tooltip from './ui/Tooltip.vue';
import TooltipReplacementList from './TooltipReplacementList.vue';
import NextButton from './ui/NextButton.vue';
import PrevButton from './ui/PrevButton.vue';


const storePhones = usePhonesStore();

const isChecked = ref(false);

const handleCheckboxChange = (event: { target: HTMLInputElement }) => {
  if (event.target.checked) {
    storePhones.showDifferences();
  } else {
    storePhones.returnFullArr();
  }
};

const maxButtons = computed(() => {
  const modelCount = storePhones.allModels.length;
  if (modelCount < 2) return 0;
  if (modelCount <= 6) return modelCount - 1;
  return 5;
});

const displayedModels = computed(() => storePhones.paginationModels);

onMounted(() => {
    storePhones.setPhonesForComparison(3)
})

</script>

<style scoped>

    .pagination-container {
        display: flex;
        margin-inline: auto;
        justify-content: space-between;
        align-items: center;
        padding-top: 30px;
        min-height: 140px;
        width: 1110px;
    }

    .title {
        font-weight: 700;
        font-size: 48px;
        color: #828286;
    }

    .pagination-block {
        display: flex;
        color: #0D5ADC;
        font-weight: 400;
        font-size: 18px;
        letter-spacing: 0.36px;
        margin-top: 5px;
    }

    .pagination {
        display: flex;
    }



    .number-button {
        border: none;
        background-color: white;
        margin: 0;
        padding: 0;
        outline: none;
        margin-left: 5px;
        cursor: pointer;

    }

    .active-button {
        text-decoration: underline; 
        text-underline-offset: 5px;
        cursor: auto;
    }

    .container {
        width: 100%;
        overflow-x: hidden;
        
    }

        .custom-checkbox {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .hidden-checkbox {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }

    .checkmark {
        width: 24px;
        height: 24px;
        border: 2px solid #C1C1C2;
        border-radius: 4px;
        margin-right: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .hidden-checkbox:checked + .checkmark {
        background-color: #0D5ADC;
    }

    .hidden-checkbox:checked + .checkmark:after {
        content: "✓";
        color: white;
        font-size: 16px;
    }

    .table-row {
        display: flex;
        width: 1110px;
        align-items: center;
        border-bottom: 1px solid #CDCFD2;
        margin-inline: 165px;
        margin: auto;
        gap: 30px;
    }

    .data-width{
        width: 255px;
    }

    .checkbox-block {
        display: flex;
        align-items: center;
        height: 100%;
        font-weight: 400;
        font-size: 18px;
        color: #0D5ADC;
        margin-top: 23px;
        letter-spacing: 0.03em;

    }

    .line-name {
        text-transform: uppercase;
        font-weight: 500;
        font-size: 18px;
        color: #A4A9B9;
    }

    .line-data {
        color:#3B4157;
        font-weight: 500;
        font-size: 18px;
    }

    .data-name {
        margin-top: 8px;
        margin-left: 14px;
        font-weight: 500;
        font-size: 18px;
    }

    .block-data-image {
        width: 80px;
        display: flex;
        justify-content: center;
        margin-left: 39px;
        
    }

    .data-image {
        
        height: 120px;
    }

    .button-tooltip {
        margin-top: 73px;
        margin-left: 17px;

    }

    .page-button {
        opacity: 0.5;
        
    }

    .page-button:hover {
        opacity: 1;
    }


    @media (max-width: 1390px) {
        .table-row {
            width: 78%;
        }

        .pagination-container {
            width: 78%;
        }
    }

    @media (max-width: 750px) {
        .pagination-block {
            flex-direction: column;
    }
    }

    @media (max-width: 690px) {
        .table-row {
            width: 90%;
        }

        .pagination-container {
            width: 90%;
            
        }

        .checkbox-block {
            font-weight: 400;
            font-size: 14px;
            flex-direction: row;
        }

        .pagination-block {
            flex-direction: row;
        }

        .data-name {
            font-size: 14px;
        }

        .pagination-container {
            flex-direction: column;
            margin-bottom: 40px;
        }

        .custom-checkbox {
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }

        
    }

</style>