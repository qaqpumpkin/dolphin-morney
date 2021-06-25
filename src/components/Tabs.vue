<template>
    <ul class="tabs" :class="{[classPrefix+'-tabs']: classPrefix}">
        <li v-for="item in dataSource" :key="item.value" class="tabs-item"
            :class="liClass(item)"
        @click="select(item)">{{item.text}}</li>
    </ul>
</template>

<style scoped lang="scss">
::v-deep .zzz-item {
    background: white;
    &.selected{
        background: #c4c4c4;
        &::after {
            display: none;
        }
    }
}
</style>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator'
    type DataSourceItem = {text: string; value: string}

    @Component
    export default class Tags extends Vue{
        @Prop(String) readonly  classPrefix!: string;
        @Prop(String) readonly value!: string;
        @Prop({required: true, type: Array})
        dataSource!: DataSourceItem[]

        liClass(item: DataSourceItem){
            return {selected: item.value === this.value, [this.classPrefix + '-tabs-item']: this.classPrefix}
        }

        select(item: DataSourceItem) {
            this.$emit('update:value', item.value)
        }
    }
</script>

<style lang="scss" scoped>
.tabs {
    background: #ffd946;
    display: flex;
    text-align: center;
    font-size: 24px;
    &-item {
        width: 50%;
        height: 64px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        &.selected::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: #333333;
        }
    }
}
</style>