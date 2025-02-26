const InvoiceStats = ({ item }) => {
    console.log("Přijaté fakturační statistiky:", item);

    if (!item) {
        return <p>Žádná data k dispozici</p>;
    }

    return (
        <div>
            <h2>Statistiky faktur</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Letošní rok</th>
                        <th>Celkový výdělek</th>
                        <th>Počet faktur</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{item.currentYearSum ?? 0}</td>
                        <td>{item.allTimeSum ?? 0}</td>
                        <td>{item.invoiceCount ?? 0}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceStats;
