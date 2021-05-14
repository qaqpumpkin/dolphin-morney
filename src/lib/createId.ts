let id: number = parseInt(window.localStorage.getItem('_idMax') || '0') || 0;

function createId() {
    id++;
    console.log('id', id)
    window.localStorage.setItem('_idMax', String(id))
    return id;
}

export default createId;
