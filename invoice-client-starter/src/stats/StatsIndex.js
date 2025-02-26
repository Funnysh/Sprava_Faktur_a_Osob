import React, { useEffect, useState } from "react";
import InvoiceStats from "./InvoiceStats";
import PersonStats from "./PersonStats";
import { apiGet } from "../utils/api";

const StatsIndex = () => {
    const [personStats, setPersonStats] = useState([]);
    const [invoiceStats, setInvoiceStats] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const personsData = await apiGet("/api/persons/statistics");
                console.log("Přijaté osobní statistiky:", personsData);
                setPersonStats(Array.isArray(personsData) ? personsData : []);

                const invoicesData = await apiGet("/api/invoices/statistics");
                console.log("Přijaté fakturační statistiky:", invoicesData);
                setInvoiceStats(invoicesData ?? null);
            } catch (error) {
                console.error("Chyba při načítání statistik:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {invoiceStats ? <InvoiceStats item={invoiceStats} /> : <p>Načítání...</p>}

            {personStats.length > 0 ? <PersonStats items={personStats} /> : <p>Žádná data k dispozici</p>}
        </div>
    );
};

export default StatsIndex;
