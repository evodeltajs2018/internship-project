

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

class Toaster {
    static showInfo(message) {
        toastr.info(message);
    }

    static showSuccess(message) {
        toastr.success(message);
    }

    static showError(message) {
        toastr.error(message);
    }

}

export default Toaster;