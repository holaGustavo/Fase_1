document.addEventListener('DOMContentLoaded', () => {
    fetch('/products')
        .then(response => response.json())
        .then(products => {
            const productContainer = document.querySelector('.product-list');
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product';
                productElement.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Price: $${product.price.toFixed(2)}</p>
                    <p>Product ID: ${product.product_id}</p>
                `;
                productContainer.appendChild(productElement);
            });
        });

    const purchaseForm = document.getElementById('purchase-form');
    purchaseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(purchaseForm);
        fetch('/purchase', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
            purchaseForm.reset();
        });
    });
});
