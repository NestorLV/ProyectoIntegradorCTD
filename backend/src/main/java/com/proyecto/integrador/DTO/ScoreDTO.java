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
    private Boolean favourite;

    public ScoreDTO() {
    }

    public ScoreDTO(Integer score, String userEmail, Integer productId, Boolean favourite) {
        this.score = score;
        this.userEmail = userEmail;
        this.productId = productId;
        this.favourite = favourite;
    }

    public ScoreDTO(String userEmail, Integer productId, Boolean favourite) {
        this.userEmail = userEmail;
        this.productId = productId;
        this.favourite = favourite;
    }

    public Score toEntity(){
        Score scoreEntity = new Score();
        scoreEntity.setScore(score);
        scoreEntity.setProduct(new Product(productId));
        scoreEntity.setFavourite(favourite);
        return scoreEntity;
    }
}
