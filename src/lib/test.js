function getId(){
    const text = window.location.href.split('&')
    let id
    text.forEach(item => {
        if (item.indexOf('homeworkId') !== -1) {
            id = item.split('=')[1]
        }
    })
    return id
}
const res = 'http://package.ketangpai.com/Package/downloadStudentsView/homeworkid/' +getId() +'/uid/MDAwMDAwMDAwMLOsqZmH36uwhrVyoQ/size/large.html'
console.log(res)
