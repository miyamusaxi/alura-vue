<template>
  <section>
    <strong>
      <i class="far fa-clock"></i>{{ tempoDecorrido }} 
    </strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Cronometro-",
  props: {
    tempoEmSegundos: {
      type: Number,
      default: 0,
    },
  },
  // data(){
  //     return{
  //         estilos:{
  //             '.display':'color:var(--texto-primario)'
  //         }
  //     }
  // },
  computed: {
    tempoDecorrido(): string {
      return new Date(this.tempoEmSegundos * 1000).toISOString().substr(11, 8);
    },
  },
});
</script>
<style scoped>
.display {
  color: var(--texto-primario);
}
</style>
