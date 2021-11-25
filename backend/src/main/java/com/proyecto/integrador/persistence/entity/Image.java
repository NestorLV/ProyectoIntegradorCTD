package com.proyecto.integrador.persistence.entity;

import com.proyecto.integrador.DTO.ImageDTO;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="image")
public class Image {
    @Id
    @Column(name="idImage")
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name="title", nullable = false)
    private String title;
    @Column(name="url", nullable = false, length = 2000)
    private String url;
    @ManyToOne
    @JoinColumn(name = "idProduct", nullable = false)
    private Product product;

    public Image() {
    }

    public Image(Integer id, String title, String url, Product product) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.product = product;
    }

    public ImageDTO toDto() {
        ImageDTO imageDTO = new ImageDTO();
        imageDTO.setId(id);
        imageDTO.setTitle(title);
        imageDTO.setUrl(url);
        imageDTO.setProductId(product.getId());
        return imageDTO;
    }
}
