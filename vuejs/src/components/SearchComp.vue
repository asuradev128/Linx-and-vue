<template>
    <main class="setting">
        <h1 class="mb-5">Search</h1>
        <section style="width:80%">
            <input placeholder="Search" class="form-control input-sm" style="margin-bottom: 20px" v-model="key" @keyup="search" />
            <table class="table table-borderless" style="width:100%">
            <thead>
                <tr>
                    <th>No</th>
                    <th>StockName</th> 
                    <th>Price(<img src="../assets/euro-symbol.svg" style="width:12px"/> )</th>
                    <th>Pervious Close(<img src="../assets/euro-symbol.svg" style="width:12px"/> )</th>
                    <th>NetVar(<img src="../assets/euro-symbol.svg" style="width:12px"/> )</th>
                    <th>Change(% )</th>
                    <th>Beta</th>
                    <th>Volume</th>
                </tr>
            </thead>
            <tbody>
                <search-item-comp v-for="(item, index) in (key===''?items:vitems)" 
                        :key="item.id"
                        :index="index" 
                        :name="item.name" 
                        :volume="item.volume" 
                        :beta="item.beta" 
                        :prev_price="item.prev_price" 
                        :change="item.change" 
                        :price="item.price" 
                        :netvar="item.netvar"
                        />
            </tbody>

        </table>
        </section>
    </main>
</template>

<script>
import { defineComponent } from 'vue'
import '../assets/scss/profile.scss'
import { mapState, mapActions } from 'vuex'
import SearchItemComp from '@/components/SearchItemComp';

export default defineComponent({
    data() {
        return {
            key:'',
            vitems:[]
        }
    },
    components: {
        SearchItemComp
    },
    created() {
        this.getAll();
    },
    computed: {
        ...mapState({
        items: state=>state.stock.all.items, 
    })
    },
    methods: {
        ...mapActions('stock', ['getAll']),
        search() {
            this.vitems = this.items.filter(item => item.name.match(this.key))
        }
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
