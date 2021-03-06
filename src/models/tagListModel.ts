import createId from "@/lib/createId";
const localStorageKeyName = 'tagList'

const tagListModel: TagListModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName ) || '[]');
        return this.data;
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
    update(id, name) {
        const idList = this.data.map(item => item.id)
        if ( idList.indexOf(id) >= 0) {
            const names = this.data.map(item => item.name)
            if (names.indexOf(name) >= 0) {
                return 'duplicate'
            }
            else {
                const tag = this.data.filter(item => item.id === id)[0]
                tag.name = name
                this.save()
                return 'success'
            }
        }
        else{
            return 'not found'
        }
    },
    remove(id: string) {
        let index = -1
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                index = i
                break
            }
        }
        this.data.splice(index, 1)
        this.save();
        return true
    },
    create(name: string) {
        const names = this.data.map(item => item.name)
        if(names.indexOf(name) >= 0) { return 'duplicated';}
        const id = createId().toString();
        console.log('id', id)
        this.data.push({id, name: name})
        this.save();
        return 'success'
    }
}
export default tagListModel
