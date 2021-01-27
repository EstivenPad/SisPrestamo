<template>

    <div class="container">

        <div class="card card-custom gutter-b">
            <div class="card-header flex-wrap py-3">
                <div class="card-title">
                    <h3 class="card-label">Crear Usuario</h3>
                </div>
                <div class="card-toolbar">
                    <router-link   :to="'/usuario'" class="btn btn-outline-primary mr-3 noActive">
                        <i class="flaticon2-left-arrow-1"></i>Regresar</router-link>
                </div>

            </div>
            <div class="card-body">
                <div id="kt_datatable_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                    <div class="row">

                        <div class="col-md-12">
                            <div class="card card-custom card-border">
                                <div class="card-header">
                                    <div class="card-title">
                                        <span class="card-icon">
                                            <i class="flaticon-edit-1 text-primary icon-lg"></i>
                                        </span>
                                        <h3 class="card-label">Formulario Registrar Usuarios</h3>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <form role="form">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class=" col-md-3 col-form-label">Nombre</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control" v-model="Usuario.Nombre"
                                                            @keyup.enter="setRegistrarUsuario()">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-md-3 col-form-label">Apellido</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control" v-model="Usuario.Apellido"
                                                            @keyup.enter="setRegistrarUsuario()">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-md-3 col-form-label">Usuario</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control" v-model="Usuario.Usuario"
                                                            @keyup.enter="setRegistrarUsuario()">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-md-3 col-form-label">Contraseña</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control" v-model="Usuario.Contrasena"
                                                            @keyup.enter="setRegistrarUsuario()">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-md-3 col-form-label">Rol</label>
                                                    <div class="col-md-9">
                                                      <select class="form-control" id="exampleSelect1" v-model="Usuario.Rol" >
                                                        <option v-for="item in listaRoles"
                                                          :key="item.id"
                                                          :label="item.name"
                                                          :value="item.id">
                                                        </option>
                                                      </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-md-3 col-form-label">Fotografía</label>
                                                    <div class="col-md-9">
                                                        <div class="form-group row">
                                                          <div class="col-md-9 col-sm-12">
                                                            <div class="dropzone dropzone-default dz-clickable" id="kt_dropzone_1">
                                                              <div class="dropzone-msg dz-message needsclick">
                                                                <h3 class="dropzone-msg-title">Drop files here or click to upload.</h3>
                                                                <span class="dropzone-msg-desc">This is just a demo dropzone. Selected files are
                                                                <strong>not</strong>actually uploaded.</span>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="card-footer">
                                    <div class="row justify-content-center">
                                        <button class="btn btn-secondary mr-2"
                                            @click.prevent="limpiarCampos">Limpiar</button>
                                        <button class="btn btn-primary" @click.prevent="setRegistrarUsuario"
                                            v-loading.fullscreen.lock="fullscreenLoading">Registrar</button>
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
                  <div class="callout callout-danger" style="padding: 5px" v-for="(item, index) in mensajeError" :key="index" v-text="item"></div>
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
    data(){
      return {
        Usuario: {
          Nombre: '',
          Apellido: '',
          Usuario: '',
          Contrasena: '',
          Rol: '',
          Imagen: ''
        },
        listaRoles: [],
        form: new FormData,
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
    mounted(){
      this.getListaRoles();
    },
    methods: {
      abrirModal(){
        this.modalShow = !this.modalShow;
      },
      limpiarCampos(){
        this.Usuario.Nombre = '';
        this.Usuario.Apellido = '';
        this.Usuario.Usuario = '';
        this.Usuario.Contrasena = '';
        this.Usuario.Rol = '';
        this.Usuario.Imagen = '';
      }, 
      getListaRoles(){
        var url = '/rol/getListaRoles';

        axios.get(url).then(response => {
          this.listaRoles = response.data;
        }).catch(error => {
          if(error.response.status == 401){
            this.$router.push({name: 'login'});
            location.reload();
            sessionStorage.clear();
            this.fullscreenLoading = false;
          }
        })
      },
      getFile(e){
        this.Usuario.Imagen = e.target.files[0];
      },
      setRegistrarUsuario(){
        if(this.validarRegistrarUsuario()){
          this.modalShow = true;
          return;
        }

        this.fullscreenLoading = true;
        this.setGuardarUsuario();
      },
      setGuardarUsuario(){
        this.form.append("nombre", this.Usuario.Nombre);
        this.form.append("apellido", this.Usuario.Apellido);
        this.form.append("usuario", this.Usuario.Usuario);
        this.form.append("password", this.Usuario.Contrasena);
        this.form.append('imagen', this.Usuario.Imagen)

        const config = { headers: { 'Content-Type': 'multipart/form-data' }}; 
        var url = '/usuario/setRegistrarUsuario';

        axios.post(url, this.form, config).then(response => {
          this.setGuardarRolUsuario(response.data);
        }).catch(error => {
          if(error.response.status == 401){
            this.$router.push({name: 'login'});
            location.reload();
            sessionStorage.clear();
            this.fullscreenLoading = false;
          }
        })
      },
      setGuardarRolUsuario(id){
        var url = '/usuario/setGuardarRolUsuario';
    	  
        axios.post(url, {
          'user_id' : id,
          'rol_id'  : this.Usuario.Rol
        }).then(response => {
          this.fullscreenLoading = false;
          this.$router.push('/usuario');
        }).catch(error => {
          if(error.response.status == 401){
            this.$router.push({name: 'login'});
            location.reload();
            sessionStorage.clear();
            this.fullscreenLoading = false;
          }
        })
      },
      validarRegistrarUsuario(){
        this.error = 0;
        this.mensajeError = [];

        if(!this.Usuario.Nombre){
          this.mensajeError.push("El Nombre es un campo obligatorio")
        }
        if(!this.Usuario.Usuario){
          this.mensajeError.push("El Usuario es un campo obligatorio")
        }
        if(!this.Usuario.Contrasena){
          this.mensajeError.push("La Contraseña es un campo obligatorio")
        }
        if(!this.Usuario.Rol){
          this.mensajeError.push("Debe seleccionar un rol para el usuario")
        }

        if(this.mensajeError.length){
          this.error = 1;
        }

        return this.error;
      }
    }
  }
</script>

<style>

</style>