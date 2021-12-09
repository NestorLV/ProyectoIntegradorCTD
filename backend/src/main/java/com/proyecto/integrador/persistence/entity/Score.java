package com.proyecto.integrador.persistence.entity;


import com.proyecto.integrador.DTO.ScoreDTO;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Check;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Getter
@Setter
@Table(name = "score")
@Check(constraints = "score >= 1 && score <= 5")
public class Score {
    @Id
    @Column(name = "idScore", nullable = false)
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer idScore;
    @Column(name = "idUser", nullable = false)
    private Integer idUser;
    @Column(name = "score", nullable = false)
    private Integer score;
    @ManyToOne
    @JoinColumn(name = "idProduct", nullable = false)
    private Product product;

    public ScoreDTO toDto(){
        ScoreDTO scoreDTO = new ScoreDTO();
        scoreDTO.setIdScore(idScore);
        scoreDTO.setScore(score);
        scoreDTO.setProductId(product.getId());
        return scoreDTO;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Score)) return false;
        Score score = (Score) o;
        return getIdUser().equals(score.getIdUser()) && getProduct().equals(score.getProduct());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getIdUser(), getProduct());
    }
}
