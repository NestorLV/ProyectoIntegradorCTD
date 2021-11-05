package com.proyecto.integrador.service.impl;

import com.proyecto.integrador.DTO.CategoryDTO;
import com.proyecto.integrador.DTO.ImageDTO;
import com.proyecto.integrador.DTO.ProductDTO;
import com.proyecto.integrador.entity.Category;
import com.proyecto.integrador.entity.City;
import com.proyecto.integrador.entity.Image;
import com.proyecto.integrador.entity.Product;
import com.proyecto.integrador.exceptions.BadRequestException;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.repository.ICategoryRepository;
import com.proyecto.integrador.repository.IProductRepository;
import com.proyecto.integrador.service.IProductService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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


    private Set<ImageDTO> findAssociatedImages(Integer productId) {
        Stream<ImageDTO> filterImages = imageService.findAll().stream().filter(image -> Objects.equals(image.getProductId(),productId));
        return filterImages.collect(Collectors.toSet());
    }

    private ProductDTO loadDataIntoProductDTO(Product product) throws FindByIdException {
        ProductDTO productDto = product.toDto();
        productDto.setCategory(categoryService.findById(product.getCategory().getId()));
        productDto.setCity(cityService.findById(product.getCity().getId()));
        productDto.setImages(findAssociatedImages(product.getId()));
        return productDto;
    }

    @Override
    public List<ProductDTO> findAll() throws FindByIdException {
        logger.debug("Iniciando método buscar todos los productos");
        List<ProductDTO> products = new ArrayList<>();
        for (Product product: productRepository.findAll()) {
            products.add(loadDataIntoProductDTO(product));
        }
        logger.debug("Terminó la ejecución del método buscar todos los productos");
        return products;
    }

    @Override
    public ProductDTO save(ProductDTO product) throws FindByIdException {
        logger.debug("Iniciando método guardar producto");
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
        product.setQualification(productDTO.getQualification());
        product.setFavourite(productDTO.isFavourite());
        product.setReference(productDTO.getReference());
        product.setCategory(new Category(productDTO.getCategory().getId()));
        product.setCity(new City(productDTO.getCity().getId()));
        logger.debug("Terminó la ejecución del método actualizar producto");
        return loadDataIntoProductDTO(product);
    }

    @Override
    public List<ProductDTO> findAllByCategory(String categoryName) throws BadRequestException, FindByIdException {
        logger.debug("Iniciando método buscar productos por categoría");
        if (!categoryService.categoryExistsInDatabase(categoryName)) {
            throw new BadRequestException("La categoría ingresada no existe en la base de datos");
        }
        List<ProductDTO> productsByCategory = new ArrayList<>();
        for (Product product: productRepository.findByCategory_Title(categoryName)) {
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
        for (Product product: productRepository.findByCity_Id(cityId)) {
            productsByCity.add(loadDataIntoProductDTO(product));
        }
        logger.debug("Terminó la ejecución del método buscar productos por ciudad");
        return productsByCity;
    }
}
