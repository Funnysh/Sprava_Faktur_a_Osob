package cz.itnetwork.service;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.InvoiceStatisticsDTO;
import cz.itnetwork.dto.mapper.InvoiceMapper;
import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.entity.PersonEntity;
import cz.itnetwork.entity.repository.InvoiceRepository;
import cz.itnetwork.entity.repository.PersonRepository;
import cz.itnetwork.entity.specification.InvoiceSpecification;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvoiceServiceImpl implements InvoiceService{

    @Autowired
    private InvoiceMapper invoiceMapper;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private PersonRepository personRepository;

    @Override
    public InvoiceDTO addInvoice(InvoiceDTO invoiceDTO) {

        InvoiceEntity invoiceEntity = invoiceMapper.toEntity(invoiceDTO);

        invoiceEntity.setBuyer(personRepository.findById(invoiceEntity.getBuyer().getId()).orElseThrow(()
                -> new RuntimeException(("Buyer not found"))));
        invoiceEntity.setSeller(personRepository.findById(invoiceEntity.getSeller().getId()).orElseThrow(()
                -> new RuntimeException(("Seller not found"))));

        invoiceEntity = invoiceRepository.save(invoiceEntity);

        return invoiceMapper.toDTO(invoiceEntity);
    }

    @Override
    public List<InvoiceDTO> findInvoices(Long buyerId, Long sellerId, String product, Long minPrice, Long maxPrice, Integer limit) {

        var specification = InvoiceSpecification.searchInvoices(buyerId, sellerId, product, minPrice, maxPrice);

        Pageable pageable = PageRequest.of(0, limit != null ? limit : 30);

        List<InvoiceEntity> entities = invoiceRepository.findAll(specification, pageable).getContent();

        return entities.stream()
                .map(invoiceMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public InvoiceDTO getInvoice(long id) {

        InvoiceEntity entity = fetchInvoiceById(id);

        return invoiceMapper.toDTO(entity);
    }

    @Override
    public List<InvoiceDTO> getInvoiceBySeller(String idNumber) {

        PersonEntity seller = personRepository.findSellerByIdentificationNumberAndHiddenFalse(idNumber)
                .orElseThrow(() -> new RuntimeException(("Seller not found")));

        List<InvoiceEntity> invoices = invoiceRepository.findBySeller(seller);

        if (invoices.isEmpty()) {
            throw new EntityNotFoundException("No invoices found for seller with ID " + idNumber);
        }

        return invoices.stream()
                .map(invoiceMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<InvoiceDTO> getInvoiceByBuyer(String idNumber) {

        PersonEntity buyer = personRepository.findBuyerByIdentificationNumberAndHiddenFalse(idNumber)
                .orElseThrow(() -> new RuntimeException(("Buyer not found")));

        List<InvoiceEntity> invoices = invoiceRepository.findByBuyer(buyer);

        if (invoices.isEmpty()) {
            throw new EntityNotFoundException("No invoices found for buyer with ID " + idNumber);
        }

        return invoices.stream()
                .map(invoiceMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public InvoiceDTO editInvoice(long id, InvoiceDTO invoiceDTO) {

        InvoiceEntity entity = fetchInvoiceById(id);

        entity.setInvoiceNumber(invoiceDTO.getInvoiceNumber());
        entity.setIssued(invoiceDTO.getIssued());
        entity.setDueDate(invoiceDTO.getDueDate());
        entity.setProduct(invoiceDTO.getProduct());
        entity.setPrice(invoiceDTO.getPrice());
        entity.setVat(invoiceDTO.getVat());
        entity.setNote(invoiceDTO.getNote());
        entity.setBuyer(personRepository.findById(entity.getBuyer().getId()).orElseThrow(()
                -> new RuntimeException(("Buyer not found"))));
        entity.setSeller(personRepository.findById(entity.getSeller().getId()).orElseThrow(()
                -> new RuntimeException(("Seller not found"))));

        entity = invoiceRepository.save(entity);

        return invoiceMapper.toDTO(entity);
    }

    @Override
    public InvoiceStatisticsDTO getInvoiceStatistics() {
        return new InvoiceStatisticsDTO(invoiceRepository.getCurrentYearSum(), invoiceRepository.getAllTimeSum(), invoiceRepository.getInvoicesCount());
    }

    @Override
    public void deleteInvoice(long id) {

        InvoiceEntity entity = fetchInvoiceById(id);

        invoiceRepository.delete(entity);
    }

    private InvoiceEntity fetchInvoiceById(long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Invoice with id " + id + " wasn't found in the database."));
    }
}
