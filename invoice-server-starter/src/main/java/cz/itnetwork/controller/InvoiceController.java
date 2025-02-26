package cz.itnetwork.controller;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.InvoiceStatisticsDTO;
import cz.itnetwork.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @PostMapping("/invoices")
    public InvoiceDTO addInvoice(@RequestBody InvoiceDTO invoiceDTO) {
        return invoiceService.addInvoice(invoiceDTO);
    }

    @GetMapping("/invoices")
    public List<InvoiceDTO> findInvoices(
            @RequestParam(required = false) Long buyerID,
            @RequestParam(required = false) Long sellerID,
            @RequestParam(required = false) String product,
            @RequestParam(required = false) Long minPrice,
            @RequestParam(required = false) Long maxPrice,
            @RequestParam(required = false) Integer limit) {
        return invoiceService.findInvoices(buyerID, sellerID, product, minPrice, maxPrice, limit);
    }

    @GetMapping("/invoices/{invoiceId}")
    public InvoiceDTO getInvoice(@PathVariable long invoiceId) {
        return invoiceService.getInvoice(invoiceId);
    }

    @GetMapping("/identification/{sellerId}/sales")
    public List<InvoiceDTO> findInvoicesBySeller(@PathVariable String sellerId) {
        return invoiceService.getInvoiceBySeller(sellerId);
    }

    @GetMapping("/identification/{buyerId}/purchases")
    public List<InvoiceDTO> findInvoicesByBuyer(@PathVariable String buyerId) {
        return invoiceService.getInvoiceByBuyer(buyerId);
    }

    @PutMapping("/invoices/{invoiceId}")
    public InvoiceDTO editInvoice(@PathVariable long invoiceId, @RequestBody InvoiceDTO invoiceDTO) {
        return invoiceService.editInvoice(invoiceId, invoiceDTO);
    }

    @GetMapping("/invoices/statistics")
    public InvoiceStatisticsDTO getInvoiceStatistics() {
        return invoiceService.getInvoiceStatistics();
    }

    @DeleteMapping("/invoices/{invoiceId}")
    public void deleteInvoice(@PathVariable Long invoiceId) {
        invoiceService.deleteInvoice(invoiceId);
    }
}
