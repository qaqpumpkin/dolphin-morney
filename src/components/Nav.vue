<template>
    <nav>
        <router-link to="/money" class="item" active-class="selected">
            <Icon name="money"/>
            <p class="name">记账</p>
        </router-link>
        <router-link to="/labels" class="item" active-class="selected">
            <Icon name="label"/>
            <p class="name">标签</p>
        </router-link>
        <router-link to="/statistics" class="item" active-class="selected">
            <Icon name="statistics"/>
            <p class="name">统计</p>
        </router-link>
    </nav>
</template>

<script lang="ts">
export default {
    name: 'Nav'

};
</script>

<style lang="scss" scoped>

@import "~@/assets/style/helper.scss";

nav {
    display: flex;
    @extend %outerShadow;
    flex-direction: row;
    font-size: 12px;

    > .item {
        padding: 2px 0;
        width: 33.33333%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .icon {
        width: 30px;
        height: 30px;
    }

    .name {
        color: #767676;
    }

    > .item.selected {
        color: $color-highlight;
    }
}
</style>
