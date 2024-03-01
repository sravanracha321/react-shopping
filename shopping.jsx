import { useEffect, useState } from "react"
import "./shopping.css";
export function Shopping(){
    
    const[categories,setCategories]=useState([]);
    const[products,setProducts]=useState([{id:0,title:'',image:'',price:0,description:'',category:'',rating:{rate:0,count:0}}]);
    const[cartCount,setCartCount]=useState(0);
    const[cartItems,setCartItems]=useState([]);

function LoadCategories(){
    fetch("http://fakestoreapi.com/products/categories")
    .then(res=>res.json())
    .then(categories=>{
        categories.unshift("all");
        setCategories(categories);
    })

}
function LoadProducts(url){
    fetch(url)
    .then(res=>res.json())
    .then(products=>{
       setProducts(products);
    })
}
useEffect(()=>{
    LoadCategories();
    LoadProducts("http://fakestoreapi.com/products");
},[]);

    function handleCategoryChange(e){
        if(e.target.value=="all"){

            LoadProducts("http://fakestoreapi.com/products");
        }else{
            LoadProducts(`http://fakestoreapi.com/products/category/${e.target.value}`);
        }
    }
    function hanndleAddToCartClick(e){
        fetch(`http://fakestoreapi.com/products/${e.target.value}`)
        .then(res=>res.json())
        .then(product=>{
            cartItems.push(product);
            setCartCount(cartItems.length);
            alert(`${product.title}\n Added to Cart`);
        })
    }

    return(
        <div className="container-fluid">
           <header>
            <div>
                <span className="h4">Shopper</span>
            </div>
            <div>
                <span className="me-3">Home</span>
                <span className="me-3">Electronics</span>
                <span className="me-3">Jewelery</span>
                <span className="me-3">Men's Fashion</span>
                <span className="me-3">Women's Fashion</span>
            </div>
            <div>
                <button className="btn btn-light position-relative">
                    <span className="bi bi-cart4"></span>Your Cart 
                    <span className="badge rounded-circle bg-warning position-absolute top-0 end-0">{cartCount}</span>
                </button>
            </div>
           </header>
           <section className="row mt-3">
            <nav className="col-2">
                <div>
                    <label className="form-label fw-bold">Select Category</label>
                    <div>
                        <select onChange={ handleCategoryChange}className="form-select">
                            {
                                categories.map(category=> 
                                    <option key={category}value={category}>{category.toUpperCase()}</option>
                                    )
                            }
                        </select>

                    </div>
                </div>
            </nav>
            <main className="col-9">
            <div className="sravan">

                    {
                        products.map(product=> 
                            <div className="card p-2 m-2" style={{width:'200px'}}>
                                <img src={product.image}className="card-img-top"height="100"/>
                                <div className="card-header overflow-auto"style={{height:'100px'}}>
                                    {product.title}
                                </div>
                                <div className="card-body">
                                    <dl>
                                        <dt>Price</dt>
                                        <dd>{(product.price).toLocaleString('en-IN',{style:'currency',currency:'INR'})}</dd>
                                    </dl>
                                </div>
                                <div className="card-footer">
                                    <button value={product.id}onClick={hanndleAddToCartClick}className="w-100">
                                        <span className="bi bi-cart3"></span>Add to Cart 

                                    </button>
                                </div>
                                </div>
                 
                            )
                    }
                </div>
            </main>
            <aside className="col-2">
                        <table className="table table-hover caption-top">
                            <caption>Your Cart Summary</caption>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Preview</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartItems.map(item=> 
                                        <tr>
                                            <td>{item.title}</td>
                                            <td>
                                                <img src={item.image}width="50"height="50"/>
                                            </td>
                                        </tr>
                                        )
                                }
                            </tbody>
                        </table>
                        </aside>
           </section>
        </div>
    )
}