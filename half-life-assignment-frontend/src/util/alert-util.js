const Swal = require('sweetalert2');

export const showErrorAlert = (msg) => {
    Swal.fire({
        title: 'Error!',
        text: msg,
        icon: 'error',
        confirmButtonText: 'OK'
    })
}

export const showSuccessAlert = (msg) => {
    Swal.fire({
        title: 'Success!',
        text: msg,
        icon: 'success',
        confirmButtonText: 'OK'
    })
}
