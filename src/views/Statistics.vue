<template>
  <Layout>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"></Tabs>
    <ol>
      <li v-for="group in result" :key="group.title">
        <h3>{{ group.title }}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{tagString(item.tags)}}</span>
            <span class="notes">{{item.notes}}</span>
            <span>￥{{item.amount}} </span>
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

@Component({
  components: {Tabs},
})
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',');
  }
  get recordList() {
    return (this.$store.state as RootState).recordList
  }

  get result() {
    const {recordList} = this
    type Item = RecordItem[]
    type HashTableValue = { title: string; items: Item }
    const hashTable: { [key: string]: HashTableValue } = {}
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createdAt!.split('T')
      hashTable[date] = hashTable[date] || {title: date, items: []}
      hashTable[date].items.push(recordList[i])
    }
    console.log('hashTable', hashTable)
    return hashTable
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