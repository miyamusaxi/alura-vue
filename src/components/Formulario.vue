<template>
  <div class="box">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja inciar?"
          v-model="descricao"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o Projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { computed, defineComponent, ref } from "vue";
import Temporizador from "./Temporizador.vue";
import useNotificador from "@/hooks/notificador";
import { TipoNotificacao } from "@/interfaces/INotificacoes";
import { useStore } from "@/store";

export default defineComponent({
  name: "Formulario-",
  components: {
    Temporizador,
  },
  emits: ["aoSalvarTarefa"],
  setup(props, { emit }) {
    const { notificar } = useNotificador();

    const projetos = computed(() => store.state.projeto.projetos)

    const descricao = ref("");
    const idProjeto = ref("");

    const store = useStore();
    
    const finalizarTarefa = (tempoDecorrido: number): void => {
      const projeto = projetos.value.find((p) => p.id == idProjeto.value);
      if(!projeto){
        notificar(TipoNotificacao.FALHA, 'ERRO','Vincule a tarefa a um projeto antes de salva-la')
        return;
      }
      emit("aoSalvarTarefa", {
        duracaoEmSegundos: tempoDecorrido,
        descricao: descricao.value,
        projeto: projeto,
      });
      notificar(TipoNotificacao.SUCESSO, 'SUCESSO','Tarefa salva com sucesso')
      descricao.value = "";
    }

    return {
      descricao,
      projetos,
      finalizarTarefa,
      idProjeto,
    };
  },
});
</script>

<style scoped>
.box {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}

.button{
  margin-left: 8px;
}

.column {
  margin: 0 auto;
}
</style>
