<template>
  <main class="columns is-gapless is-multiline" :class="{'modo-escuro':modoEscuroAtivo}">
    <div class="column is-one-quarter barra-lateral">
      <BarraLateral @aoTemaAlterado="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <Formulario @aoSalvarTarefa="salvarTarefa" />
      <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <Box v-if="listaEstaVazia">
          Nenhuma Tarefa por Aqui :(
        </Box>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import BarraLateral from './components/BarraLateral.vue'
import Formulario from './components/Formulario.vue'
import Tarefa from './components/Tarefa.vue'
import ITarefa from './interfaces/ITarefa'
import Box from './components/Box.vue'

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    Formulario,
    Tarefa,
    Box
  },
  data() {
    return {
      tarefas: [] as ITarefa[],
      modoEscuroAtivo:false,
    }
  },
  computed:{
    listaEstaVazia(): boolean{
      return this.tarefas.length === 0 
    },
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa)
    },
    trocarTema(modoEscuroAtivo:boolean){
       this.modoEscuroAtivo = modoEscuroAtivo
    }
  }
});
</script>

<style>
.lista {
  padding: 1.25rem;
}

.column {
  padding: .7rem;
}

main {
  --bg-primario: #fff;
  --texto-primario: #000;
  --bg-tarefa:#FAF0CA;
  --texto-tarefa:#333333;
}
main.modo-escuro{
  --bg-primario: #2e3045;
  --texto-primario:#ddd;
  --bg-tarefa:#c5a628;
  --texto-tarefa:#dddbdb;  
}
.conteudo{
  background: var(--bg-primario);
}
.barra-lateral{
  background:var(--bg-primario);
}

</style>
