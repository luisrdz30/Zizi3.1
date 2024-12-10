// app.js
document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener los valores de los campos del formulario
    const formData = {
        firstName: this.elements['firstName'].value.trim(),
        lastName: this.elements['lastName'].value.trim(),
        email: this.elements['email'].value.trim(),
        address: this.elements['address'].value.trim(),
        phone: this.elements['phone'].value.trim(),
        gender: this.elements['gender'].value,
        age: this.elements['age'].value,
        dob: this.elements['dob'].value,
        username: this.elements['username'].value.trim(),
        password: this.elements['password'].value,
    };

    // Enviar los datos al servidor mediante fetch
    fetch('http://localhost:3001/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        })
    
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Registro exitoso: ' + data.message);
                this.reset(); // Limpiar el formulario
                sessionStorage.clear(); // Limpiar sessionStorage
            } else {
                alert('Error en el registro: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('No se pudo guardar el registro. Por favor, inténtalo más tarde.');
        });
});

