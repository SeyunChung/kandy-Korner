// This component is the parent of FindCandy and ProductList so that state can pass between them

import { useState } from "react"
import { FindyCandy } from "./FindCandy"
import { ProductList } from "./ProductList"

export const CandyContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <FindyCandy setterFunction={setSearchTerms}/>
        <ProductList searchTermState={searchTerms}/>
    </>
}
