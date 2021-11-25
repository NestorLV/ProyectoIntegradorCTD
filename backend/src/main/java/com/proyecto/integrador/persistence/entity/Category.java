package com.proyecto.integrador.persistence.entity;
import com.proyecto.integrador.DTO.CategoryDTO;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "category")
public class Category {
    @Id
    @Column(name = "idCategory", nullable = false)
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "description", nullable = false)
    private String description;
    @Column(name = "url", nullable = false)
    private String url;
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private Set<Product> products;

    public Category() {
    }

    public Category(Integer id) {
        this.id = id;
    }

    public Category(Integer id, String title, String description, String url) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.url = url;
        this.products = new HashSet<>();
    }

    public CategoryDTO toDto() {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(id);
        categoryDTO.setTitle(title);
        categoryDTO.setDescription(description);
        categoryDTO.setUrl(url);
        return categoryDTO;
    }
}

