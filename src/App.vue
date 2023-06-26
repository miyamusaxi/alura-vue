<template>
  <main class="columns is-gapless is-multiline">
      <div class="column is-one-quarter">
        <BarraLateral/>
      </div>
      <div class="column is-three-quarter">
        <Formulario/>
      </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import Formulario from './components/Formulario.vue';
export default defineComponent({
  name: 'App',
  components:{
    BarraLateral,
    Formulario,
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
