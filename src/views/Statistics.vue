<template>
    <Layout>
        <Tabs class-prefix="interval" :data-source="recordTypesList" :value.sync="type"></Tabs>
        <div class="chart-wrapper" ref="chartWrapper">
            <chart class="chart" :options="chartOptions"></chart>
        </div>
        <ol>
            <li v-for="(group, index) in groupList" :key="index">
                <h3 class="title">{{beautify(group.title) }}<span>¥{{group.total}}</span></h3>
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
import Chart from "@/components/Chart.vue";
import _ from 'lodash'

@Component({
    components: {Chart, Tabs},
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

    get chartOptions() {
        const today = new Date()
        const array = []
        console.log('this.recordList', this.recordList)
        for (let i = 0; i <= 29; i++) {
            const date = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD')
            array.push({date: date,  value: _.find(this.recordList, {
                    createdAt: date})?.amount})
        }
        console.log('array', array)
        array.sort((a, b) => {
            if (a.date > b.date) {
                return 1
            } else if (a.date === b.date) {
                return 0
            } else {
                return -1
            }
        })
        const keys = array.map(item => item.date)
        const values = array.map(item => item.value)
        return {
            grid: {
                left: 0,
                right: 0,
            },
            xAxis: {
                type: 'category',
                data: keys,
                axisTick: {alignWithLabel: true},
                axisLine: {lineStyle: {color: '#666'}},
                axisLabel: {
                    formatter: function (value: string, index: number) {
                        return value.substr(5)
                    }
                }
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    symbolSize: 10,
                    itemStyle: {borderWidth: 1, radius: 10, color: '#666', borderColor: '#666'},
                    data: values,
                    type: 'line'
                }
            ],
            tooltip: {
              show: true,
              triggerOn: 'click',
              position: 'top',
              formatter: '{c}'
            }
        }
    }
    
    get groupList() {
        const {recordList} = this
        if(recordList.length === 0) {return []}
        const newList = clone(recordList)
            .filter(r => r.type === this.type)
            .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
        if(newList.length === 0) {return [] as Result}
        type Result = {title: string; total?: number; items: RecordItem[]}[]
        const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}]
        for (let i = 1; i < newList.length; i++) {
            const current = newList[i]
            const last = result[result.length - 1]
           if(dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
               last.items.push(current)
           } else {
               result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]})
           }
        }
        result.map(group => {
            group.total = group.items.reduce((sum, item) => sum + item.amount, 0)
        })
        return result
    }

    mounted() {
        const div = this.$refs.chartWrapper as HTMLDivElement
        div.scrollLeft = div.scrollWidth
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
.chart{
    width: 430%;
    &-wrapper{
        overflow: auto;
        &::-webkit-scrollbar {
          display: none;
        }
    }
}
</style>
