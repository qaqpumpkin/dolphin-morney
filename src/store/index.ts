import Vue from 'vue'
import Vuex from 'vuex'
import clone from "@/lib/clone";
import createId from "@/lib/createId";
import router from "@/router";
import {moneyIcon} from '@/lib/config'

Vue.use(Vuex) //把store绑到Vue.prototype


const store = new Vuex.Store({
    state: {
        recordList: [] as RecordItem[],
        tagList: [] as Tag[],
        currentTag: undefined,
        initState: false
    } as RootState,
    mutations: {
        setCurrentTag(state, id) {
            state.currentTag = state.tagList.filter(t => t.id === id)[0]
        },
        fetchRecords(state) {
            state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
        },
        createRecord(state, record) {
            const record2: RecordItem = clone(record)
            record2.createdAt = record2.createdAt || new Date().toISOString()
            state.recordList && state.recordList.push(record2)
            store.commit('saveRecords')
            window.alert('已保存')
        },
        saveRecords(state) {
            window.localStorage.setItem('recordList', JSON.stringify(state.recordList))
        },
        initTags(state) {
            //初始化状态
            const initState = state.initState
            if(!initState) {
                state.tagList = moneyIcon
                store.commit('saveTags')
                state.initState = true
            }
        },
        fetchTags(state) {
            state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
        },
        createTag(state, name: string) {
            const names = state.tagList.map(item => item.name)
            if (names.indexOf(name) >= 0) {
                window.alert(('标签名重复了'))
            }
            const id = createId().toString();
            state.tagList.push({id, name: name})
            store.commit('saveTags')
            window.alert('添加成功')
        },
        saveTags(state) {
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
        },
        updateTag(state, payload: { id: string; name: string }) {
            const {id, name} = payload
            const idList = state.tagList.map(item => item.id)
            if (idList.indexOf(id) >= 0) {
                const names = state.tagList.map(item => item.name)
                if (names.indexOf(name) >= 0) {
                    window.alert('标签名重复了')
                } else {
                    const tag = state.tagList.filter(item => item.id === id)[0]
                    tag.name = name
                    store.commit('saveTags')
                }
            }
        },
        removeTag(state, id: string) {
            let index = -1
            for (let i = 0; i < state.tagList.length; i++) {
                if (state.tagList[i].id === id) {
                    index = i
                    break
                }
            }
            if (index >= 0) {
                state.tagList.splice(index, 1)
                store.commit('saveTags')
                router.back()
            }
            state.tagList.splice(index, 1)
            store.commit('saveTags')
        }
    }
})

export default store
