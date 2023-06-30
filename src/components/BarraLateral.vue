<template>
    <header>
        <h1><img src="../assets/logo.png" alt="ednaldo-pereira"></h1>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'   

export default defineComponent({
    name:'BarrraLateral'
})

</script>

<style scoped>
/* Todo o estilo do componente */
header{
    margin: .3rem;
    padding: .9rem;
    background: #0d3b66;
    width: 100%;
    height: 100vh;
    border: #0d3b66;
    border-radius: .5rem;
}
@media only screen and(max-width:768px){

    header{
        padding: 2.5rem;
        height: auto;
    }

}

</style>