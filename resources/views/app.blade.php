<!DOCTYPE html>
<html>

@include('sections.head')

<body id="kt_body" class="header-fixed header-mobile-fixed subheader-enabled subheader-fixed aside-enabled aside-fixed aside-minimize-hoverable page-loading">
  
       
    <div  id="app" class="d-flex flex-column flex-root">
   
        @if(Auth::check())
          <App ruta="{{ route('basepath') }}" :usuario="{{ Auth::user() }}"></App>
        @else
          <Auth ruta="{{ route('basepath') }}"></Auth>
        @endif
 
 
</div>

  @include('sections.script')

</body>
</html>
