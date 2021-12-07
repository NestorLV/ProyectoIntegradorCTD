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
import java.util.logging.Filter;
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

    public ProductDTO loadDataIntoProductDTO(Product product) throws FindByIdException {
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
            if (!product.isDeleted()) {
                products.add(loadDataIntoProductDTO(product));
            }
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
        product.setDeleted(false);
        Product newProduct = productRepository.save(product.toEntity());
        logger.debug("Terminó la ejecución del método guardar producto");
        return loadDataIntoProductDTO(newProduct);
    }

    @Override
    public ProductDTO findById(Integer productId) throws FindByIdException {
        logger.debug("Iniciando método buscar producto por ID");
        if (!productRepository.existsById(productId) || productRepository.findById(productId).get().isDeleted()) {
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
        Product product = productRepository.findById(productId).isPresent() ? productRepository.findById(productId).get() : null;
        Set<FeatureResponseDTO> features = featureService.findByProduct(product);
        features.forEach(f -> featureService.updateDeleteProducts(product));
        logger.debug("Terminó la ejecución del método eliminar producto por ID");
        productRepository.deleteById(productId);
    }

    @Override
    public void deletedMarkById(Integer productId) throws FindByIdException {
        logger.debug("Iniciando método eliminar producto por ID");
        if (!productRepository.existsById(productId)) {
            throw new FindByIdException("No existe una producto con el id ingresado");
        }
        Product product = productRepository.findById(productId).get();
        product.setDeleted(true);
        logger.debug("Terminó la ejecución del método eliminar producto por ID");
        productRepository.save(product);
    }

    @Override
    public ProductDTO update(ProductDTO productDTO) throws FindByIdException {
        logger.debug("Iniciando método actualizar producto");
        if (!productRepository.existsById(productDTO.getId()) || productRepository.findById(productDTO.getId()).get().isDeleted()) {
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
        product.setHealth(productDTO.getHealth());
        product.setPolitics(productDTO.getPolitics());
        product.setRules(productDTO.getRules());
        productRepository.save(product);
        logger.debug("Terminó la ejecución del método actualizar producto");
        return loadDataIntoProductDTO(product);
    }

    /* FILTRADO POR CATEGORIA */
    @Override
    public List<ProductDTO> findAllByCategory(String categoryName) throws BadRequestException, FindByIdException {
        logger.debug("Iniciando método buscar productos por categoría");
        categoryService.categoryExistsInDatabase(categoryName);
        List<ProductDTO> productsByCategory = new ArrayList<>();
        for (Product product : productRepository.findByCategory_Title(categoryName)) {
            if (!product.isDeleted()) {
                productsByCategory.add(loadDataIntoProductDTO(product));
            }
        }
        logger.debug("Terminó la ejecución del método buscar productos por categoría");
        return productsByCategory;
    }

    /* FILTRADO POR CIUDAD */
    @Override
    public List<ProductDTO> findAllByCity(Integer cityId) throws FindByIdException, BadRequestException {
        logger.debug("Iniciando método buscar productos por ciudad");
        if (!cityService.cityExistsInDatabase(cityId)) {
            throw new BadRequestException("No se registra ninguna ciudad asociada al id ingresado");
        }
        List<ProductDTO> productsByCity = new ArrayList<>();
        for (Product product : productRepository.findByCity_Id(cityId)) {
            if (!product.isDeleted()) {
                productsByCity.add(loadDataIntoProductDTO(product));
            }
        }
        logger.debug("Terminó la ejecución del método buscar productos por ciudad");
        return productsByCity;
    }

    /* FILTRADO POR FECHAS */
    @Override
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
        logger.debug("Terminó la ejecución del método buscar productos por fechas");
        return products.stream().filter(p -> !productIds.contains(p.getId()) && !p.isDeleted()).collect(Collectors.toList());
    }

    /* FILTRADO POR CIUDAD Y FECHAS */
    @Override
    public List<ProductDTO> findAllByCityAndDates(Integer cityId, Date startDate, Date endDate) throws BadRequestException, FindByIdException {
        logger.debug("Iniciando método buscar productos por ciudad y fechas");
        List<ProductDTO> productsByCity = findAllByCity(cityId);
        List<ProductDTO> productsByDates = findAllByDates(startDate, endDate);
        logger.debug("Terminó la ejecución del método buscar productos por ciudad y fechas");
        return productsByCity.stream().filter(productsByDates::contains).collect(Collectors.toList());
    }

    /* FILTRADO POR FECHAS Y CATEGORIA */
    @Override
    public List<ProductDTO> findAllByDatesAndCategory(Date startDate, Date endDate, String categoryName) throws FindByIdException, BadRequestException {
        logger.debug("Iniciando método buscar productos por fechas y categoría");
        List<ProductDTO> productsByDates = findAllByDates(startDate, endDate);
        List<ProductDTO> productsByCategory = findAllByCategory(categoryName);
        logger.debug("Terminó la ejecución del método buscar productos por fechas y categoría");
        return productsByDates.stream().filter(productsByCategory::contains).collect(Collectors.toList());
    }

    /* FILTRADO POR CIUDAD Y CATEGORIA */
    @Override
    public List<ProductDTO> findAllByCityAndCategory(Integer cityId, String categoryName) throws BadRequestException, FindByIdException {
        logger.debug("Iniciando método buscar productos por ciudad y categoría");
        List<ProductDTO> productsByCity = findAllByCity(cityId);
        List<ProductDTO> productsByCategory = findAllByCategory(categoryName);
        logger.debug("Terminó la ejecución del método buscar productos por ciudad y categoría");
        return productsByCity.stream().filter(productsByCategory::contains).collect(Collectors.toList());
    }

    /* FILTRADO POR CIUDAD, FECHAS Y CATEGORIA */
    @Override
    public List<ProductDTO> findAllByCityDatesAndCategory(Integer cityId, Date startDate, Date endDate, String categoryName) throws BadRequestException, FindByIdException {
        logger.debug("Iniciando método buscar productos por ciudad, fechas y categoría");
        List<ProductDTO> productsByCity = findAllByCity(cityId);
        List<ProductDTO> productsByDates = findAllByDates(startDate, endDate);
        List<ProductDTO> productsByCategory = findAllByCategory(categoryName);
        List<ProductDTO> primerFiltrado = productsByCity.stream().filter(productsByDates::contains).collect(Collectors.toList());
        logger.debug("Terminó la ejecución del método buscar productos por ciudad, fechas y categoría");
        return primerFiltrado.stream().filter(productsByCategory::contains).collect(Collectors.toList());
    }

    /* HANDLE FILTER DE PRODUCTOS */
    public List<ProductDTO> handleFilter(FilterDTO filterDto) throws FindByIdException, BadRequestException {
        logger.debug("Iniciando método manejar el filtrado de productos");
        List<ProductDTO> result;
        Integer cityId = filterDto.getCityId();
        Date startDate = filterDto.getStartDate();
        Date endDate = filterDto.getEndDate();
        String categoryName = filterDto.getCategory();
        if (cityId == null && startDate == null && endDate == null && Objects.equals(categoryName, "All")) {
            result = findRecommendations();
        } else if (cityId == null && startDate == null && endDate == null && !Objects.equals(categoryName, "All")) {
            result = findAllByCategory(categoryName);
        } else if (cityId == null && startDate != null && endDate != null && Objects.equals(categoryName, "All")) {
            result = findAllByDates(startDate, endDate);
        } else if (cityId != null && startDate == null && endDate == null && Objects.equals(categoryName, "All")) {
            result = findAllByCity(cityId);
        } else if (cityId != null && startDate != null && endDate != null && Objects.equals(categoryName, "All")) {
            result = findAllByCityAndDates(cityId, startDate, endDate);
        } else if (cityId == null && startDate != null && endDate != null && !Objects.equals(categoryName, "All")) {
            result = findAllByDatesAndCategory(startDate, endDate, categoryName);
        } else if (cityId != null && startDate == null && endDate == null && !Objects.equals(categoryName, "All")) {
            result = findAllByCityAndCategory(cityId, categoryName);
        } else {
            result = findAllByCityDatesAndCategory(cityId,startDate,endDate,categoryName);
        }
        logger.debug("Terminó la ejecución del método manejar el filtrado de productos");
        return result;
    }

    public List<ProductDTO> findRecommendations() throws FindByIdException {
        logger.debug("Iniciando método buscar productos recomendados");
        List<ProductDTO> recommendedProducts = new ArrayList<>();
        productRepository.findAll().forEach(p -> {
            p.setQualification(scoreService.average(p.getId()));
            productRepository.save(p);
        });
        for (Product product : productRepository.findFirst12ByOrderByQualificationDesc()) {
            if (!product.isDeleted()) {
                recommendedProducts.add(loadDataIntoProductDTO(product));
            }
        }
        logger.debug("Terminó la ejecución del método buscar productos recomendados");
        return recommendedProducts;
    }

    public void updateQualification(Integer productId, double newQualification) throws FindByIdException {
        logger.debug("Iniciando método actualizar calificación de producto");
        if (!productRepository.existsById(productId) || productRepository.findById(productId).get().isDeleted()) {
            throw new FindByIdException("No existe un producto con el id ingresado");
        }
        Product product = productRepository.findById(productId).get();
        product.setQualification(newQualification);
        productRepository.save(product);
        logger.debug("Terminó la ejecución del método actualizar calificación de producto");
    }
}
