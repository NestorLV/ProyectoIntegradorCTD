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

    public ScoreDTO() {
    }

    public ScoreDTO(Integer score, String userEmail, Integer productId) {
        this.score = score;
        this.userEmail = userEmail;
        this.productId = productId;
    }

    public ScoreDTO(Integer idScore, Integer score, String userEmail, Integer productId) {
        this.idScore = idScore;
        this.score = score;
        this.userEmail = userEmail;
        this.productId = productId;
    }

    public Score toEntity(){
        Score scoreEntity = new Score();
        scoreEntity.setScore(score);
        scoreEntity.setProduct(new Product(productId));
        return scoreEntity;
    }
}
