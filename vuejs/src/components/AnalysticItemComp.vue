<template>
    <tr>
        <td>{{name}}</td>
        <td>{{totalx.toPrecision(4)}}</td>
        <td>{{sellx.toPrecision(4)}}</td>
        <td>{{profitx.toPrecision(4)}}</td>
    </tr>
</template>

<script>
    export default {
        data(){
            return {
                totalx:this.total*this.price,
                sellx:this.sell*this.price,
                profitx:this.sell*this.netvar,
            }
        },
        props: {
            total: { require: true, type:Number },
            sell: {require: true, type: Number },
            netvar: {require: true, type: Number },
            price: {require: true, type: Number },
            name: {require: true, type: String },
        },
    }
</script>