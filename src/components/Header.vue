<template>
    <header class="header-block">
        <div class="navigation">
            <h1 class="logo" style=" cursor: pointer;"@click="$router.push('/')">Каталог</h1>
            <nav class="nav-block">
                <p style="margin-right: 48px; cursor: pointer;" @click="$router.push('/')">СРАВНЕНИЕ</p>
                <div style="display: flex; cursor: pointer;" @click="$router.push('/profile')">
                    <p style="margin-right: 19px;">Личный кабинет</p>
                    <SvgProfile/>
                </div>
                
            </nav>
        </div>
    </header>
    
</template>

<script setup>
import SvgProfile from '@/assets/svg/SvgProfile.vue';

</script>

<style scoped>
    .header-block {
        display: flex;
        justify-content: center;
        border-bottom: 1px solid #A6A5A9;
    }

    .navigation {
        font-weight: 900;
        display: flex;
        width: 1110px;
        justify-content: space-between;
        min-height: 101px;
        align-items: center;
        
    }

    .logo {
        font-size: 18px;
        color: #0D5ADC;
        font-weight: 900;
    }

    .nav-block {
        display: flex;
        font-size: 12px;
        color: #3B4157;
        letter-spacing: -1px;
    }

    @media (max-width: 1390px) {
        .navigation {
            width: 78%;
        }
    }

    @media (max-width: 690px) {
        .navigation {
            width: 90%;
            
        }
    }

    @media (max-width: 450px) {
        .navigation {
            flex-direction: column;
            justify-content: center;
            gap: 20px;
        }
    }
</style>