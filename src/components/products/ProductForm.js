/* Create a form for creating new product. 
Only available to employees.
Form should include: product name, product type, and price.
Then send the data to our permanent database with a POST request
*/

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ProductForm.css"

//Export and define function to handle HTML, fetching, and POST request for ticket form
export const ProductForm = () => {

    // Establish initial state object with default properties for form
    const [product, setNewProduct] = useState({
        name: "",
        type: 0,
        price: ""
    })


    // Add the useNavigate hook
    const navigate = useNavigate()

    // Define click event for submitting the form
    const handleSaveButtonClick = async (event) => {
        // Prevent the browser from executing the default action
        event.preventDefault()

        // Create object to be saved to the API
        const saveNewProduct =
        {
            id:"",
            name: product.name,
            typeId: product.type,
            price: product.price
        }


        // POST the object to the API
        const response = await fetch("http://localhost:8088/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(saveNewProduct)
        })
        await response.json()
        navigate("/products")

    }
    // Return the HTML for the form and button

    return (
        <form className="productForm">
            <h2 className="productForm__title">Create New Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Add New Kandy Product Name"
                        value={product.name}
                        onChange={
                            (evt) => {
                                const copy = { ...product }
                                copy.name = evt.target.value
                                setNewProduct(copy)
                            }
                        } />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="$$$$$$$$$$$$$$$$$"
                        value={product.price}
                        onChange={
                            (evt) => {
                                const copy = { ...product }
                                copy.price = parseFloat(evt.target.value)
                                setNewProduct(copy)
                            }
                        } />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type:</label>
                    <select value={product.type}
                        onChange={
                            (evt) => {
                                const copy = { ...product }
                                copy.type = JSON.parse(evt.target.value)
                                setNewProduct(copy)
                            }
                        } >
            <option value="">Select Kandy Type</option>
            <option value="1">licorice</option>
            <option value="2">gummy</option>
            <option value="3">chewy candy</option>
            <option value="4">fluffy</option>
            <option value="5">jelly bean</option>
            <option value="6">chocolate</option>
            <option value="7">hard candy</option>
            <option value="8">popcorn</option>
                    </select>
                </div>
            </fieldset>

            {<button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-submitProduct">
                Submit New Kandy Product
            </button>}
        </form>
    )
}