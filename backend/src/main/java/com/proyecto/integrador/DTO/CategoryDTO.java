package com.proyecto.integrador.DTO;
import com.proyecto.integrador.persistence.entity.Category;
import lombok.Getter;
import lombok.Setter;

/*@JsonIgnoreProperties(ignoreUnknown = true)*/
@Getter
@Setter
public class CategoryDTO {
    private Integer id;
    private String title;
    private String description;
    private String url;

    public CategoryDTO() {
    }

    public CategoryDTO(Integer id) {
        this.id = id;
    }

    public CategoryDTO(String title, String description, String url) {
        this.title = title;
        this.description = description;
        this.url = url;
    }

    public CategoryDTO(Integer id, String title, String description, String url) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.url = url;
    }

    public Category toEntity() {
        Category category = new Category();
        category.setTitle(title);
        category.setDescription(description);
        category.setUrl(url);
        return category;
    }
}
