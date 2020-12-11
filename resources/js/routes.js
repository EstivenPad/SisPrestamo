import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function verificarAcceso(to, from, next){
    let authUser = JSON.parse(sessionStorage.getItem('authUser'));
    console.log(authUser);
    if(authUser){
        let listaPermisosByRol = JSON.parse(sessionStorage.getItem('listaPermisosByRol'));
        if(listaPermisosByRol.includes(to.name)){
            next();
        }else{
            let listaPermisosByRolFiltrada = []; 

            listaPermisosByRol.forEach((item, index) => {
                if(item.includes('index')){
                    listaPermisosByRolFiltrada.push(item)
                }
            })
            
            if(to.name == 'index'){
                next({ name: listaPermisosByRolFiltrada[0] });
            }else{
                next(from.path);
            }

            console.log(listaPermisosByRolFiltrada);    
        }
    }else{
        next('/login');
    }
}

export const rutas = [
    /************** Login *****************/
    { 
        path: '/login', 
        name: 'login',
        component: require('./components/modulos/autenticacion/login').default
    },

    /************** Inicio *****************/
    { 
        path: '/',
        name: 'index',
        component: require('./components/modulos/index').default,
        beforeEnter: (to, from, next) => {
           verificarAcceso(to, from, next);
        }  
    },

    /************** Usuario *****************/
    { 
        path: '/usuario', 
        name: 'usuario.index',
        component: require('./components/modulos/usuario/index').default,
        beforeEnter: (to, from, next) => {
            verificarAcceso(to, from, next);
        }  
    },
    { 
        path: '/usuario/crear',
        name: 'usuario.crear', 
        component: require('./components/modulos/usuario/crear').default,
        beforeEnter: (to, from, next) => {
            verificarAcceso(to, from, next);
        }  
    },
    {
        path: '/usuario/editar/:id',
        name: 'usuario.editar',
        component: require('./components/modulos/usuario/editar').default,
        beforeEnter: (to, from, next) => {
            verificarAcceso(to, from, next);
        }, 
        props: true
    },

    /************** Cliente *****************/
    { 
        path: '/cliente', 
        name: 'cliente.index',
        component: require('./components/modulos/cliente/index').default,
        beforeEnter: (to, from, next) => {
            verificarAcceso(to, from, next);
        } 
    },
    { 
        path: '/cliente/crear', 
        name: 'cliente.crear',
        component: require('./components/modulos/cliente/crear').default,
        beforeEnter: (to, from, next) => {
            verificarAcceso(to, from, next);
        } 
    },
    {
        path: '/cliente/editar/:id',
        name: 'cliente.editar',
        component: require('./components/modulos/cliente/editar').default,
        beforeEnter: (to, from, next) => {
            verificarAcceso(to, from, next);
        }, 
        props: true
    },

    /************** Rol *****************/
    { 
        path: '/rol', 
        name: 'rol.index',
        component: require('./components/modulos/rol/index').default,
        beforeEnter: (to, from, next) => {
            verificarAcceso(to, from, next);
        }  
    },
    { 
        path: '/rol/crear',
        name: 'rol.crear',
        component: require('./components/modulos/rol/crear').default,
        beforeEnter: (to, from, next) => {
            verificarAcceso(to, from, next);
        }  
    },
    {
        path: '/rol/editar/:id',
        name: 'rol.editar',
        component: require('./components/modulos/rol/editar').default,
        beforeEnter: (to, from, next) => {
            verificarAcceso(to, from, next);
        }, 
        props: true
    },
    
    /************** Permiso *****************/
    { 
        path: '/permiso', 
        name: 'permiso.index',
        component: require('./components/modulos/permiso/index').default,
        beforeEnter: (to, from, next) => {
            verificarAcceso(to, from, next);
        } 
    },
    { 
        path: '/permiso/crear', 
        name: 'permiso.crear',
        component: require('./components/modulos/permiso/crear').default,
        beforeEnter: (to, from, next) => {
            verificarAcceso(to, from, next);
        } 
    },
    {
        path: '/permiso/editar/:id',
        name: 'permiso.editar',
        component: require('./components/modulos/permiso/editar').default,
        beforeEnter: (to, from, next) => {
            verificarAcceso(to, from, next);
        },
        props: true
    },

    /************** ERROR 404 *****************/
    { 
        path: '*', 
        component: require('./components/plantilla/404').default,
    },
]

export default new VueRouter({
    routes: rutas,
    mode: 'history',
    linkActiveClass: 'active'
})
