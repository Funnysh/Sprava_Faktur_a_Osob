
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {apiGet} from "../utils/api";
import Country from "./Country";
import SalesPurchasesTable from "./SalesPurchasesTable";

const PersonDetail = () => {
    const {id} = useParams();
    const [person, setPerson] = useState({});

    const [sales, setSales] = useState([]);
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        apiGet("/api/persons/" + id).then((data) => {
            setPerson(data);
        })
        .catch((error) => {
            console.error(error);
        })
    }, [id]);

    useEffect(() => {
        if (person.identificationNumber) {
            apiGet(`/api/identification/${person.identificationNumber}/sales`)
                .then((salesData) => {
                    setSales(salesData);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [person.identificationNumber]);

    useEffect(() => {
        if (person.identificationNumber) {
            apiGet(`/api/identification/${person.identificationNumber}/purchases`)
            .then((purchasesData) => {
                setPurchases(purchasesData);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }, [person.identificationNumber]);

    const country = Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

    return (
        <>
            <div>
                <h1>Detail osoby</h1>
                <hr/>
                <h3>{person.name} ({person.identificationNumber})</h3>
                <p>
                    <strong>DIČ:</strong>
                    <br/>
                    {person.taxNumber}
                </p>
                <p>
                    <strong>Bankovní účet:</strong>
                    <br/>
                    {person.accountNumber}/{person.bankCode} ({person.iban})
                </p>
                <p>
                    <strong>Tel.:</strong>
                    <br/>
                    {person.telephone}
                </p>
                <p>
                    <strong>Mail:</strong>
                    <br/>
                    {person.mail}
                </p>
                <p>
                    <strong>Sídlo:</strong>
                    <br/>
                    {person.street}, {person.city},
                    {person.zip}, {country}
                </p>
                <p>
                    <strong>Poznámka:</strong>
                    <br/>
                    {person.note}
                </p>
                <div>
                    <SalesPurchasesTable
                        sales={sales}
                        purchases={purchases}
                    />
                </div>
            </div>
        </>
    );
};

export default PersonDetail;
