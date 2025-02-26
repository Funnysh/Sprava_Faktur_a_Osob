package cz.itnetwork.entity.specification;

import cz.itnetwork.entity.InvoiceEntity;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

public class InvoiceSpecification {

    public static Specification<InvoiceEntity> searchInvoices(Long buyerID, Long sellerID, String product, Long minPrice, Long maxPrice) {
        return (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();

            if (buyerID != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("buyer").get("id"), buyerID));
            }
            if (sellerID != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("seller").get("id"), sellerID));
            }
            if (product != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("product"), "%" + product + "%"));
            }
            if (minPrice != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice));
            }
            if (maxPrice != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            return predicate;
        };
    }
}
