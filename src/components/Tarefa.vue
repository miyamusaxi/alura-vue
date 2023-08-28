<template>
  <Box>
    <div class="columns clicavel" @click="tarefaClicada">
      <div class="column is-4">
        {{ tarefa?.descricao || "Tarefa sem descrição" }}
      </div>
      <div class="column is-3">
        {{ tarefa?.projeto.nome }}
      </div>
      <div class="column">
        <Cronometro :tempoEmSegundos="tarefa?.duracaoEmSegundos" />
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import { PropType, defineComponent} from "vue";
import Cronometro from "./Cronometro.vue";
import ITarefa from "@/interfaces/ITarefa";
import Box from "./Box.vue";

export default defineComponent({
  name: "Tarefa-",
  emits: ['aoTarefaClicada'],
  components: {
    Cronometro,
    Box,
  },
  methods: {
    
  },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa> 
    },
  },
  setup(props, { emit }){ 

    const tarefaClicada = () : void =>{
      emit('aoTarefaClicada', props.tarefa)
    }
    return{
      tarefaClicada
    }
  }
});
</script>

<style scoped>
.clicavel{
  cursor: pointer;
}
</style>