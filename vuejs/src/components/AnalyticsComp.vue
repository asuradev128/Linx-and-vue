<template>
    <main class="setting">
        <h1 class="mb-5">Anaytics</h1>
        <section style="width:80%">
            <table  class="table table-borderless" style="width:100%">
            <tr>
                <th>Stock</th>
                <th>Total Invest</th>
                <th>Total Sell</th> 
                <th>Profit / loss (<img src="../assets/euro-symbol.svg" style="width:12px; padding: 0"/> )</th>
            </tr>
            <analystic-item-comp v-for="item in analystics" :key="item.id"
                :name="item.name"
                :total="item.buy"
                :sell="item.sell"
                :netvar="item.netvar"
                :price="item.price"
            />
            <analystic-total-comp
                :total="total"
                :sell="sell"
                :pl="pl"
                 />
        </table>
        </section>
    </main>
</template>

<script>
import { defineComponent } from 'vue'
import '../assets/scss/profile.scss'
import { mapActions, mapState } from 'vuex';
import AnalysticItemComp from './AnalysticItemComp.vue';
import AnalysticTotalComp from './AnalysticTotalComp.vue';


export default defineComponent({
  components: { AnalysticItemComp, AnalysticTotalComp },
    created() {
        this.getAll();
    }, 
    computed: {
        ...mapState({
            analystics: state=>state.analystics.all.items,  
            total: state=>state.analystics.total,     
            sell: state=>state.analystics.sell,     
            pl: state=>state.analystics.pl,     
        })
    },
    methods: {
        ...mapActions('analystics', ['getAll']),
    }
})
</script>
<style lang="scss">
    label {
        font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif
    }
    table, th, td, input {
        // border: 1px solid black;
        border-collapse: collapse;
    }
    button {
        border: 1px solid;
    }
    * {
        text-align: center;
    }
</style>