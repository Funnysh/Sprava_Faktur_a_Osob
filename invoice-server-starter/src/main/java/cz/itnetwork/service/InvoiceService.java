package cz.itnetwork.service;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.InvoiceStatisticsDTO;

import java.util.List;

public interface InvoiceService {

    InvoiceDTO addInvoice(InvoiceDTO invoiceDTO);

    List<InvoiceDTO> findInvoices(Long buyerId, Long sellerId, String product, Long minPrice, Long maxPrice, Integer limit);

    InvoiceDTO getInvoice(long id);

    List<InvoiceDTO> getInvoiceBySeller (String identificationNumber);

    List<InvoiceDTO> getInvoiceByBuyer (String identificationNumber);

    InvoiceDTO editInvoice(long id, InvoiceDTO invoiceDTO);

    InvoiceStatisticsDTO getInvoiceStatistics();

    void deleteInvoice(long id);
}
