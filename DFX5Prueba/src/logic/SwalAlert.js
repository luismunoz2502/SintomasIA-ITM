import Swal from 'sweetalert2';

export const SwalAlert = (title, text, icon) => {
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: 'Ok'
    });
};