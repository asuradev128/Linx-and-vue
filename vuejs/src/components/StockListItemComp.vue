<template>
    <tr>
        <td>{{index}}</td>
        <td>{{name}}</td>
        <td>{{volume}}</td>
        <td>{{price}}</td>
        <td>{{prev_price}}</td>
        <td>{{netvar}}</td>
        <td>{{change}}</td>
        <td>{{beta}}</td>
        <td><input placeholder="input your quentity" class="w3-first" type="number" v-model="qty" style="width: 80px" /></td>
        <td><button :disabled="isbusy" @click="buy" >buy</button></td>
    </tr>
</template>
<script>
import { mapActions , mapState} from 'vuex'
import '../assets/euro-symbol.svg';
export default {
    data() {
        return {
            qty: 0,
            isbusy: false
        }
    },
    props: {
        name: { required: true, type: String },
        price: { required: true, type: String },
        volume: { required: true, type: String },
        beta: { required: true, type: String },
        change: { required: true, type: String },
        prev_price: { required: true, type: String },
        netvar: { required: true, type: String },
        id: { required: true, type: String },
        index: { required: true, type: String}
    },
    created() {
    },
    computed:{
        ...mapState({
            msgtype: state=>state.alert.type,
            msg:state=>state.alert.message
        })
    },
    methods: {
        ...mapActions('portfolio', ['create']),
        buy() {
            if(this.isbusy)return;
            this.isbusy = true;
            if(this.qty <= 0){
                alert('Pls input Qty again.');
                this.isbusy=false;
            }else{
           
            const data={
                portfolio:{
                stock: this.id,
                qty: this.qty
                },
                analystic:{
                stock: this.id,
                buy: this.qty,
                sell: 0
                },
                notification:this.$store.state.account.user.user.email+': '+this.name + '(' + this.qty + ') buy'
            }
            this.create(data).then(()=>{
                
                this.isbusy = false;
                this.qty = 0;
                this.$emit('onbuy');
              
            },error => {this.isbusy = false;console.log(error)}).catch(err=>{this.isbusy=false;console.log(err)});
            
            }
        }
    }
}
</script>