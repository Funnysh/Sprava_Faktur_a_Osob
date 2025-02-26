import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../utils/api";
import InputField from "../components/InputField";
import FlashMessage from "../components/FlashMessage";

const InvoiceForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        date: "",
        dueDate: "",
        totalAmount: "",
        items: "",
        note: "",
        seller: null,
        buyer: null,
    });

    const [persons, setPersons] = useState([]);
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);

    useEffect(() => {
        apiGet("/api/persons")
            .then((data) => setPersons(data))
            .catch(() => setError("Chyba při načítání osob."));
    }, []);

    useEffect(() => {
        if (id) {
            apiGet(`/api/invoices/${id}`)
                .then((data) => {
                    setInvoice({
                        invoiceNumber: data.invoiceNumber || "",
                        date: data.issued ? new Date(data.issued).toISOString().split("T")[0] : "",
                        dueDate: data.dueDate ? new Date(data.dueDate).toISOString().split("T")[0] : "",
                        totalAmount: data.price ? data.price.toString() : "",
                        items: data.product || "",
                        note: data.note || "",
                        seller: data.seller?._id || null,
                        buyer: data.buyer?._id || null,
                    });
                })
                .catch(() => setError("Chyba při načítání faktury."));
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        (id 
            ? apiPut(`/api/invoices/${id}`, {
                invoiceNumber: invoice.invoiceNumber,
                seller: invoice.seller ? { _id: invoice.seller } : null,
                buyer: invoice.buyer ? { _id: invoice.buyer } : null,
                issued: invoice.date,
                dueDate: invoice.dueDate,
                product: invoice.items,
                price: parseFloat(invoice.totalAmount),
                vat: 21,
                note: invoice.note,
            }) 
            : apiPost("/api/invoices", {
                invoiceNumber: invoice.invoiceNumber,
                seller: invoice.seller ? { _id: invoice.seller } : null,
                buyer: invoice.buyer ? { _id: invoice.buyer } : null,
                issued: invoice.date,
                dueDate: invoice.dueDate,
                product: invoice.items,
                price: parseFloat(invoice.totalAmount),
                vat: 21,
                note: invoice.note,
            })
        )
        .then(() => {
            setSent(true);
            setSuccess(true);
            navigate("/invoices");
        })
        .catch((error) => {
            setError("Chyba při ukládání faktury.");
            setSent(true);
            setSuccess(false);
        });
    };
    

    return (
        <div>
            <h1>{id ? "Upravit fakturu" : "Vytvořit novou fakturu"}</h1>
            <hr />
            {errorState && <div className="alert alert-danger">{errorState}</div>}
            {sentState && (
                <FlashMessage
                    theme={successState ? "success" : "danger"}
                    text={successState ? "Faktura byla úspěšně uložena." : "Došlo k chybě při ukládání faktury."}
                />
            )}
            <form onSubmit={handleSubmit}>
                <InputField
                    required
                    type="text"
                    name="invoiceNumber"
                    label="Číslo faktury"
                    value={invoice.invoiceNumber}
                    handleChange={(e) => setInvoice({ ...invoice, invoiceNumber: e.target.value })}
                />
                <InputField
                    required
                    type="date"
                    name="date"
                    label="Datum vydání"
                    value={invoice.date}
                    handleChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
                />
                <InputField
                    required
                    type="date"
                    name="dueDate"
                    label="Datum splatnosti"
                    value={invoice.dueDate}
                    handleChange={(e) => setInvoice({ ...invoice, dueDate: e.target.value })}
                />
                <InputField
                    required
                    type="number"
                    name="totalAmount"
                    label="Celková částka"
                    value={invoice.totalAmount}
                    handleChange={(e) => setInvoice({ ...invoice, totalAmount: e.target.value })}
                />
                <InputField
                    required
                    type="text"
                    name="items"
                    label="Položky"
                    value={invoice.items}
                    handleChange={(e) => setInvoice({ ...invoice, items: e.target.value })}
                />
                <InputField
                    type="text"
                    name="note"
                    label="Poznámka"
                    value={invoice.note}
                    handleChange={(e) => setInvoice({ ...invoice, note: e.target.value })}
                />

                <div className="form-group">
                    <label htmlFor="seller">Prodávající</label>
                    <select
                        id="seller"
                        className="form-control"
                        value={invoice.seller || ""}
                        onChange={(e) => setInvoice({ ...invoice, seller: e.target.value })}
                    >
                        <option value="">Vyberte prodávajícího</option>
                        {persons.length > 0 ? (
                            persons.map((person) => (
                                <option key={person._id} value={person._id}>
                                    {person.name} - IČO: {person.identificationNumber}
                                </option>
                            ))
                        ) : (
                            <option disabled>Načítání osob...</option>
                        )}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="buyer">Kupující</label>
                    <select
                        id="buyer"
                        className="form-control"
                        value={invoice.buyer || ""}
                        onChange={(e) => setInvoice({ ...invoice, buyer: e.target.value })}
                    >
                        <option value="">Vyberte kupujícího</option>
                        {persons.length > 0 ? (
                            persons.map((person) => (
                                <option key={person._id} value={person._id}>
                                    {person.name} - IČO: {person.identificationNumber}
                                </option>
                            ))
                        ) : (
                            <option disabled>Načítání osob...</option>
                        )}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    {id ? "Uložit změny" : "Vytvořit fakturu"}
                </button>
            </form>
        </div>
    );
};

export default InvoiceForm;
