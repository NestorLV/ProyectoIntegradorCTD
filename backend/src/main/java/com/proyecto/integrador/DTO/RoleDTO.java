package com.proyecto.integrador.DTO;

import com.proyecto.integrador.persistence.entity.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoleDTO {
    private Integer id;
    private String name;

    public RoleDTO() {
    }

    public RoleDTO(Integer id) {
        this.id = id;
    }

    public Role toEntity(){
        Role role = new Role();
        role.setId(id);
        role.setName(name);
        return role;
    }
}
