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
    @Column(name = "idScore", nullable = false)
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer idScore;
    @Column(name = "idUser")
    private Integer idUser;
    @Column(name = "score")
    private Integer score;
    // Revisar si esto tiene sentido que esté acá! Capaz no es necesario este atributo de fav acá porque ya está en producto
    @Column(name = "favourite")
    private Boolean favourite = false;
    @ManyToOne
    @JoinColumn(name = "idProduct")
    private Product product;

    public ScoreDTO toDto(){
        ScoreDTO scoreDTO = new ScoreDTO();
        scoreDTO.setIdScore(idScore);
        scoreDTO.setScore(score);
        scoreDTO.setProductId(product.getId());
        return scoreDTO;
    }
}
