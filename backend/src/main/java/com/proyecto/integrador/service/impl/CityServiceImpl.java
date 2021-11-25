package com.proyecto.integrador.service.impl;

import com.proyecto.integrador.DTO.CityDTO;
import com.proyecto.integrador.persistence.entity.City;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.persistence.repository.ICityRepository;
import com.proyecto.integrador.service.ICityService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CityServiceImpl implements ICityService {
    private final Logger logger = Logger.getLogger(CityServiceImpl.class);
    // config de log
    // Revisar test postman con update

    @Autowired
    ICityRepository cityRepository;

    @Override
    public List<CityDTO> findAll() {
        logger.debug("Iniciando método buscar todas las ciudades");
        List<CityDTO> cities = new ArrayList<>();
        for (City c: cityRepository.findAll()) {
            cities.add(c.toDto());
        }
        logger.debug("Terminó la ejecución del método buscar todas las ciudades");
        return cities;
    }

    @Override
    public CityDTO save(CityDTO city) {
        logger.debug("Iniciando método guardar ciudad");
        logger.debug("Terminó la ejecución del método guardar ciudad");
        return Optional.of(cityRepository.save(city.toEntity())).get().toDto();
    }

    @Override
    public CityDTO findById(Integer cityId) throws FindByIdException {
        logger.debug("Iniciando método buscar ciudad por ID");
        if (!cityRepository.existsById(cityId)) {
            throw new FindByIdException("No existe una ciudad con el id ingresado");
        }
        logger.debug("Terminó la ejecución del método buscar ciudad por ID");
        return cityRepository.findById(cityId).get().toDto();
    }

    @Override
    public void deleteById(Integer cityId) throws FindByIdException {
        logger.debug("Iniciando método eliminar ciudad por ID");
        if (!cityRepository.existsById(cityId)) {
            throw new FindByIdException("No existe una ciudad con el id ingresado");
        }
        logger.debug("Terminó la ejecución del método eliminar ciudad por ID");
        cityRepository.deleteById(cityId);
    }

    @Override
    public CityDTO update(CityDTO cityDTO) throws FindByIdException {
        logger.debug("Iniciando método actualizar ciudad por ID");
        if (!cityRepository.existsById(cityDTO.getId())) {
            throw new FindByIdException("No existe una ciudad con el id ingresado");
        }
        City city = cityRepository.findById(cityDTO.getId()).get();
        city.setName(cityDTO.getName());
        city.setCountry(cityDTO.getCountry());

        logger.debug("Terminó la ejecución del método actualizar ciudad por ID");
        return cityRepository.save(city).toDto();
    }

    public boolean cityExistsInDatabase(Integer id) {
        logger.debug("Iniciando método corroborando si existe ciudad en la base de datos");
        logger.debug("Terminó la ejecución del método corroborando si existe la ciudad en la base de datos");
        return cityRepository.findById(id).isPresent();
    }
}