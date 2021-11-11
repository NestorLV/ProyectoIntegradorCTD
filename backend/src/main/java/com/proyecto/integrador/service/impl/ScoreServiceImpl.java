package com.proyecto.integrador.service.impl;


import com.proyecto.integrador.DTO.ScoreDTO;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.persistence.entity.Score;
import com.proyecto.integrador.persistence.repository.IScoreRepository;
import com.proyecto.integrador.service.IScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.log4j.Logger;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ScoreServiceImpl implements IScoreService {
    private final Logger logger = Logger.getLogger(ScoreServiceImpl.class);
    @Autowired
    IScoreRepository scoresRepository;

    public Integer average(Integer idProduct) {
        logger.debug("Iniciando método promedio de todas las puntuaciones");

        List<Score> scores = scoresRepository.findByProductId(idProduct);
        int totalScore = 0;
        if(scores != null && scores.size()!=0) {
            for (Score score : scores) {
                totalScore += score.getScore();
            }

            return (totalScore / scores.size());
        }else{
            return 0;
        }
    }
    @Override
    public List<ScoreDTO> findAll() throws FindByIdException {
        logger.debug("Iniciando método buscar todas las puntuaciones");
        List<ScoreDTO> scoresList = new ArrayList<>();
        for (Score score: scoresRepository.findAll()) {
            scoresList.add(score.toDto());
        }
        logger.debug("Terminó la ejecución del método buscar todas las puntuaciones");
        return scoresList;
    }

    @Override
    public ScoreDTO save(ScoreDTO scores) throws FindByIdException {
        logger.debug("Iniciando método guardar puntuación");
        Score newScore = scoresRepository.save(scores.toEntity());
        logger.debug("Terminó la ejecución del método guardar puntuación");
        return newScore.toDto();
    }

    @Override
    public ScoreDTO findById(Integer idScores) throws FindByIdException {
        logger.debug("Iniciando método buscar producto por ID");
        if (!scoresRepository.existsById(idScores)) {
            throw new FindByIdException("No existe una puntuación con el id ingresado");
        }
        Score foundScore = scoresRepository.findById(idScores).get();
        logger.debug("Terminó la ejecución del método buscar puntuación por ID");
        return foundScore.toDto();
    }

    @Override
    public void deleteById(Integer idScores) throws FindByIdException {
        logger.debug("Iniciando método eliminar puntuación por ID");
        if (!scoresRepository.existsById(idScores)) {
            throw new FindByIdException("No existe una puntuación con el id ingresado");
        }
        logger.debug("Terminó la ejecución del método eliminar puntuación por ID");
        scoresRepository.deleteById(idScores);
    }

    @Override
    public ScoreDTO update(ScoreDTO scores) throws FindByIdException {
        logger.debug("Iniciando método actualizar producto");
        if (!scoresRepository.existsById(scores.getIdScores())) {
            throw new FindByIdException("No existe una puntuación con el id ingresado");
        }
        Score score1 = scoresRepository.findById(scores.getIdScores()).get();
        score1.setIdUser(scores.getIdUser());
        score1.setScore(scores.getScore());
        score1.setFavorite(scores.getFavorite());
        logger.debug("Terminó la ejecución del método actualizar puntuación");
        return score1.toDto();
    }

    @Override
    public Set<ScoreDTO> findAllByIdProduct(Integer idProduct) {
        return scoresRepository.findByProductId(idProduct).stream().map(Score::toDto).collect(Collectors.toSet());
    }
}
