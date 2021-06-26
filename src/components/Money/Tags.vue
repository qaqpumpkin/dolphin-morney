<template>
    <div class="tags">
        <ul class="moneyIcon">
            <li v-for="(icon, index) in tagList"
                class="moneyIcon-content"
                :key="index">
                <div class="moneyIcon-item" :class="{selected: selectedTags.indexOf(icon.name) >= 0}"
                     @click="toggle(icon.name)">
                    <Icon class="icon" :name="icon.id"></Icon>
                </div>
                <span>{{icon.name}}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
@Component({
    computed: {
        tagList() {
            return this.$store.state.tagList
        }
    }
})
export default class Tags extends Vue{
    selectedTags: string[] = []
    created() {
        this.$store.commit('initTags')
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
    font-size: 14px;
    flex: 1;
    overflow-y: auto;
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
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        &-content{
            display: flex;
            //flex-grow: 1;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 16px;
        }
        &-item{
            display: flex;
            justify-content: center;
            align-items: center;
            float: left;
            background: #FFF;
            $h: 56px;
            height: $h;
            width: $h;
            line-height: $h;
            border-radius: $h;
            .icon{
                left: 50%;
                font-size: 48px;
            }
            &.selected {
                background: #ffd946;
                color: white;
            }
        }
    }
}
</style>
