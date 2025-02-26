package cz.itnetwork.entity.repository;

import cz.itnetwork.dto.PersonStatisticsDTO;
import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.entity.PersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface InvoiceRepository extends JpaRepository<InvoiceEntity, Long>, JpaSpecificationExecutor<InvoiceEntity> {

    List<InvoiceEntity> findBySeller(PersonEntity seller);

    List<InvoiceEntity> findByBuyer(PersonEntity seller);

    @Query(value = "SELECT COALESCE(SUM(price), 0) FROM invoice")
    Long getAllTimeSum();

    @Query(value = "SELECT COALESCE(SUM(price), 0) FROM invoice WHERE YEAR(DATE(issued)) = YEAR(CURDATE())")
    Long getCurrentYearSum();

    @Query(value = "SELECT COUNT(*) FROM invoice")
    long getInvoicesCount();

    @Query("SELECT new cz.itnetwork.dto.PersonStatisticsDTO(p.id, p.name, COALESCE(SUM(i.price), 0)) " +
            "FROM person p LEFT JOIN p.purchases i " +
            "GROUP BY p.id, p.name")
    List<PersonStatisticsDTO> getPersonsStatistics();



}
