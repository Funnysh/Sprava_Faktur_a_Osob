import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiGet } from "../utils/api";

const InvoiceDetail = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);

    useEffect(() => {
        apiGet(`/api/invoices/${id}`)
            .then((data) => setInvoice(data))
            .catch((error) => {
                console.error("Chyba při načítání faktury:", error);
            });
    }, [id]);

    if (!invoice) {
        return <div>Načítání...</div>;
    }

    const issuedDate = new Date(invoice.issued).toLocaleDateString();
    const dueDate = new Date(invoice.dueDate).toLocaleDateString();
    const totalAmount = invoice.price * (1 + invoice.vat / 100);

    return (
        <div>
            <h1>Detail faktury: {invoice.invoiceNumber}</h1>
            <p><strong>Číslo faktury:</strong> {invoice.invoiceNumber}</p>
            <p><strong>Datum vystavení:</strong> {issuedDate}</p>
            <p><strong>Datum splatnosti:</strong> {dueDate}</p>
            <p><strong>Produkt:</strong> {invoice.product}</p>
            <p><strong>Cena bez DPH:</strong> {invoice.price} Kč</p>
            <p><strong>DPH:</strong> {invoice.vat}%</p>
            <p><strong>Celková částka:</strong> {totalAmount.toFixed(2)} Kč</p>
            <p><strong>Poznámka:</strong> {invoice.note}</p>

            <h3>Kupující:</h3>
            <p><strong>Jméno:</strong> {invoice.buyer.name}</p>
            <p><strong>IČO:</strong> {invoice.buyer.identificationNumber}</p>
            <p><strong>DIČ:</strong> {invoice.buyer.taxNumber}</p>
            <p><strong>Účet:</strong> {invoice.buyer.accountNumber}/{invoice.buyer.bankCode} ({invoice.buyer.iban})</p>
            <p><strong>Telefon:</strong> {invoice.buyer.telephone}</p>
            <p><strong>Email:</strong> {invoice.buyer.mail}</p>
            <p><strong>Adresa:</strong> {invoice.buyer.street}, {invoice.buyer.zip}, {invoice.buyer.city}, {invoice.buyer.country}</p>
            <p><strong>Poznámka:</strong> {invoice.buyer.note}</p>
            <Link to={`/persons/show/${invoice.buyer._id}`} className="btn mb-5 btn-info">Detail</Link>
            
            <h3>Prodávající:</h3>
            <p><strong>Jméno:</strong> {invoice.seller.name}</p>
            <p><strong>IČO:</strong> {invoice.seller.identificationNumber}</p>
            <p><strong>DIČ:</strong> {invoice.seller.taxNumber}</p>
            <p><strong>Účet:</strong> {invoice.seller.accountNumber}/{invoice.seller.bankCode} ({invoice.seller.iban})</p>
            <p><strong>Telefon:</strong> {invoice.seller.telephone}</p>
            <p><strong>Email:</strong> {invoice.seller.mail}</p>
            <p><strong>Adresa:</strong> {invoice.seller.street}, {invoice.seller.zip}, {invoice.seller.city}, {invoice.seller.country}</p>
            <p><strong>Poznámka:</strong> {invoice.seller.note}</p>
            <Link to={`/persons/show/${invoice.seller._id}`} className="btn mb-3 btn-info">Detail</Link>
        </div>
    );
};

export default InvoiceDetail;