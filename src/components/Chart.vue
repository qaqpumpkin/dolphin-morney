<template>
    <div class="wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue} from 'vue-property-decorator'
import echarts, {EChartOption} from 'echarts'
@Component
export default class Chart extends Vue{
    @Prop() options?: EChartOption
    mounted() {
        console.log('this.options---------------', this.options)
        if(this.options === undefined){
            return console.error('options 为空')
        }
        console.log('echarts', echarts)
        const chart = echarts.init(this.$refs.wrapper as HTMLDivElement)
        console.log('this.options', this.options)
        chart.setOption(this.options!)
    }
}
</script>

<style scoped lang="scss">
    .wrapper{
        height: 400px;
    }
</style>