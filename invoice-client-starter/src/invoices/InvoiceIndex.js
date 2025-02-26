import React, { useState, useEffect } from "react";
import { apiGet, apiDelete } from "../utils/api";
import InvoiceTable from "./InvoiceTable";

const InvoiceIndex = () => {
    const [filters, setFilters] = useState({
        buyerID: "",
        sellerID: "",
        product: "",
        minPrice: "",
        maxPrice: "",
        limit: ""
    });

    const [invoices, setInvoices] = useState([]);

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const fetchInvoices = async () => {
        try {
            const params = new URLSearchParams();
    
            Object.entries(filters).forEach(([key, value]) => {
                if (value) params.append(key, value);
            });
    
            const queryString = params.toString();
            const url = queryString.length > 0 
                ? `http://localhost:8080/api/invoices?${queryString}` 
                : `http://localhost:8080/api/invoices`;
    
            console.log("Fetching:", url);
    
            const response = await fetch(url, {
                method: "GET",
                headers: { "Accept": "application/json" }
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP Error ${response.status}: ${errorText}`);
            }
    
            const data = await response.json();
            setInvoices(data);
        } catch (error) {
            console.error("Chyba při načítání faktur:", error);
        }
    };
    
    

    const deleteInvoice = async (id) => {
        try {
            await apiDelete(`/api/invoices/${id}`);
            setInvoices(invoices.filter((item) => item._id !== id));
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    return (
        <div>
            <h1>Seznam faktur</h1>

            <div>
                <input type="number" name="buyerID" value={filters.buyerID} onChange={handleChange} placeholder="Buyer ID" />
                <input type="number" name="sellerID" value={filters.sellerID} onChange={handleChange} placeholder="Seller ID" />
                <input type="text" name="product" value={filters.product} onChange={handleChange} placeholder="Produkt" />
                <input type="number" name="minPrice" value={filters.minPrice} onChange={handleChange} placeholder="Minimální cena" />
                <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleChange} placeholder="Maximální cena" />
                <input type="number" name="limit" value={filters.limit} onChange={handleChange} placeholder="Počet záznamů" />
                <button onClick={fetchInvoices}>Filtrovat</button>
            </div>

            <InvoiceTable
                deleteInvoice={deleteInvoice}
                items={invoices}
                label="Počet faktur:"
            />
        </div>
    );
};

export default InvoiceIndex;
