import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/LocationList"
import { ProductList } from "../products/ProductList"
import { ProductForm } from "../products/ProductForm"
import { EmployeeList } from "../employees/EmployeeList"
import { NewEmployeeForm } from "../employees/NewEmployeeForm"
import { CustomerList } from "../customers/CustomerList"
import { CustomerDetails } from "../customers/CustomerDetails"



export const EmployeeViews = () => {
	return <>
		<Routes>
			<Route path="/" element={
				<>
					<h1>🍬 🍭 Kandy Korner 🍭 🍬 </h1>

					<Outlet />
				</>
			}>

				<Route path="locations" element={<LocationList />} />

				<Route path="products" element={<ProductList />} />

				<Route path="product/create" element={<ProductForm />} />

				<Route path="employees" element={<EmployeeList />} />

				<Route path="employee/create" element={<NewEmployeeForm />} />

				<Route path="customers" element={<CustomerList />} />

				<Route path="customers/:customerId" element={<CustomerDetails />} />


			</Route>




		</Routes>
	</>
}