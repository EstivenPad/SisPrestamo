<template>

    <div class="container">

        <div class="card card-custom gutter-b">
            <div class="card-header flex-wrap py-3">
                <div class="card-title">
                    <h3 class="card-label">Editar Rol </h3>
                </div>
                <div class="card-toolbar">
                    <router-link :to="'/rol'" class="btn btn-outline-primary mr-3 noActive">
                        <i class="flaticon2-left-arrow-1"></i>Regresar</router-link>
                </div>

            </div>
            <div class="card-body">
                <div id="kt_datatable_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                    <div class="row">

                        <div class="col-md-6">
                            <div class="card card-custom card-border">
                                <div class="card-header">
                                    <div class="card-title">
                                        <span class="card-icon">
                                            <i class="flaticon-clock-2 text-primary icon-lg"></i>
                                        </span>
                                        <h3 class="card-label">Formulario Registrar Roles</h3>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <form role="form">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group row">
                                                    <label class=" col-md-3 col-form-label">Nombre</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control" v-model="Rol.Nombre"
                                                            @keyup.enter="setRegistrarRol()">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group row">
                                                    <label class="col-md-3 col-form-label">Url Amigable</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control" v-model="Rol.Slug"
                                                            @keyup.enter="setRegistrarRol()">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="card-footer">
                                    <div class="row">
                                        <button class="btn btn-secondary mr-2"
                                            @click.prevent="limpiarCampos">Limpiar</button>
                                        <button class="btn btn-primary" @click.prevent="setEditarRol"
                                            v-loading.fullscreen.lock="fullscreenLoading">Editar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card card-custom card-border">
                                <div class="card-header">
                                    <div class="card-title">
                                        <span class="card-icon">
                                            <i class="flaticon-list text-primary icon-lg"></i>
                                        </span>
                                        <h3 class="card-label">Lista de Permisos</h3>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="accordion accordion-toggle-arrow" id="accordionExample4">
                                        <div class="card" v-for="(modulo, index1) in Modulos" :key="index1">
                                            <div class="card-header" id="headingOne4">
                                                <div class="card-title collapsed" data-toggle="collapse"
                                                    :data-target="'#' + modulo.modulo" aria-expanded="false">
                                                    <i class="flaticon2-add"></i><span v-text="modulo.modulo"></span>
                                                </div>
                                            </div>
                                            <div :id="modulo.modulo" class="collapse" data-parent="#accordionExample4"
                                                style="">
                                                <div class="card-body">
                                                    <div v-for="(permiso, index2) in listaCheck" :key="index2">
                                                        <el-checkbox v-model="permiso.checked"
                                                            v-if="permiso.modulo == modulo.modulo">
                                                            <p v-if="permiso.modulo == modulo.modulo"
                                                                v-text="permiso.name"></p>
                                                        </el-checkbox>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" :class="{ show: modalShow }" :style=" modalShow ? mostrarModal : ocultarModal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">SisCambio</h5>
                        <button class="close" @click="abrirModal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="callout callout-danger" style="padding: 5px" v-for="(item, index) in mensajeError"
                            :key="index" v-text="item"></div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" @click="abrirModal">Cerrar</button>
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
                Rol: {
                    Id: this.$attrs.id,
                    Nombre: '',
                    Slug: ''
                },
                listaCheck: [],
                Permisos: [],
                Modulos: [],
                PermisosChecked: [],
                listaPermisosByRol: [],
                listaSlug: [],
                fullscreenLoading: false,
                modalShow: false,
                mostrarModal: {
                    display: 'block',
                    background: '#0000006b'
                },
                ocultarModal: {
                    display: 'none'
                },
                error: 0,
                mensajeError: [],
            }
        },
        mounted() {
            this.getPermisosByRol();
            this.getRolPorId();
        },
        methods: {
            abrirModal() {
                this.modalShow = !this.modalShow;
            },
            limpiarCampos() {
                this.Rol.Nombre = '';
                this.Rol.Slug = '';

                this.listaCheck.forEach((item, index) => {
                    item.checked = false;
                });
            },
            setEditarRol() {
                if (this.validarCampos()) {
                    this.modalShow = true;
                    return;
                }

                this.fullscreenLoading = true;
                this.setGuardarRol();
            },
            setGuardarRol() {
                var url = '/rol/setEditarRolPermiso';

                axios.post(url, {
                    'id': this.Rol.Id,
                    'nombre': this.Rol.Nombre,
                    'slug': this.Rol.Slug,
                    'permisos': this.listaCheck
                }).then(response => {
                    this.getListarPermisosByRol();
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
            getRolPorId() {
                var url = '/rol/getRolPermisoEditar'
                axios.get(url, {
                    params: {
                        'id': this.Rol.Id,
                    }
                }).then(response => {
                    this.Rol.Nombre = response.data.name;
                    this.Rol.Slug = response.data.slug;

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
            getPermisosByRol() {
                var url = '/rol/getPermisosByRol';

                axios.get(url, {
                    params: {
                        'id': this.Rol.Id
                    }
                }).then(response => {
                    this.Permisos = response.data.permisos;
                    this.Modulos = response.data.modulos;
                    this.PermisosChecked = response.data.permisosChecked;
                    this.setListaPermisoCheck();
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
            setListaPermisoCheck() {
                this.Permisos.forEach((permiso, index) => {

                    this.listaCheck.push({
                        'id': permiso.id,
                        'name': permiso.name,
                        'slug': permiso.slug,
                        'modulo': permiso.modulo,
                        'checked': false
                    });

                });

                this.listaCheck.forEach((permiso, index) => {
                    this.PermisosChecked.forEach((item, index) => {

                        if (permiso.id == item.permission_id) {
                            permiso.checked = true;
                        }

                    });
                });
            },
            getListarPermisosByRol() {
                var url = '/usuario/getListarPermisosByRol';

                axios.get(url).then(response => {
                    this.listaPermisosByRol = response.data;
                    this.filtrarListaPermisosByRol();
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
            filtrarListaPermisosByRol() {
                this.listSlug = [];

                this.listaPermisosByRol.forEach((item, index) => {
                    this.listaSlug.push(item.slug);
                })

                sessionStorage.setItem('listaPermisosByRol', JSON.stringify(this.listaSlug));
                EventBus.$emit('notificarPermisosByRol', this.listaSlug);
                this.fullscreenLoading = false;

                Swal.fire({
                    icon: 'success',
                    title: 'Se actualizó el rol correctamente',
                    showConfirmButton: false,
                    timer: 1530
                });

                this.$router.push('/rol');
            },
            validarCampos() {
                this.error = 0;
                this.mensajeError = [];

                if (!this.Rol.Nombre) {
                    this.mensajeError.push("El Nombre es un campo obligatorio")
                }
                if (!this.Rol.Slug) {
                    this.mensajeError.push("La Url Amigable es obligatorio")
                }

                let contador = 0;

                this.listaCheck.forEach((item, index) => {
                    if (item.checked == true) {
                        contador++;
                    }
                })

                if (contador == 0) {
                    this.mensajeError.push("Se debe seleccionar al menos un permiso");
                }
                if (this.mensajeError.length) {
                    this.error = 1;
                }

                return this.error;
            }
        }
    }

</script>
