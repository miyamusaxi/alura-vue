<template>
  <div class="column is-three-quarter conteudo">
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
      <Box v-if="listaEstaVazia"> Você não está muito produtivo hoje :( </Box>
      <div class="field">
        <p class="control has-icons-left">
          <input type="text" class="input" placeholder="Pesquise uma tarefa" v-model="filtro">
          <span class="icon is-small is-left">
            <i class="fa-solid fa-magnifying-glass" style="color: #4a4646d2;"></i>
          </span>
        </p>
      </div>
      <Tarefa
        v-for="(tarefa, index) in tarefas"
        :key="index"
        :tarefa="tarefa"
        @aoTarefaClicada="selecionarTarefa"
      />
      <div
        class="modal"
        :class="{ 'is-active': tarefaSelecionada }"
        v-if="tarefaSelecionada"
      >
        <div class="modal-background">
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-tite">Editando uma tarefa</p>
              <button
                @click="fecharModal"
                class="delete"
                arial-label="close"
              ></button>
            </header>
            <section class="modal-card-body">
              <div class="field">
                <label for="descricaoTarefa" class="label">Descrição</label>
                <input
                  type="text"
                  class="input"
                  v-model="tarefaSelecionada.descricao"
                  id="descricaoTarefa"
                />
              </div>
            </section>
            <footer class="modal-card-foot">
              <button @click="alterarTarefa" class="button is-success">
                Salvar
              </button>
              <button @click="fecharModal" class="button">Cancelar</button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect} from "vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import Box from "../components/Box.vue";

import { useStore } from "@/store";
import {
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
  EDITAR_TAREFA,
} from "@/store/tipo-actions";
import ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
  name: "App",
  components: {
    Formulario,
    Tarefa,
    Box,
  },
  data() {
    return {
      modoEscuroAtivo: false,
      tarefaSelecionada: null as ITarefa | null,
    };
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    },
    alterarTarefa() {
      this.store
        .dispatch(EDITAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal());
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);

    const filtro = ref("");

    // const tarefas = computed(() =>
    //   store.state.tarefa.tarefas.filter(
    //     (t) => !filtro.value || t.descricao.includes(filtro.value)
    //     ) 
    //   );

    watchEffect(() =>{
      store.dispatch(OBTER_TAREFAS, filtro.value)
    })

    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      store,
      filtro
    };
  },
});
</script>