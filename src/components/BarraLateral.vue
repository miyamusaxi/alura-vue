<template>
    <header>
        <h1><img src="../assets/logo.png" alt="logo-alura-tracker"></h1>
        <button class="button" @click="alterarTema" :style="botao">
           {{ textoBotao }}
        </button>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'   

export default defineComponent({
    name:'BarrraLateral',
    emtis:['aoTemaAlterado'],
    data(){
        return{
            modoEscuro: false,
            botao:{ 
                padding: '.9rem',
                background: '#1060aae3',
                'border-color': '#1060aae3',
                color:'#ddd',
                'font-weight':'bold'
            }
        }
    },
    methods: {
        alterarTema() {
            this.modoEscuro = !this.modoEscuro
            this.$emit('aoTemaAlterado', this.modoEscuro)

        }
    },
    computed: {
        textoBotao ():string{
           return this.modoEscuro ? 'Modo Claro' : 'Modo Escuro'
        }   
    }
})

</script>

<style scoped>
/* Todo o estilo do componente */
header{
    margin: .3rem;
    padding: .9rem;
    background: #0d3b66;
    width: 95%;
    height: 100vh;
    border: #0d3b66;
    border-radius: .5rem;
    text-align: center;
}
@media only screen and(max-width:768px){

    header{
        padding: 2.5rem;
        height: auto;
    }

}

</style>