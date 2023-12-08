let btnAddProduct = document.querySelector('#btnAddProduct');
let btnDisplay = document.querySelector('#btnDisplay');
let btnNuke = document.querySelector('#removeAll');

btnAddProduct.onclick = ()=>{
    let name = document.querySelector('#newProductName').value;
    let desc = document.querySelector('#newProductDescription').value;
    let price = document.querySelector('#newProductPrice').value;
    let image = document.querySelector('#newProductImage');

    if(!name) return alert('Please insert a product name.');
    else if(!price) return alert('Please insert a product price');
    else if(image.files.length < 0){
        let toAdd = {
            name,
            desc,
            price,
            image
        }
    
        let products = localStorage.getItem('products')!=null;
        if(!products){
            products = [toAdd];
        }
        else if(products){
            products = JSON.parse(localStorage.getItem('products'));
            products.push(toAdd);
        }

        localStorage.setItem('products', JSON.stringify(products));
    }
    else{
        const reader = new FileReader();
        const file = image.files[0];
        if (file){
            const reader = new FileReader();
            reader.onload = (e)=> {
                let name = document.querySelector('#newProductName').value;
                let desc = document.querySelector('#newProductDescription').value;
                let price = document.querySelector('#newProductPrice').value;
    
                if(!desc) desc = ` `;
    
                const image = e.target.result;
                //console.log('Base64 string:', base64String);
    
                let toAdd = {
                    name,
                    desc,
                    price,
                    image
                }
            
                let products = localStorage.getItem('products')!=null;
                if(!products){
                    products = [toAdd];
                }
                else if(products){
                    products = JSON.parse(localStorage.getItem('products'));
                    products.push(toAdd);
                }
    
                try{
                    //store to local store
                    localStorage.setItem('products', JSON.stringify(products));
                } catch(error){
                    if(error instanceof DOMException && error.name === 'QuotaExceededError'){
                        console.error('QuotaExceededError: Storage limit exceeded.');
                        return alert('Image must be smaller than 4MB 😞');
                    } 
                }
                console.log(`product: ${products} - added`);
                location.reload();
            };
    
            reader.readAsDataURL(file);
        }
    }
};

btnNuke.onclick = ()=>{
    localStorage.removeItem('products');
    location.reload();
}

btnDisplay.onclick = ()=> {
    iterateStorage();
};

//run this in webpage load
document.addEventListener('DOMContentLoaded', ()=>{
    iterateStorage();
});

function iterateStorage(){
    let product = localStorage.getItem('products')!=null;
    if(product){
        document.querySelector('#dummyProduct').style.display = 'none';
        let product = localStorage.getItem('products');
        product = JSON.parse(product);
        let length = product.length;
        console.log(length);
        for(let i = 0; i<length; i++){
            createComponent(product[i].name,product[i].desc,product[i].price,product[i].image);
        }
    }
}

function createComponent(name, desc, price, image) {
    let container = document.querySelector('#productsRow');
    let template = document.querySelector('#cardTemplate');

    var clone = document.importNode(template.content, true);

    // Set content for the component
    clone.querySelector('.card-title').innerHTML = name;
    clone.querySelector('.card-text').innerHTML = desc;
    clone.querySelector('.card-price').innerHTML = `₱${price}`;
    clone.querySelector('.card-img-top').src = image;
    // Append the cloned content to the container
    container.appendChild(clone);
}