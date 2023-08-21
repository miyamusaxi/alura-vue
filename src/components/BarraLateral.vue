<template>
  <header>
    <div class="has-text-centered">
      <h1>
        <img src="../assets/logo.png" alt="logo-alura-tracker" />
      </h1>
    </div>
    <div class="has-text-centered">
      <button class="button" @click="alterarTema" :style="botao">
        {{ textoBotao }}
      </button>
    </div>
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link to="/" class="link">
            <i class="fas fa-tasks"></i>
            Tarefas
          </router-link>
        </li>
        <li>
          <router-link to="/projetos" class="link">
            <i class="fas fa-project-diagram"></i>
            Projetos
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BarrraLateral",
  emtis: ["aoTemaAlterado"],
  data() {
    return {
      modoEscuro: false,
      botao: {
        padding: ".9rem",
        background: "#1060aae3",
        "border-color": "#1060aae3",
        color: "#ddd",
        "font-weight": "bold",
      },
    };
  },
  methods: {
    alterarTema() {
      this.modoEscuro = !this.modoEscuro;
      this.$emit("aoTemaAlterado", this.modoEscuro);
    },
  },
  computed: {
    textoBotao(): string {
      return this.modoEscuro ? "Modo Claro" : "Modo Escuro";
    },
  },
});
</script>

<style scoped>
/* Todo o estilo do componente */
header {
  padding: 0.9rem;
  background: #0d3b66;
  width: 95%;
  height: 100vh;
}
@media only screen and(max-width:768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
.panel li {
  margin: 8px 2px;
}
.link {
  color: #fff;
}
.link:hover {
  color: #faf0ca;
}
.link.router-link-active {
  color: #faf0ca;
}
img {
  width: 80%;
}
</style>
