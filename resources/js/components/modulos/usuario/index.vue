<template>
    <div class="container">
        <div class="card card-custom gutter-b">
            <div class="card-header flex-wrap py-3">
                <div class="card-title">
                    <h3 class="card-label">
                        Usuarios <span class="d-block text-muted pt-2 font-size-sm">Lista de todos los usuarios</span>
                    </h3>
                </div>
                <div class="card-toolbar">
                    <template v-if="listaPermisosByRol.includes('usuario.crear')">
                    <router-link :to="{ name: 'usuario.crear' }" class="btn btn-primary font-weight-bolder">
                        <span class="svg-icon svg-icon-md"><!--begin::Svg Icon | path:C:\wamp64\www\keenthemes\themes\metronic\theme\html\demo1\dist/../src/media/svg/icons\Communication\Add-user.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <polygon points="0 0 24 0 24 24 0 24"/>
                                <path d="M18,8 L16,8 C15.4477153,8 15,7.55228475 15,7 C15,6.44771525 15.4477153,6 16,6 L18,6 L18,4 C18,3.44771525 18.4477153,3 19,3 C19.5522847,3 20,3.44771525 20,4 L20,6 L22,6 C22.5522847,6 23,6.44771525 23,7 C23,7.55228475 22.5522847,8 22,8 L20,8 L20,10 C20,10.5522847 19.5522847,11 19,11 C18.4477153,11 18,10.5522847 18,10 L18,8 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/>
                                <path d="M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z" fill="#000000" fill-rule="nonzero"/>
                            </g>
                        </svg><!--end::Svg Icon--></span>
                        Crear Usuario
                    </router-link>
                    </template>
                </div>
            </div>
            <div class="card-body">
                <div id="kt_datatable_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                    <div class="row">
                        <div class="col-sm-12">
                            <table class="table table-bordered table-checkable dataTable no-footer dtr-inline collapsed"
                                id="kt_datatable" role="grid" aria-describedby="kt_datatable_info"
                                style="width: 1230px;">
                                <thead>
                                    <tr role="row">
                                       <th class="table-active">Fotografia</th>
                                       <th class="table-active">Nombre</th>
                                       <th class="table-active">Usuario</th>
                                       <th class="table-active">Estado</th>
                                       <th class="table-active">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   <tr v-for="(item, index) in listarUsuariosPaginated" :key="index">
                                       <td>
                                         <template v-if="!item.imagen">
                                            <li class="user-block">
                                              <img src="/img/user.png" :alt="'Imagen'" class="avatar img-fluid .rounded-circle">
                                            </li>
                                          </template>
                                          <template v-else>
                                            <li class="user-block">
                                              <img :src="'storage/' + item.imagen" :alt="'Imagen'" class="avatar img-fluid img-circle">
                                            </li>
                                          </template>
                                       </td>
                                       <td>
                                          <template v-if="!item.apellido">                                         
                                              <span v-text="item.nombre"></span>
                                          </template>
                                          <template v-else>                                         
                                              <span v-text="item.nombre + ' ' + item.apellido"></span>
                                          </template>
                                       </td>
                                       <td v-text="item.usuario"></td>
                                       <td>
                                          <template v-if="item.estado == 1">
                                            <span class="badge badge-success" v-text="'ACTIVO'"></span>
                                          </template>
                                          <template v-else>
                                            <span class="badge badge-danger" v-text="'INACTIVO'"></span>
                                          </template>
                                       </td>
                                       <td>
                                           <template v-if="listaPermisosByRol.includes('usuario.editar')">
                                               <router-link class="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2"
                                                   :to="{name:'usuario.editar', params: { id: item.id }}">
                                                   <span class="svg-icon svg-icon-md">
                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px"
                                                                viewBox="0 0 24 24" version="1.1">
                                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                    <rect x="0" y="0" width="24" height="24"></rect>
                                                                    <path
                                                                        d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z"
                                                                        fill="#000000" fill-rule="nonzero"
                                                                        transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953) ">
                                                                    </path>
                                                                    <path
                                                                        d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z"
                                                                        fill="#000000" fill-rule="nonzero" opacity="0.3"></path>
                                                                </g>
                                                            </svg>
                                                        </span>
                                               </router-link>

                                           </template>
                                       </td>
                                   </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data(){
      return {
        listUsuario: [],
        listaPermisosByRol: JSON.parse(sessionStorage.getItem('listaPermisosByRol')),
        opciones: [{
          value: 'nombre',
          label: 'Nombre'
        }, {
          value: 'apellido',
          label: 'Apellido'
        }, {
          value: 'usuario',
          label: 'Usuario'
        }, {
          value: 'A',
          label: 'Activo'
        }, {
          value: 'I',
          label: 'Inactivo'
        },],
        filtro: '',
        criterio: '',
        pageNumber: 0,
        perPage: 15,
        fullscreenLoading: false
      }
    },
    mounted(){
      this.getListaUsuarios('', '', 0);
    },
    computed: {
      //Obtener el numero de pagina
      pageCount(){
        let a = this.listUsuario.length,
            b = this.perPage;
        return Math.ceil(a / b);
      },
      //Obtener registros paginados
      listarUsuariosPaginated(){
        let inicio = this.pageNumber * this.perPage,
            fin = inicio + this.perPage;
        return this.listUsuario.slice(inicio, fin);
      },
      pagesList(){
        let a = this.listUsuario.length,
            b = this.perPage;
        let pageCount = Math.ceil(a / b);
        let count = 0,
            pagesArray = [];

        // 0 < 4 => 0
        // 1 < 4 => 0, 1
        // 2 < 4 => 0, 1, 2
        // 3 < 4 => 0, 1, 2, 3  
        while (count < pageCount) {
          pagesArray.push(count);
          count++;
        }
        return pagesArray;
      }
    },
    methods: {
      limpiarBandejaUsuarios(){
        this.listUsuario = [];
      },
      getListaUsuarios(filtro, criterio, filtroaplicado){
        this.fullscreenLoading = true;

        var url = '/usuario/getListaUsuarios?filtro=' + filtro +'&criterio=' + criterio + '&filtroaplicado=' + filtroaplicado;
        
        axios.get(url).then(response => {
          this.inicializarPaginacion();
          this.listUsuario = response.data;
          this.fullscreenLoading = false;
        }).catch(error => {
          if(error.response.status == 401){
            this.$router.push({name: 'login'});
            location.reload();
            sessionStorage.clear();
            this.fullscreenLoading = false;
          }
        })
      },
      nextPage(){
        this.pageNumber++;
      },
      prevPage(){
        this.pageNumber--;
      },
      selectPage(pages){
        this.pageNumber = pages;
      },
      inicializarPaginacion(){
        this.pageNumber = 0;
      },
      setCambiarEstadoUsuario(opc, id, filtro, criterio){
        Swal.fire({
          title: '¿Está seguro de ' + ((opc == 1) ? 'desactivar' : 'activar') + ' el usuario?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: ((opc == 1) ? 'Sí, desactivar' : 'Sí, activar'),
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.value) {
            //Aqui ira la confirmacion del boton, es decir, la peticion al servidor
            this.fullscreenLoading = true;
            
            var url = '/usuario/setCambiarEstadoUsuario'
            axios.put(url, {
              'id': id
            }).then(response => {
              Swal.fire({
                icon: 'success',
                title: 'Se ' + ((opc == 1) ? 'desactivó' : 'activó') + ' el usuario',
                showConfirmButton: false,
                timer: 1500
              })

              this.getListaUsuarios(filtro, criterio, 0);
            }).catch(error => {
              if(error.response.status == 401){
                this.$router.push({name: 'login'});
                location.reload();
                sessionStorage.clear();
                this.fullscreenLoading = false;
              }
            })
          }
        })
      }
    }
  }
</script>

<style>
.user-block{
  list-style: none;
}

.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>