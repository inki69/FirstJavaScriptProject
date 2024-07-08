var products =[];
var productsContainer = document.getElementById("product-tabel-container");
var warningMessage = document.getElementById("warning-msg");
var tableBody=document.getElementById("table-body");
var productName = document.getElementById("product_name");
var productCategory = document.getElementById("product_category");
var productPrice = document.getElementById("product_price");
var productDesc = document.getElementById("prodct_desc");
var createBtn = document.getElementById("create-btn");
var clearBtn = document.getElementById("clear-btn");
var productForm = document.getElementById("product-form");
var editIndex = -1; 

function handleRenderData(){
    if(products.length!=0){
        console.log("products are available");
        productsContainer.classList.remove("d-none");
        productsContainer.classList.add("d-block");
        warningMessage.classList.add("d-none");
        warningMessage.classList.remove("d-block");

        var row_elements="";

        for(var i=0;i<products.length;i++){
            row_elements += `
            <tr>
                <th>${i+1}</th>
                <td>${products[i].name}</td>
                <td>${products[i].cat}</td>
                <td>${products[i].price}</td>
                <td>${products[i].desc}</td>
                 <td>
                    <button class="btn btn-outline-success" onclick="updateProduct(${i})">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-outline-danger" onclick="confirmDeleteProduct(${i})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
            `
        }
        tableBody.innerHTML =row_elements;
    }else{
        console.log("You don't have any products yet");
        warningMessage.classList.remove("d-none");
        warningMessage.classList.add("d-block");
        productsContainer.classList.add("d-none");
        productsContainer.classList.remove("d-block");
    }
}


function updateProduct(index) {
    editIndex = index;
    var product = products[index];
    productName.value = product.name;
    productCategory.value = product.cat;
    productPrice.value = product.price;
    productDesc.value = product.desc;
    createBtn.textContent = "Update Product";
}

function confirmDeleteProduct(index) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteProduct(index);
            Swal.fire(
                'Deleted!',
                'Your product has been deleted.',
                'success'
            )
        }
    })
}

function deleteProduct(index) {
    products.splice(index, 1);
    handleRenderData();
}


handleRenderData();

productForm.onsubmit = function(event){
event.preventDefault();

if (!productName.value || !productCategory.value || !productPrice.value || !productDesc.value) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out all fields!',
    });
    return;
}


var product={
    name:productName.value,
    cat: productCategory.value,
    price:productPrice.value,
    desc:productDesc.value,
};


if (editIndex >= 0) {
    
    products.splice(editIndex, 1, product);
    editIndex = -1; 
    createBtn.textContent = "Add Product";
} else {
    products.push(product);
}


handleRenderData();
productForm.reset();
createBtn.textContent = "Add Product";
}


clearBtn.addEventListener("click", function(event) {
    event.preventDefault();
    productForm.reset(); 
    createBtn.textContent = "Add Product";
});
