export default{
    save: (params) => localStorage.setItem('todoapp',JSON.stringify(params)),
    parse: () => JSON.parse(localStorage.getItem('todoapp'))
}