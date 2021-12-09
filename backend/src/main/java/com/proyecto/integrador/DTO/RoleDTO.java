package com.proyecto.integrador.DTO;

import com.proyecto.integrador.persistence.entity.Role;
import com.proyecto.integrador.persistence.entity.enums.RolesTypes;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class RoleDTO {
    private Integer id;
    private RolesTypes name;
    private Set<UserRequestDTO> users = new HashSet<>();

    public RoleDTO() {
    }

    public RoleDTO(RolesTypes name) {
        this.name = name;
    }

    public Role toEntity(){
        Role role = new Role();
        role.setId(id);
        role.setName(name);
        return role;
    }
}
