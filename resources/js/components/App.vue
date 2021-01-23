<template>
<div class="d-flex flex-row flex-column-fluid page">


    <!-- Navbar -->

    <!-- /.navbar -->

    <!-- Main Sidebar Container -->
    <Sidebar :ruta="ruta" :usuario="authUser" :listaPermisos="listaPermisosByRol"></Sidebar>
   <div class="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper">
    <!-- Content Wrapper. Contains page content -->
        <Navbar :ruta="ruta"></Navbar>
        	<div class="content d-flex flex-column flex-column-fluid" id="kt_content">
						<!--begin::Subheader-->

						<!--end::Subheader-->
						<!--begin::Entry-->

                                <transition name="slide-fade" mode="out-in">
                                    <router-view></router-view>
                                </transition>
                                	</div>


     <div class="footer bg-white py-4 d-flex flex-lg-column" id="kt_footer">
						<!--begin::Container-->

						<!--end::Container-->
					</div>
    </div>
    <!-- /.content-wrapper -->

 </div>



</template>

<script>
  import Navbar from './plantilla/Navbar'
  import Sidebar from './plantilla/Sidebar'
  import Footer from './plantilla/Footer'

  export default {
    props: ['ruta', 'usuario'],
    components: {Navbar, Sidebar, Footer},
    data(){
      return{
        authUser: this.usuario,
        listaPermisosByRol: []
      }
    },
    mounted(){
      this.listaPermisosByRol = JSON.parse(sessionStorage.getItem('listaPermisosByRol'));

      EventBus.$on('verificarUsuarioAutenticado', data => {
        this.authUser = data;
      });

      EventBus.$on('notificarPermisosByRol', data => {
        this.listaPermisosByRol = data;
      });
    }
  }
</script>

<style>

</style>
