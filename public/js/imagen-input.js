'use strict';

// Class definition
var KTImageInputDemo = function () {
	// Private functions
	var initDemos = function () {
		// Example 1
		var avatar1 = new KTImageInput('kt_image_1');

		// Example 2
		var avatar2 = new KTImageInput('kt_image_2');

		// Example 3
		var avatar3 = new KTImageInput('kt_image_3');

		// Example 4
		var avatar4 = new KTImageInput('kt_image_4');

		avatar4.on('cancel', function(imageInput) {
			swal.fire({
                title: 'Imagen eliminada !',
                type: 'success',
                buttonsStyling: false,
                confirmButtonText: 'Comfirmar!',
                confirmButtonClass: 'btn btn-primary font-weight-bold'
            });
		});

		avatar4.on('change', function(imageInput) {
			swal.fire({
                title: 'Imagen cambiada !',
                type: 'info',
                buttonsStyling: false,
                confirmButtonText: 'Comfirmar!',
                confirmButtonClass: 'btn btn-primary font-weight-bold'
            });
		});

		avatar4.on('remove', function(imageInput) {
			swal.fire({
                title: 'Imagen eliminada !',
                type: 'error',
                buttonsStyling: false,
                confirmButtonText: 'Ok!',
                confirmButtonClass: 'btn btn-primary font-weight-bold'
            });
		});

		
	}

	return {
		// public functions
		init: function() {
			initDemos();
		}
	};
}();

KTUtil.ready(function() {
	KTImageInputDemo.init();
});
