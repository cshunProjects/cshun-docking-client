export const state = ()=>({
    users:[]
})
export const getters = {
   
}
export const mutations = {
    updateAll(state,users){
        state.users = users
    },
    updateSingle(state,user){
        state.users = state.users.map(_=>_.id === user.id ? user : _)
    }
}