import Swal from 'sweetalert2';

export const SwalAlert = (title, text, icon) => {
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonColor: icon === 'error' ? '#d33' : '#33d3a3',
        confirmButtonText: 'Ok'
    });
};