function useUnauthHandle(axios){
    axios.interceptors.response.use(null, function (error) {
        if(error.status === 401){
            $router.push('/login')
            return
        }
        return Promise.reject(error)
      });
}

export default function(){
    window.onNuxtReady(function(){
        const {$axios,$router,$store} = window.$nuxt
        const token = sessionStorage.getItem('token')
        if(token){
            $store.dispatch('auth/me',token).then(()=>{
                $axios.setToken(token, 'Bearer')
            }).finally(()=>useUnauthHandle($axios))
        } else useUnauthHandle($axios)
    })
}