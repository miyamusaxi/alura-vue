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
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";

import { TipoNotificacao } from "@/interfaces/INotificacoes";

import useNotificador from "@/hooks/notificador";
import { CADASTRAR_PROJETO, EDITAR_PROJETO } from "@/store/tipo-actions";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Formulario-projeto",
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    
    const router = useRouter();

    const store = useStore();
    const { notificar } = useNotificador();

    const nomeDoProjeto = ref("")

    if (props.id){
      const projeto = store.state.projeto.projetos.find((proj) => proj.id == props.id);
      nomeDoProjeto.value = projeto?.nome || "";
    }

    const notSucesso = () => {
      nomeDoProjeto.value = "";
      notificar(
        TipoNotificacao.SUCESSO,
        "Sucesso",
        "Projeto salvo com sucesso! ;)"
      );
      router.push("/projetos");
    }
    const notSucessoAtualizar = () => {
      nomeDoProjeto.value = "";
      notificar(
        TipoNotificacao.SUCESSO,
        "Sucessso",
        "Projeto alterado com sucesso! ;)"
      );
      router.push("/projetos");
    }

    const salvar = () => {
      if (props.id) {
        store
          .dispatch(EDITAR_PROJETO, {
          id: props.id,
          nome: nomeDoProjeto.value,
        }).then(() => notSucessoAtualizar());
      } else {
        store
          .dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
          .then(() => notSucesso());
      }
    }
    return {
      store,
      notificar,
      nomeDoProjeto,
      salvar
    };
  },
});
</script>
