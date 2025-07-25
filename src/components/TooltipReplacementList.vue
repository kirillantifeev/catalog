<template>
  <Tooltip>
    <template #button>
      <SvgArrow style="cursor: pointer;"/>
    </template>
    
    <div class="container-tooltip">
        <input 
            class="input" type="text" 
            placeholder="Поиск"
            :value="storePhones.searchQuery"
            @input="storePhones.setSearchQuery($event.target.value)">
      <div class="block-models">
        <div 
          v-for="phone in storePhones.searchedModels" 
          :key="phone.id"
          class="row-model"
        >
          <SvgReplace style="cursor: pointer;" @click="storePhones.replacePhone(phone, model)"/>
          <div style="width: 70px; display: flex; justify-content: center;">
            <img class="image" :src="phone.image" :alt="phone.name">
          </div>
          
          <p class="text">{{ phone.name }}</p>
        </div>
      </div>
    </div>
  </Tooltip>
</template>

<script setup>
 import Tooltip from './ui/Tooltip.vue';
 import SvgArrow from '@/assets/svg/SvgArrow.vue';
 import SvgReplace from '@/assets/svg/SvgReplace.vue';
import { usePhonesStore } from '@/store/phones';

 const storePhones = usePhonesStore();

 const props = defineProps({
  model: {type: Object}
 })

</script>

<style scoped>
    .container-tooltip {
        padding: 43px 40px 25px 18px;
    }

    .input {
        width: 100%;
        border-radius: 4px;
        border: 1px solid #C1C1C1;
        font-weight: 400;
        font-size: 24px;
        padding: 9px 16px;
        color: #3B4157;
    }

    .input::placeholder {
        color: #C1C1C1;
    }

    .block-models {
        display: flex;
        flex-direction: column;
        margin-top: 18px;
        gap: 30px;
    }

    .row-model {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        
    }

    .image {
        height: 50px;
    }

    .text {
        font-weight: 400;
        font-size: 18px;
    }


</style>