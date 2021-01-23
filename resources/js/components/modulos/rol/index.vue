<template>
    <div class="container">
        <div class="card card-custom gutter-b">
            <div class="card-header flex-wrap py-3">
                <div class="card-title">
                    <h3 class="card-label">
                        Roles <span class="d-block text-muted pt-2 font-size-sm">Lista de todos los roles</span>
                    </h3>
                </div>
                <div class="card-toolbar">
                     <template v-if="listaPermisosByRol.includes('rol.crear')">
                    <router-link :to="{ name: 'rol.crear' }" class="btn btn-primary font-weight-bolder">
                        <span class="svg-icon svg-icon-md">
                            <!--begin::Svg Icon | path:assets/media/svg/icons/Design/Flatten.svg-->
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <rect x="0" y="0" width="24" height="24"></rect>
                                    <circle fill="#000000" cx="9" cy="15" r="6"></circle>
                                    <path
                                        d="M8.8012943,7.00241953 C9.83837775,5.20768121 11.7781543,4 14,4 C17.3137085,4 20,6.6862915 20,10 C20,12.2218457 18.7923188,14.1616223 16.9975805,15.1987057 C16.9991904,15.1326658 17,15.0664274 17,15 C17,10.581722 13.418278,7 9,7 C8.93357256,7 8.86733422,7.00080962 8.8012943,7.00241953 Z"
                                        fill="#000000" opacity="0.3"></path>
                                </g>
                            </svg>
                        </span>
                        Crear Rol
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
                                       <th class="table-active">Nombre</th>
                                       <th class="table-active">Url Amigable</th>
                                       <th class="table-active">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   <tr v-for="(item, index) in listarRolesPaginados" :key="index">
                                       <td v-text="item.name"></td>
                                       <td v-text="item.slug"></td>
                                       <td>
                                           <template v-if="listaPermisosByRol.includes('rol.editar')">
                                               <router-link class="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2"
                                                   :to="{name:'rol.editar', params: { id: item.id }}">
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
        data() {
            return {
                listaRol: [],
                listaPermisosByRol: JSON.parse(sessionStorage.getItem('listaPermisosByRol')),
                filtro: '',
                criterio: '',
                pageNumber: 0,
                perPage: 15,
                fullscreenLoading: false,
                opciones: [{
                    value: 'name',
                    label: 'Nombre'
                }, {
                    value: 'slug',
                    label: 'Url'
                }],
            }
        },
        mounted() {
            this.getListaRoles('', '');
        },
        computed: {
            //Obtener el numero de pagina
            pageCount() {
                let a = this.listaRol.length,
                    b = this.perPage;
                return Math.ceil(a / b);
            },
            //Obtener registros paginados
            listarRolesPaginados() {
                let inicio = this.pageNumber * this.perPage,
                    fin = inicio + this.perPage;
                return this.listaRol.slice(inicio, fin);
            },
            pagesList() {
                let a = this.listaRol.length,
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
            getListaRoles(filtro, criterio) {
                this.fullscreenLoading = true;

                var url = '/rol/getListaRoles?filtro=' + filtro + '&criterio=' + criterio;
                axios.get(url).then(response => {
                    this.inicializarPaginacion();

                    this.listaRol = response.data;
                    this.fullscreenLoading = false;
                }).catch(error => {
                    if (error.response.status == 401) {
                        this.$router.push({
                            name: 'login'
                        });
                        location.reload();
                        sessionStorage.clear();
                        this.fullscreenLoading = false;
                    }
                })
            },
            nextPage() {
                this.pageNumber++;
            },
            prevPage() {
                this.pageNumber--;
            },
            selectPage(pages) {
                this.pageNumber = pages;
            },
            inicializarPaginacion() {
                this.pageNumber = 0;
            },
        }
    }

</script>

<style>

</style>
