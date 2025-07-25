<template>
    <div class="table-row" :style="{'--additional-height': additionalHeight + 'px'}">
        <p class="line-name data-width" :style="{marginTop: marginTopTitle + 'px'}">{{ title }}</p>
        <p v-for="phone in phones" :key="phone.id" class="line-data data-width" :style="{marginTop: marginTop + 'px'}">
            <template v-if="phone[field] === true"> <SvgDataTrue/> </template>
            <template v-else-if="phone[field] === false"> <SvgDataFalse/> </template>
            <template v-else-if="field === 'cost'"> {{new Intl.NumberFormat('ru-RU').format(phone[field])}} {{ UnitOfMeasurement }}</template>
            <template v-else>{{ phone[field] }} {{ UnitOfMeasurement }}</template>
        </p>     
    </div>
</template>

<script setup>
import { PropType } from 'vue';
import SvgDataTrue from '@/assets/svg/SvgDataTrue.vue';
import SvgDataFalse from '@/assets/svg/SvgDataFalse.vue';

    const props = defineProps({
        additionalHeight: { type: Number, default: 0 },
        title: {type: String, required: true},
        phones: {type: Array, required: true},
        field: {type: [String, Boolean, Number], required: true},
        marginTop: {type: Number, default: 0},
        marginTopTitle: {type: Number, default: 0},
        UnitOfMeasurement: {type: String, default: ''}
    })

</script>

<style scoped>
     .table-row {
        height: calc(89px + var(--additional-height, 0px));
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

    @media (max-width: 1390px) {
        .table-row {
            width: 78%;
        }
    }

    @media (max-width: 690px) {
        .table-row {
            width: 90%;
            
        }

        .line-name {
            font-weight: 500;
            font-size: 14px;
        }

        .line-data {
            font-weight: 500;
            font-size: 14px;
        }
    }
</style>