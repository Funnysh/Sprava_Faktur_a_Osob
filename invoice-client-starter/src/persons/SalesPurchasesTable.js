import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

const SalesPurchasesTable = ({sales, purchases}) => {

    return (
        <div>
            <strong>Vystavené faktury</strong>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Číslo faktury</th>
                        <th>Datum</th>
                        <th>Položka</th>
                        <th>Celková částka</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale, index) => {
                    const salesTotalAmount = sale.price + (sale.price * (sale.vat / 100));

                    const formattedDate = new Date(sale.issued).toLocaleDateString();
                    
                    return (
                        <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td>{sale.invoiceNumber}</td>
                            <td>{formattedDate}</td>
                            <td>{sale.product}</td>
                            <td>{salesTotalAmount.toFixed(2)}</td>
                            <td align="center">
                                <Link to={`/invoices/show/${sale._id}`} className="btn btn-sm btn-info">
                                Zobrazit
                                </Link>
                            </td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
            <p>Počer vystavených faktur: {sales.length}</p>
            <strong>Přijaté faktury</strong>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Číslo faktury</th>
                        <th>Datum</th>
                        <th>Položka</th>
                        <th>Celková částka</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {purchases.map((purchase, index) => {
                    const purchaseTotalAmount = purchase.price + (purchase.price * (purchase.vat / 100));

                    const formattedDate = new Date(purchase.issued).toLocaleDateString();
                    
                    return (
                        <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td>{purchase.invoiceNumber}</td>
                            <td>{formattedDate}</td>
                            <td>{purchase.product}</td>
                            <td>{purchaseTotalAmount.toFixed(2)}</td>
                            <td align="center">
                            <Link to={`/invoices/show/${purchase._id}`} className="btn btn-sm btn-info">
                                Zobrazit
                            </Link>
                            </td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
            <p>Počet vystavených faktur: {purchases.length}</p>
        </div>
    )
}

export default SalesPurchasesTable;