package com.proyecto.integrador.persistence.entity;


import com.proyecto.integrador.DTO.ScoreDTO;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Check;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "score")
@Check(constraints = "score >= 1 && score <= 5")
public class Score {
    @Id
    @Column(name = "idScores", nullable = false)
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer idScores;
    @Column(name = "idUser", nullable = false)
    private Integer idUser;
    @Column(name = "score", nullable = false)
    private Integer score;
    @Column(name = "favorite", nullable = false)
    private Boolean favorite;

    @ManyToOne
    @JoinColumn(name = "idProduct", nullable = false)
    private Product product;

    public ScoreDTO toDto(){
        ScoreDTO scoreDTO = new ScoreDTO();
        scoreDTO.setIdScores(idScores);
        scoreDTO.setIdUser(idUser);
        scoreDTO.setScore(score);
        scoreDTO.setFavorite(favorite);
        return scoreDTO;
    }
}
