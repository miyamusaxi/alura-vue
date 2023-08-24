<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label"> Nome do Projeto</label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjeto"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";

import { TipoNotificacao } from "@/interfaces/INotificacoes";

import useNotificador from "@/hooks/notificador";
import { CADASTRAR_PROJETO, EDITAR_PROJETO } from "@/store/tipo-actions";

export default defineComponent({
  name: "Formulario-projeto",
  props: {
    id: {
      type: String,
    },
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projeto.projetos.find(
        (proj) => proj.id == this.id
      );
      this.nomeDoProjeto = projeto?.nome || "";
    }
  },
  data() {
    return {
      nomeDoProjeto: "",
    };
  },
  methods: {
    salvar() {
      if (this.id) {
        this.store
          .dispatch(EDITAR_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto,
        }).then(() => this.notSucessoAtualizar());
      } else {
        this.store
          .dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
          .then(() => this.notSucesso());
      }
    },
    notSucesso() {
      this.nomeDoProjeto = "";
      this.notificar(
        TipoNotificacao.SUCESSO,
        "Sucesso",
        "Projeto salvo com sucesso! ;)"
      );
      this.$router.push("/projetos");
    },
    notSucessoAtualizar() {
      this.nomeDoProjeto = "";
      this.notificar(
        TipoNotificacao.SUCESSO,
        "Sucessso",
        "Projeto alterado com sucesso! ;)"
      );
      this.$router.push("/projetos");
    },
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    return {
      store,
      notificar,
    };
  },
});
</script>
