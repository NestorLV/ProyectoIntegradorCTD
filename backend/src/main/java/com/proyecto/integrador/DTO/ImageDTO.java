package com.proyecto.integrador.DTO;

import com.proyecto.integrador.persistence.entity.Image;
import com.proyecto.integrador.persistence.entity.Product;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageDTO {
    private Integer id;
    private String title;
    private String url;
    private Integer productId;

    public ImageDTO() {
    }

    public ImageDTO(Integer id, String title, String url, Integer productId) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.productId = productId;
    }

    public ImageDTO(String title, String url, Integer productId) {
        this.title = title;
        this.url = url;
        this.productId = productId;
    }

    public Image toEntity() {
        Image image = new Image();
        image.setTitle(title);
        image.setUrl(url);
        image.setProduct(new Product(productId));
        return image;
    }
}
