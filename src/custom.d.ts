type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number; //数据类型
    createdAt?: Date;// 类 / 构造函数
}

type Tag = {
    id: string;
    name: string;
}
type TagListModel = {
    data: Tag[];
    fetch: () => Tag[];
    create: (name: string) => 'success' |  'duplicated';// 'success' 表示成功；'duplicated' 表示name重复
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicate';
    remove: (id: string) => true;
    save: () => void;
}

interface Window {
    tagList: Tag[];
    createTag: (name: string) => void;
    removeTag: (id: string) => boolean;
    updateTag: TagListModel['update'];
    findTag: (id: string) => Tag | undefined;
}