<template>
  <main class="columns is-gapless is-multiline" :class="{'modo-escuro':modoEscuroAtivo}">
    <div class="column is-one-quarter barra-lateral">
      <BarraLateral @aoTemaAlterado="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <RouterView></RouterView>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import BarraLateral from './components/BarraLateral.vue'



export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
 
  },
  data() {
    return {
      modoEscuroAtivo:false,
    }
  },
  methods: {
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
  --bg-tarefa:#f6cf35ed;
  --texto-tarefa:#dddbdb;  
}
.conteudo{
  background:var(--bg-primario);
}
.barra-lateral{
  background:var(--bg-primario);
}

</style>
