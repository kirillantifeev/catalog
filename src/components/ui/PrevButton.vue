<template>
    <div class="container-next-button">
        <SvgArrow class="next-button"/>
    </div>
</template>

<script setup>
    import SvgArrow from '@/assets/svg/SvgArrow.vue';
</script>

<style scoped>
        .container-next-button {
        display: flex;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #e7e7ea;
        position: fixed;
        left: 80px;
        top: 300px;
        cursor: pointer;
    }

    .next-button {
        
        transform: rotate(90deg);
        margin-top: 13px;
        margin-right: 3px;
    }

    @media (max-width: 1100px) {
        .container-next-button {
            left: 40px;
        }
    }

    @media (max-width: 800px) {
        .container-next-button {
            top: 420px;
        }
    }

    @media (max-width: 690px) {
        .container-next-button {
            top: 450px;
        }
    }
</style>