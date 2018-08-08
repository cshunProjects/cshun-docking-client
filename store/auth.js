export const state = ()=>({
    username:null,
    isAdmin:false,
    districtsRW:[],
    loginError:""
})
export const getters = {
    isLogin:({username})=>!!username,
    isAdmin:({isAdmin})=>!!isAdmin,
    canWriteDistrict:({districtsRW},{isLogin,isAdmin})=>(district)=>isLogin && (isAdmin || districtsRW.indexOf(district)>=0)
}
export const mutations = {
    update (state, {username,isAdmin,districtsRW}) {
        state.username = username;
        state.isAdmin = isAdmin;
        state.districtsRW = districtsRW;
        state.loginError = "";
    },
    updateErrorMessage(state,message){
        state.loginError = message;
    }
}
export const actions = {
     login({commit,dispatch},{username,password}){
        return this.$axios.post("/login",{username,password})
            .then(({data})=>{
                const {token} = data
                this.$axios.setToken(token, 'Bearer')
                sessionStorage.setItem('token',token)
            })
            .then(()=>dispatch('me'))
            .catch(({response})=>commit('updateErrorMessage',response.data.message))
            .finally(()=>this.$router.back())
    },me({commit},token){
        return this.$axios.get(`/me`,token ? {headers:{authorization:`bearer ${token}`}}:{}).then(({data})=>commit('update',data))
    }
}