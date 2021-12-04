package com.proyecto.integrador.service.impl;

import com.proyecto.integrador.DTO.*;
import com.proyecto.integrador.persistence.entity.*;
import com.proyecto.integrador.exceptions.BadRequestException;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.persistence.repository.IProductRepository;
import com.proyecto.integrador.service.IProductService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements IProductService {
    private final Logger logger = Logger.getLogger(ProductServiceImpl.class);

    @Autowired
    IProductRepository productRepository;
    @Autowired
    CategoryServiceImpl categoryService;
    @Autowired
    CityServiceImpl cityService;
    @Autowired
    ImageServiceImpl imageService;
    @Autowired
    FeatureServiceImpl featureService;
    @Autowired
    ScoreServiceImpl scoreService;
    @Autowired
    ReservationServiceImpl reservationService;

    private ProductDTO loadDataIntoProductDTO(Product product) throws FindByIdException {
        ProductDTO productDto = product.toDto();
        productDto.setCategory(categoryService.findById(product.getCategory().getId()));
        productDto.setCity(cityService.findById(product.getCity().getId()));
        productDto.setQualification(scoreService.average(product.getId()));
        productDto.setImages(imageService.findByProductId(product.getId()));
        productDto.setFeatures(featureService.findByProduct(product));

        return productDto;
    }

    @Override
    public List<ProductDTO> findAll() throws FindByIdException {
        logger.debug("Iniciando método buscar todos los productos");
        List<ProductDTO> products = new ArrayList<>();
        for (Product product : productRepository.findAll()) {
            products.add(loadDataIntoProductDTO(product));
        }
        logger.debug("Terminó la ejecución del método buscar todos los productos");
        return products;
    }

    @Override
    public ProductDTO save(ProductDTO product) throws FindByIdException, BadRequestException {
        logger.debug("Iniciando método guardar producto");
        if (productRepository.findAll().contains(product.toEntity())) {
            throw new BadRequestException("El producto ingresado ya existe en la base de datos");
        }
        Product newProduct = productRepository.save(product.toEntity());
        logger.debug("Terminó la ejecución del método guardar producto");
        return loadDataIntoProductDTO(newProduct);
    }

    @Override
    public ProductDTO findById(Integer productId) throws FindByIdException {
        logger.debug("Iniciando método buscar producto por ID");
        if (!productRepository.existsById(productId)) {
            throw new FindByIdException("No existe un producto con el id ingresado");
        }
        Product foundProduct = productRepository.findById(productId).get();
        logger.debug("Terminó la ejecución del método buscar producto por ID");
        return loadDataIntoProductDTO(foundProduct);
    }

    @Override
    public void deleteById(Integer productId) throws FindByIdException {
        logger.debug("Iniciando método eliminar producto por ID");
        if (!productRepository.existsById(productId)) {
            throw new FindByIdException("No existe una producto con el id ingresado");
        }
        logger.debug("Terminó la ejecución del método eliminar producto por ID");
        productRepository.deleteById(productId);
    }

    @Override
    public ProductDTO update(ProductDTO productDTO) throws FindByIdException {
        logger.debug("Iniciando método actualizar producto");
        if (!productRepository.existsById(productDTO.getId())) {
            throw new FindByIdException("No existe una producto con el id ingresado");
        }
        Product product = productRepository.findById(productDTO.getId()).get();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setLatitude(productDTO.getLatitude());
        product.setLongitude(productDTO.getLongitude());
        product.setReference(productDTO.getReference());
        product.setCategory(new Category(productDTO.getCategory().getId()));
        product.setCity(new City(productDTO.getCity().getId()));
        productRepository.save(product);
        logger.debug("Terminó la ejecución del método actualizar producto");
        return loadDataIntoProductDTO(product);
    }

    @Override
    public List<ProductDTO> findAllByCategory(String categoryName) throws BadRequestException, FindByIdException {
        logger.debug("Iniciando método buscar productos por categoría");
        categoryService.categoryExistsInDatabase(categoryName);
        List<ProductDTO> productsByCategory = new ArrayList<>();
        for (Product product : productRepository.findByCategory_Title(categoryName)) {
            productsByCategory.add(loadDataIntoProductDTO(product));
        }
        logger.debug("Terminó la ejecución del método buscar productos por categoría");
        return productsByCategory;
    }

    @Override
    public List<ProductDTO> findAllByCity(Integer cityId) throws FindByIdException, BadRequestException {
        logger.debug("Iniciando método buscar productos por ciudad");
        if (!cityService.cityExistsInDatabase(cityId)) {
            throw new BadRequestException("No se registra ninguna ciudad asociada al id ingresado");
        }
        List<ProductDTO> productsByCity = new ArrayList<>();
        for (Product product : productRepository.findByCity_Id(cityId)) {
            productsByCity.add(loadDataIntoProductDTO(product));
        }
        logger.debug("Terminó la ejecución del método buscar productos por ciudad");
        return productsByCity;
    }

    public List<ProductDTO> findAllByDates(Date startDate, Date endDate) throws FindByIdException {
        logger.debug("Iniciando método buscar productos por fechas");
        List<ReservationDTO> reservas = reservationService.findAll();
        List<ReservationDTO> reservasOcupadas = reservas.stream().filter(r -> (startDate.equals(r.getStartDate()) || startDate.before(r.getStartDate()) && endDate.after(r.getStartDate())) || startDate.after(r.getStartDate()) && endDate.before(r.getEndDate()) || startDate.after(r.getStartDate()) && startDate.before(r.getEndDate())).collect(Collectors.toList());
        List<Integer> productIds = new ArrayList<>();
        for (ReservationDTO reservation : reservasOcupadas) {
            productIds.add(reservation.getProductId());
        }
        List<ProductDTO> products = findAll();
        if (productIds.size() == 0) {
            return products;
        }
        List<ProductDTO> productosDisponibles = new ArrayList<>();
        for (ProductDTO product : products) {
            productIds.forEach(id -> {
                if (!Objects.equals(id, product.getId())) {
                    productosDisponibles.add(product);
                }
            });
        }
        logger.debug("Terminó la ejecución del método buscar productos por fechas");
        return productosDisponibles;
    }

    public List<ProductDTO> filterCityAndDates(FilterDTO filterDto) throws BadRequestException, FindByIdException {
        logger.debug("Iniciando método buscar productos por ciudad y fechas");

        //Filtro sólo por categoría
        if (filterDto.getCityId() == null && filterDto.getStartDate() == null && filterDto.getEndDate() == null) {
            if (filterDto.getCategory().equals("All")) {
                return findAll();
            } else {
                return findAllByCategory(filterDto.getCategory());
            }
        }

        //Filtro sólo por fechas
        if (filterDto.getCityId() == null && filterDto.getCategory().equals("All")) {
            return findAllByDates(filterDto.getStartDate(), filterDto.getEndDate());
        }
        //Filtro sólo por ciudad
        if (filterDto.getStartDate() == null && filterDto.getEndDate() == null && filterDto.getCategory().equals("All")) {
            return findAllByCity((filterDto.getCityId()));
        }

        //Filtrado por fecha y categoría
        if (filterDto.getCityId() == null && !filterDto.getCategory().equals("All")) {
            List<ProductDTO> productsByDates = findAllByDates(filterDto.getStartDate(), filterDto.getEndDate());
            List<ProductDTO> productsByCategory = findAllByCategory(filterDto.getCategory());
            List<ProductDTO> productosDisponibles = new ArrayList<>();
            for (ProductDTO product : productsByDates) {
                productsByCategory.forEach(p -> {
                    if (p.equals(product)) {
                        productosDisponibles.add(product);
                    }
                });
            }
            logger.debug("Terminó la ejecución del método buscar productos por fechas y categoría");
            return productosDisponibles;
        }

        //Filtrado por ciudad y categoría
        if (filterDto.getStartDate() == null && filterDto.getEndDate() == null && !filterDto.getCategory().equals("All")) {
            List<ProductDTO> productsByCity = findAllByCity(filterDto.getCityId());
            List<ProductDTO> productsByCategory = findAllByCategory(filterDto.getCategory());
            List<ProductDTO> productosDisponibles = new ArrayList<>();
            for (ProductDTO product : productsByCity) {
                productsByCategory.forEach(p -> {
                    if (p.equals(product)) {
                        productosDisponibles.add(product);
                    }
                });
            }
            logger.debug("Terminó la ejecución del método buscar productos por ciudad y Categoría");
            return productosDisponibles;
        }
        //Filtro por ciudad y fecha
        if (filterDto.getCategory().equals("All")) {
            List<ProductDTO> productsByCity = findAllByCity(filterDto.getCityId());
            List<ProductDTO> productsByDates = findAllByDates(filterDto.getStartDate(), filterDto.getEndDate());
            List<ProductDTO> productosDisponibles = new ArrayList<>();
            for (ProductDTO product : productsByCity) {
                productsByDates.forEach(p -> {
                    if (p.equals(product)) {
                        productosDisponibles.add(product);
                    }
                });
            }
            logger.debug("Terminó la ejecución del método buscar productos por ciudad y fechas");
            return productosDisponibles;
        }
        // Filtro por categoría, fecha y ciudad
        //if (!filterDto.getCategory().equals("All")) {
        else {
            List<ProductDTO> productsByCity = findAllByCity(filterDto.getCityId());
            List<ProductDTO> productsByDates = findAllByDates(filterDto.getStartDate(), filterDto.getEndDate());
            List<ProductDTO> productsByCategory = findAllByCategory(filterDto.getCategory());
            List<ProductDTO> primerFiltrado = new ArrayList<>();
            List<ProductDTO> productosDisponibles = new ArrayList<>();
            for (ProductDTO product : productsByCity) {
                productsByDates.forEach(p -> {
                    if (p.equals(product)) {
                        primerFiltrado.add(product);
                    }
                });
            }
            for (ProductDTO product : primerFiltrado) {
                productsByCategory.forEach(p -> {
                    if (p.equals(product)) {
                        productosDisponibles.add(product);
                    }
                });
            }
            logger.debug("Terminó la ejecución del método buscar productos por ciudad y fechas");
            return productosDisponibles;
        }
    }

    // Revisar si se puede mejorar este método
    public List<ProductDTO> findRecommendations() throws FindByIdException {
        List<ProductDTO> recommendedProducts = new ArrayList<>();
        productRepository.findAll().forEach(p -> {
            p.setQualification(scoreService.average(p.getId()));
            productRepository.save(p);
        });
        for (Product product : productRepository.findFirst12ByOrderByQualificationDesc()) {
            recommendedProducts.add(loadDataIntoProductDTO(product));
        }
        return recommendedProducts;
    }

    public void updateQualification(Integer productId, double newQualification) throws FindByIdException {
        logger.debug("Iniciando método actualizar calificación de producto");
        if (!productRepository.existsById(productId)) {
            throw new FindByIdException("No existe un producto con el id ingresado");
        }
        Product product = productRepository.findById(productId).get();
        product.setQualification(newQualification);
        productRepository.save(product);
        logger.debug("Terminó la ejecución del método actualizar calificación de producto");
    }

    /* Opción 2 del filtrado de ciudad y fechas con queries SQL */

   /* public List<ProductDTO> findCityDateRange(FilterDTO filterDTO) throws FindByIdException {
        logger.debug("Iniciando método buscar productos por ciudad y dos fechas");
        return findDateRange(filterDTO.getCityId(), filterDTO.getStartDate(), filterDTO.getEndDate());
    }

    public List<ProductDTO> findDateRange(Integer cityId, Date startDate, Date endDate) throws FindByIdException {
        List<ProductDTO> products = new ArrayList<>();
        List<Object[]> byCityDateRange = productRepository.queryBuilder(cityId, startDate, endDate);

        if (byCityDateRange != null && byCityDateRange.size() > 0) {
            for (Object[] item : byCityDateRange) {
                Integer productId = (Integer) item[0];
                ProductDTO resultDTO = new ProductDTO();
                resultDTO.setId(productId);
                resultDTO.setName(item[1].toString());
                resultDTO.setDescription(item[2].toString());
                resultDTO.setLatitude((Double) item[3]);
                resultDTO.setLongitude((Double) item[4]);
                resultDTO.setAddress(item[5].toString());
                resultDTO.setQualification(Double.parseDouble(item[6].toString()));
                resultDTO.setFavourite((Boolean) item[7]);
                resultDTO.setReference((item[8].toString()));
                resultDTO.setCategory(categoryService.findById((Integer) item[9]));
                resultDTO.setCity(cityService.findById((Integer) item[10]));
                resultDTO.setRules((String) item[11]);
                resultDTO.setHealth((String) item[12]);
                resultDTO.setPolitics((String) item[13]);
                resultDTO.setImages(imageService.findByProductId(productId));
                resultDTO.setFeatures(featureService.findByProduct(new Product(productId)));
                products.add(resultDTO);
            }
        }
        return products;
    }*/
}
