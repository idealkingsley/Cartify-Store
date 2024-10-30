const API_URL = 'https://fakestoreapi.com/products';

// Add New Product
function addProduct(event) {
    event.preventDefault(); // Prevent page reload

    const productImage = document.getElementById('productimage').files[0]; // Get the uploaded image
    const product = {
        title: document.getElementById('productname').value,
        price: parseFloat(document.getElementById('productprice').value),
        description: document.getElementById('productdesc').value,
        category: document.getElementById('productcategory').value,
        image: productImage ? URL.createObjectURL(productImage) : 'https://via.placeholder.com/150' // Use uploaded image or placeholder
    };

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => alert(`Product Added! ID: ${data.id}`))
    .catch(error => console.error('Error adding product:', error));
}
