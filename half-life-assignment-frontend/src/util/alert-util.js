const Swal = require('sweetalert2');

export const showErrorAlert = (msg) => {
    Swal.fire({
        title: 'Error!',
        text: msg,
        icon: 'error',
        confirmButtonText: 'OK'
    })
}
