package cz.itnetwork.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity(name = "invoice")
@Getter
@Setter
public class InvoiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private int invoiceNumber;

    @Column(nullable = false)
    private Date issued;

    @Column(nullable = false)
    private Date dueDate;

    @Column(nullable = false)
    private String product;

    @Column(nullable = false)
    private long price;

    @Column(nullable = false)
    private int vat;

    @Column(nullable = false)
    private String note;

    @ManyToOne
    @JoinColumn(name = "buyer_id", nullable = false)
    private PersonEntity buyer;

    @ManyToOne
    @JoinColumn(name = "seller_id", nullable = false)
    private PersonEntity seller;

}
