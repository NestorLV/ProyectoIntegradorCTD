package com.proyecto.integrador.service;


import com.proyecto.integrador.DTO.ScoreDTO;
import com.proyecto.integrador.exceptions.BadRequestException;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.persistence.entity.Score;


import java.util.List;
import java.util.Set;

public interface IScoreService {
    List<ScoreDTO> findAll() throws FindByIdException;
    ScoreDTO save(ScoreDTO scores) throws FindByIdException, BadRequestException;
    ScoreDTO findById(Integer idScores) throws FindByIdException;
    void deleteById(Integer idScores) throws FindByIdException;
    ScoreDTO update(ScoreDTO scores) throws FindByIdException;
    Set<ScoreDTO> findAllByIdProduct(Integer idProduct)throws FindByIdException;
    ScoreDTO findByUserAndProduct(String email, Integer idProduct) throws FindByIdException, BadRequestException;
    ScoreDTO resetScore(String email, Integer idProduct) throws FindByIdException, BadRequestException;
    Double average(Integer idProduct);
}
