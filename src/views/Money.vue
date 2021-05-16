<template>
    <div>
      <Layout class-prefix="layout">
          <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
          <Types :value.sync="record.type"/>
          <FormItem field-name="备注"
                 placeholder="在这里输入备注"
                 @update:value="onUpdateFormItem"/>
          <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
      </Layout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import NumberPad from "@/components/Money/NumberPad.vue";
    import Types from "@/components/Money/Types.vue";
    import FormItem from "@/components/Money/FormItem.vue";
    import Tags from "@/components/Money/Tags.vue";
    import {Component, Watch} from 'vue-property-decorator'
    import recordListModel from '@/models/recordListModel';
    import tagListModel from '@/models/tagListModel';

    window.localStorage.setItem('version', '0.0.1')

    const recordList = recordListModel.fetch()

    @Component({
        components: {Tags, FormItem: FormItem, Types, NumberPad}
    })
    export default class Money extends Vue{
        tags = window.tagList
        recordList: RecordItem[] = recordList
        record: RecordItem = {
            tags: [], notes: '', type: '+', amount: 0
        }
        onUpdateTags(value: string[]) {
            this.record.tags = value
        }
        onUpdateFormItem(value: string) {
            this.record.notes = value
        }
        saveRecord() {
            recordListModel.create(this.record)
        }
        @Watch('recordList')
        onRecordListChange() {
            recordListModel.save()
        }
    }
</script>
<style>
    .layout-content {
        display: flex;
        flex-direction: column-reverse;
    }
</style>
