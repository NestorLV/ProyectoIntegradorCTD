package com.proyecto.integrador.persistence.repository;

import com.proyecto.integrador.persistence.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface IProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByCategory_Title(final String title);

    List<Product> findByCity_Id(final Integer id);

    List<Product> findFirst12ByOrderByQualificationDesc();

    List<Product> findFirst5ByOrderByQualificationDesc();

    /*String RESERVATION_QUERY_BY_CITY = "select p.idProduct, p.name, p.description, p.latitude, p.longitude, p.address, " +
            " p.qualification, p.favourite,p.reference,p.idCategory,p.idCity, p.rules, p.health, p.politics, " +
            " r.idReservation " +
            " from product p " +
            " JOIN city c ON c.idCity = p.idCity " +
            " LEFT JOIN reservation r ON r.idProduct = p.idProduct " +
            " where p.idCity = ?1 AND p.idProduct NOT IN(select p.idProduct from product p " +
            "JOIN city c ON c.idCity = p.idCity " +
            "JOIN reservation r ON r.idProduct = p.idProduct )" ;

    String RESERVATION_QUERY_BY_DATES = "select p.idProduct, p.name, p.description, p.latitude, p.longitude, p.address, " +
            " p.qualification, p.favourite,p.reference,p.idCategory,p.idCity, p.rules, p.health, p.politics, " +
            " r.idReservation " +
            " from product p " +
            " LEFT JOIN reservation r ON r.idProduct = p.idProduct " +
            " AND ((r.endDate < ?2 AND r.startDate< ?1 " +
            " OR (r.endDate > ?2 AND r.startDate > ?1 ))) " +
            " where p.idProduct NOT IN(select p.idProduct from product p " +
            "JOIN reservation r ON r.idProduct = p.idProduct " +
            "where r.startDate >= ?1 AND r.endDate <= ?2) " ;



    String RESERVATION_QUERY = "select p.idProduct, p.name, p.description, p.latitude, p.longitude, p.address, " +
            " p.qualification, p.favourite,p.reference,p.idCategory,p.idCity, p.rules, p.health, p.politics, " +
            " r.idReservation " +
            " from product p " +
            " JOIN city c ON c.idCity = p.idCity " +
            " LEFT JOIN reservation r ON r.idProduct = p.idProduct " +
            " AND ((r.endDate < ?3 AND r.startDate< ?2 " +
            " OR (r.endDate > ?3 AND r.startDate > ?2))) " +
            " where p.idCity = ?1 AND p.idProduct NOT IN(select p.idProduct from product p " +
            "JOIN city c ON c.idCity = p.idCity " +
            "JOIN reservation r ON r.idProduct = p.idProduct " +
            "where p.idCity = ?1 AND (r.startDate >= ?2 AND r.endDate <= ?3))";


    @Query(value = RESERVATION_QUERY_BY_CITY, nativeQuery = true)
    List<Object[]> findByCity(Integer idCity);
    @Query(value = RESERVATION_QUERY_BY_DATES, nativeQuery = true)
    List<Object[]> findByDateRange(Date startDate, Date endDate);
    @Query(value = RESERVATION_QUERY, nativeQuery = true)
    List<Object[]> findByCityDateRange(Integer idCity, Date startDate, Date endDate);


    default List<Object[]> queryBuilder(Integer idCity, Date startDate, Date endDate){
        if(idCity != null && (startDate == null || endDate == null)){
            return findByCity(idCity);
        }else if(idCity==null&& (startDate!=null&&endDate!=null)){
            return findByDateRange(startDate, endDate);
        }else if(idCity!=null &&(startDate != null && endDate != null)){
            return findByCityDateRange(idCity, startDate, endDate);
        } else {
            return null;
        }
    }*/
}
