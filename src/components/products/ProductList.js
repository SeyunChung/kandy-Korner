import { useEffect, useState } from "react"
import "./Products.css"
import { useNavigate } from "react-router-dom"

export const ProductList = ({ searchTermState }) => {
    const [products, setProducts] = useState([])
    const [sortedProducts, setSortedProducts] = useState([])
    const [topPriced, setTopPriced] = useState(false)

    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(() => {
        const searchedProducts = products.filter(product => {
            const productName = product.name.toLowerCase()
            const searchTerm = searchTermState ? searchTermState.toLowerCase() : ""
            return productName.startsWith(searchTerm)
        })
        setSortedProducts(searchedProducts)
    }, [searchTermState, products])

    useEffect(() => {
        fetch("http://localhost:8088/products?_expand=type")
            .then(response => response.json())
            .then((productsArray) => {
                setProducts(productsArray)
            })
    }, [])

    useEffect(() => {
        if (kandyUserObject && kandyUserObject.staff) {
            const sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name))
            setSortedProducts(sortedProducts)
        }
    }, [products, kandyUserObject])

    useEffect(() => {
        if (topPriced) {
            const filteredProducts = sortedProducts.filter(product => product.price > 2)
            setSortedProducts(filteredProducts)
        }
    }, [topPriced, sortedProducts])

    return (
        <>
            {kandyUserObject && kandyUserObject.staff ? (
                <>
                    <h2 className="product__header">Products List</h2>
                    <button className="btn_topPriced" onClick={() => setTopPriced(true)}>
                        Top Priced
                    </button>
                    <button className="btn_createNewProduct" onClick={() => navigate("/product/create")}>
                        Add a New Product
                    </button>
                    <ul className="products">
                        {sortedProducts.map((product) => (
                            <section className="product" key={`product--${product.id}`}>
                                {product.name} -- ${product.price} -- {product.type?.type}
                            </section>
                        ))}
                    </ul>
                </>
            ) : (
                <ul className="products">
                    {sortedProducts.map((product) => (
                        <section className="product" key={`product--${product.id}`}>
                            {product.name} -- ${product.price}
                        </section>
                    ))}
                </ul>
            )}
        </>
    )
}
