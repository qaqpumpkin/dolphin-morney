<template>
    <Layout>
        <Tabs class-prefix="interval" :data-source="recordTypesList" :value.sync="type"></Tabs>
        <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"></Tabs>
        <ol>
            <li v-for="(group, index) in groupList" :key="index">
                <h3 class="title">{{beautify(group.title) }}</h3>
                <ol>
                    <li v-for="item in group.items" :key="item.id" class="record">
                        <span>{{ tagString(item.tags) }}</span>
                        <span class="notes">{{ item.notes }}</span>
                        <span>￥{{ item.amount }} </span>
                    </li>
                </ol>
            </li>
        </ol>
    </Layout>
</template>


<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator'
import Tabs from "@/components/Tabs.vue";
import intervalList from '@/constants/interval'
import recordTypesList from "@/constants/recordTypesList";
import dayjs from 'dayjs'
import clone from "@/lib/clone";

@Component({
    components: {Tabs},
})
export default class Statistics extends Vue {
    tagString(tags: Tag[]) {
        return tags.length === 0 ? '无' : tags.join(',');
    }
    beautify(string: string) {
        const day = dayjs(string)
        const now = dayjs()
        if (day.isSame(now, 'day')) {
            return '今天'
        } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
            return '昨天'
        } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
            return '前天'
        } else if (day.isSame(now, 'year')) {
            return day.format('M月D日')
        } else {
            return day.format('YYYY年M月D日')
        }
    }
    get recordList() {
        return (this.$store.state as RootState).recordList
    }

    get groupList() {
        const {recordList} = this
        if(recordList.length === 0) {return []}
        const newList = clone(recordList).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
        const data = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}]
        for (let i = 1; i < newList.length; i++) {
            const current = newList[i]
            const last = data[data.length - 1]
           if(dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
               last.items.push(current)
           } else {
               data.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]})
           }
        }
        return data
    }

    mounted() {
        this.$store.commit('fetchRecords')
    }
    type = '-'
    interval = 'day'
    intervalList = intervalList
    recordTypesList = recordTypesList
}
</script>

<style scoped lang="scss">
::v-deep {
    .type-tabs-item {
        background: #C4C4C4;

        &.selected {
            background: white;

            &::after {
                display: none;
            }
        }
    }

    .interval-tabs-item {
        height: 48px;
    }
}

%item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
}

.title {
    @extend %item;
}

.record {
    background: white;
    @extend %item;
}

.notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
}

::v-deep .interval-tabs-item {
    height: 48px
}
</style>
