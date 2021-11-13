package com.proyecto.integrador.DTO;


import com.proyecto.integrador.persistence.entity.Product;
import com.proyecto.integrador.persistence.entity.Score;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScoreDTO {
    private Integer idScore;
    private Integer score;
    private String userEmail;
    private Integer productId;

    public Score toEntity(){
        Score scoreEntity = new Score();
        scoreEntity.setScore(score);
        scoreEntity.setProduct(new Product(productId));
        return scoreEntity;
    }
}
