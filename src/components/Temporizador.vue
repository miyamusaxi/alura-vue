<template>
    <div class="column">
        <div class="is-flex is-align-items-center is-justify-content-space-between">
            <Cronometro :tempoEmSegundos="tempoEmSegundos" />
            <botao @clicado="iniciar" icone="fas fa-play" texto="Iniciar" :desabilitado="cronometroRodando"/>
            <botao @clicado="finalizar" icone="fas fa-stop" texto="Parar" :desabilitado="!cronometroRodando"/>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import Cronometro from './Cronometro.vue'
import botao from './Botao.vue'

export default defineComponent({
    name: 'Temporizador-',
    emits: ['aoTemporizadorFinalizado'],
    components: {
        Cronometro,
        botao
    },
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false
        }
    },
    methods: {
        iniciar() {
            // começar a contagem
            // 1seg == 1000ms
            this.cronometroRodando = true
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos += 1      
            }, 1000)
        },
        finalizar() {
            this.cronometroRodando = false,
            clearInterval(this.cronometro)
            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
            this.tempoEmSegundos = 0
        }
    }
})

</script>
<style scoped>
.column{
    color:black
}
</style>