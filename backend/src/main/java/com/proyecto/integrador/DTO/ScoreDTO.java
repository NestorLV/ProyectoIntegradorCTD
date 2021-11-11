package com.proyecto.integrador.DTO;


import com.proyecto.integrador.persistence.entity.Score;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScoreDTO {
    private Integer idScores;
    private Integer idUser;
    private Integer score;
    private Boolean favorite;

    public Score toEntity(){
        Score score = new Score();
        score.setIdScores(idScores);
        score.setIdUser(idUser);
        score.setScore(this.score);
        score.setFavorite(favorite);
        return score;
    }
}
