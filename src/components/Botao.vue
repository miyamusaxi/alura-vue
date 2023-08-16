<template>
    <button class="button" @click="clicado" :disabled="desabilitado">
        <span class="icon">
            <i :class="icone"></i>
        </span>
        <span>{{texto}}</span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'botao-',
    emits:['clicado'],
    props:{
        desabilitado:{
            type:Boolean,
        },
        icone:{
            type: String,
            required:true,
        },
        texto:{
            type:String,
            required: true,
        },    
    },
    methods:{
        clicado ():void{
            this.$emit('clicado')
        }
    },
});

</script>

<style scoped>
.button{
    padding: .9rem;
    background: #1060aae3;
    border-color: #1060aae3;
    color:#ddd
    
}
</style>