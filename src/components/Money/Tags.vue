<template>
    <div class="tags">
<!--        <div class="new">-->
<!--            <button @click="create">-->
<!--                新增标签-->
<!--            </button>-->
<!--        </div>-->
        <ul class="moneyIcon">
            <li v-for="(icon, index) in moneyIcon" class="moneyIcon-item" :key="index">
                <Icon class="icon" :name="icon.id"></Icon>
            </li>
        </ul>
<!--        <ul class="current">-->
<!--            <li-->
<!--                v-for="tag in tagList"-->
<!--                :key="tag.id"-->
<!--                :class="{selected: selectedTags.indexOf(tag) >= 0}"-->
<!--                @click="toggle(tag.name)"-->
<!--            >{{tag.name}}</li>-->
<!--        </ul>-->
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import { moneyIcon } from '@/lib/config'
@Component({
    computed: {
        tagList() {
            return this.$store.state.tagList
        }
    }
})
export default class Tags extends Vue{
    selectedTags: string[] = []
    moneyIcon: object[] = moneyIcon
    created() {
        this.$store.commit('fetchTags')
    }
    toggle(tag: string) {
        const index = this.selectedTags.indexOf(tag)
        if (index >= 0) {
            this.selectedTags.splice(index, 1)
        } else {
            this.selectedTags.push(tag)
        }
        console.log('this.selectedTags', this.selectedTags)
        this.$emit('update:value', this.selectedTags)
    }
    create() {
        const name = window.prompt('请输入标签名')
        if (!name) {return window.alert('标签名不能为空')}
        this.$store.commit('createTag', name)
    }
}
</script>

<style lang="scss" scoped>
.tags {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    font-size: 14px;
    //padding: 16px;
    > .current {
        display: flex;
        flex-wrap: wrap;
        > li {
            $bg: #d9d9d9;
            background: $bg;
            $h: 24px;
            height: $h;
            line-height: $h;
            border-radius: ($h/2);
            padding: 0 16px;
            margin-right: 12px;
            margin-top: 4px;
            &.selected {
                background: red;
                color: white;
            }
        }
    }
    >.new {
        padding-top: 16px;
        button {
            background: transparent;
            border: none;
            color: #999;
            border-bottom: 1px solid;
            padding: 0 4px;
        }
    }
    .icon{

    }
    .moneyIcon{
        &-item{
            display: flex;
            justify-content: center;
            align-items: center;
            float: left;
            margin: 16px;
            background: #FFF;
            $h: 64px;
            height: $h;
            width: $h;
            line-height: $h;
            border-radius: $h;
            .icon{
                left: 50%;
                font-size: 48px;
            }
        }
    }
}
</style>
