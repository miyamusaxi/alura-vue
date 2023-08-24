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
import { computed, defineComponent } from "vue";
import Temporizador from "./Temporizador.vue";
import { notificacaoMixin } from "@/mixins/notificar";
import { TipoNotificacao } from "@/interfaces/INotificacoes";
import { useStore } from "@/store";


export default defineComponent({
  name: "Formulario-",
  components: {
    Temporizador,
  },
  mixins:[notificacaoMixin],
  emits: ["aoSalvarTarefa"],
  data() {
    return {
      descricao: "",
      idProjeto: "",
    };
  },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      const projeto = this.projetos.find((p) => p.id == this.idProjeto);
      if(!projeto){
        this.notificar(TipoNotificacao.FALHA, 'ERRO','Vincule a tarefa a um projeto antes de salva-la')
        return;
      }
      this.$emit("aoSalvarTarefa", {
        duracaoEmSegundos: tempoDecorrido,
        descricao: this.descricao,
        projeto: projeto,
      });
      this.descricao = "";
    },
  },
  setup() {
    const store = useStore();
    return {
      projetos: computed(() => store.state.projeto.projetos),
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
