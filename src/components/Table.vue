<template>
    <div class="container-table">
            <div class="table">
                <TableRow 
                    v-if="models.some(el => el.manufacturer)"
                    title="Производитель"
                    :phones="models"
                    field="manufacturer"
                    :marginTop="2"/>
                <TableRow 
                    v-if="models.some(el => el.releaseYear)"
                    title="Год релиза"
                    :phones="models"
                    field="releaseYear"
                    :marginTop="7"
                    :additionalHeight="25"/>
                <TableRow 
                    v-if="models.some(el => el.screenDiagonal)"
                    title="Диагональ экрана (дюйм)"
                    :phones="models"
                    field="screenDiagonal"
                    :marginTop="15"
                    :additionalHeight="25"
                    :marginTopTitle="35"/>
                <TableRow 
                    v-if="models.some(el => el.сountryOfOrigin)"
                    title="Страна производитель"
                    :phones="models"
                    field="сountryOfOrigin"
                    :marginTop="3"
                    :additionalHeight="47"/>
                <TableRow 
                    v-if="models.some(el => el.memoryCapacity)"
                    title="Объем памяти"
                    :phones="models"
                    field="memoryCapacity"
                    :marginTop="1"
                    :additionalHeight="25"
                    UnitOfMeasurement="Гб"/>
                <TableRow 
                    v-if="models.some(el => el.screenRefreshRate)"
                    title="Частота обновления экрана"
                    :phones="models"
                    field="screenRefreshRate"
                    :marginTop="7"
                    :additionalHeight="25"
                    :marginTopTitle="28"
                    UnitOfMeasurement="Гц"/>
                <TableRow 
                    v-if="models.some(el => el.NFC)"
                    title="NFC"
                    :phones="models"
                    field="NFC"
                    :marginTop="10"
                    :additionalHeight="20"/>
                <TableRow 
                    v-if="models.some(el => el.ESIM)"
                    title="Поддержка ESIM"
                    :phones="models"
                    field="ESIM"
                    :marginTop="12"
                    :additionalHeight="25"
                    :marginTopTitle="10"/>
                <TableRow 
                    v-if="models.some(el => el.wirelessСharging)"
                    title="Поддержка беспроводной зарядки"
                    :phones="models"
                    field="wirelessСharging"
                    :marginTop="14"
                    :additionalHeight="25"
                    :marginTopTitle="22"/>
                <TableRow 
                    v-if="models.some(el => el.cost)"
                    title="Стоимость"
                    :phones="models"
                    field="cost"
                    :marginTop="10"
                    :additionalHeight="28"
                    :marginTopTitle="10"
                    UnitOfMeasurement="₽"/>    
            </div>
        </div>
</template>

<script setup>
    import TableRow from './TableRow.vue';
    import SvgArrow from '@/assets/svg/SvgArrow.vue';

    const props = defineProps({
        models: {type: Array, required: true}
    })
</script>

<style scoped>
        .container-table {
        background-color: #F4F9FC;
        
    }

    .next-button {
        position: fixed; 
        right: 50px;
        top: 200px;
    }
</style>