<template>
    <div style="height: 100vh;">
        <Layout class-prefix="layout">
            <NumberPad class="fixed" :value.sync="record.amount" @submit="saveRecord"/>
            <!--          <Types :value.sync="record.type"/>-->
            <div class="createdAt">
                <FormItem
                    class="fixed"
                    type="date"
                    field-name="日期"
                    placeholder="在这里输入日期"
                    :value.sync="record.createdAt"/>
            </div>
            <div class="notes">
                <FormItem
                    class="fixed"
                    field-name="备注"
                    placeholder="在这里输入备注"
                    :value.sync="record.notes"/>
            </div>
            <Tags @update:value="onUpdateTags"/>
            <Tabs class="fixed" :data-source="recordTypesList" :value.sync="record.type"></Tabs>
        </Layout>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NumberPad from "@/components/Money/NumberPad.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import {Component} from 'vue-property-decorator'
import recordTypesList from '@/constants/recordTypesList'
import Tabs from "@/components/Tabs.vue";

window.localStorage.setItem('version', '0.0.1')

@Component({
    components: {Tabs, Tags, FormItem: FormItem, NumberPad}
})
export default class Money extends Vue {
    get recordList() {
        return this.$store.state.recordList
    }

    recordTypesList = recordTypesList
    record: RecordItem = {
        tags: [], notes: '', type: '+', amount: 0, createdAt: new Date().toISOString()
    }

    created() {
        this.$store.commit('fetchRecords')
    }

    saveRecord() {
        this.$store.commit('createRecord', this.record)
    }

    onUpdateTags(value: Tag[]) {
        this.record.tags = value
    }
}
</script>
<style>
.layout-content {
    display: flex;
    flex-direction: column-reverse;
}

.fixed {
    flex: 0 0 auto;
}
</style>
