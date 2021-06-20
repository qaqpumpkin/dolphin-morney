import record from "@/store/record";
import tagStore from "@/store/tagStore";

const store = {
    ...record,
    ...tagStore
}

export default store