<template>
    <svg width="22" height="11" viewBox="0 0 22 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.375 1.125L11 9.5625L1.625 1.125" stroke="#0D5ADC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

</template>

<script setup>
    defineProps({
    size: { type: [String, Number], default: 22 },
    color: { type: String, default: 'currentColor' }
    })
</script>