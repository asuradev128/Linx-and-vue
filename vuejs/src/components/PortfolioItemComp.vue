<template>
    <tr>
        <td>{{index}}</td>
        <td>{{name}}</td>
        <td>{{qty}}</td>
        <td><input placeholder="Qty" class="w3-first" type="number" v-model="sqty" /></td>
        <td><button @click="confirm">Confirm</button></td>
    </tr>
</template>

<script>

    import { mapActions } from 'vuex'

    export default {
        data(){
            return{
                sqty: 0,
                isbusy: false
            }
        },
        props: {
            id: { require: true, type:Number },
            name: {require: true, type: String },
            qty: {require: true, type: Number },
            index: {require: true, type: Number },
        },
        methods: {
            ...mapActions('portfolio', ['update']),
            confirm() {
                if(this.isbusy)return;
                this.isbusy=true;
                if(this.sqty > this.qty || this.sqty <= 0 || this.qty <= 0) {
                    alert('Pls, Input again...');
                    this.isbusy=false;
                }
                else{
                let nqty = this.qty-this.sqty;
                const data={
                    portfolio: {
                        id: this.id, 
                        portfolio:{ 
                            qty: nqty
                        }
                    },
                    analystic: {
                        id: this.id,
                        analystic: {
                            stock: this.id,
                            buy: this.qty,
                            sell: this.sqty
                        }
                    },
                    notification:this.$store.state.account.user.user.email+': '+this.name + '(' + this.sqty + ') sell'
                }
                this.update(data)
                    .then(() => {
                            this.sqty = 0;
                            this.isbusy=false;
                            this.$emit('onSell')
                       
                    },error => {this.isbusy = false;console.log(error)}).catch(err=>{this.isbusy=false;console.log(err)});
                }
            }
        }
    }
</script>