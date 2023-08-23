import IProjeto from "@/interfaces/IProjeto";
import { INotificacoes} from "@/interfaces/INotificacoes";

import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";

import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETOS, DEFINIR_TAREFAS, EXCLUIR_PROJETO, NOTIFICAR } from "./tipo-mutacoes";
import { CADASTRAR_PROJETO, EDITAR_PROJETO, OBTER_PROJETOS, DELETAR_PROJETO, OBTER_TAREFAS } from "./tipo-actions";

import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";

interface Estado {
    tarefas: ITarefa[],
    projetos: IProjeto[],
    notificacoes: INotificacoes[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        tarefas: [],
        notificacoes: []
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos
        },
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
        [NOTIFICAR](state, novaNotificacao:INotificacoes){
            
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(()=> {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
        }
    },
    actions:{
        [OBTER_PROJETOS] ({ commit }){
            http.get('/projetos')
                .then(resposta => commit(DEFINIR_PROJETOS, resposta.data))
        },
        [CADASTRAR_PROJETO] (contexto, nomeDoProjeto: string){
            return http.post('/projetos', {
                nome: nomeDoProjeto
            })
        },
        [EDITAR_PROJETO] (contexto, projeto: IProjeto){
            return http.put(`/projetos/${projeto.id}`, projeto)
        },
        [DELETAR_PROJETO] ({ commit }, id: string){
            return http.delete(`/projetos/${id}`)
            .then(() => commit(EXCLUIR_PROJETO, id))
        },
        [OBTER_TAREFAS] ({ commit }){
            http.get('/tarefas')
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
        },
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}