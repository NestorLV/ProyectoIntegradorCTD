package com.proyecto.integrador.persistence.entity;

import com.proyecto.integrador.DTO.RoleDTO;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@Table
public class Role {
    @Id
    @Column(name = "idRol", nullable = false)
    private Integer id;
    @Column(name = "idName", nullable = false)
    private String name;
    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
    private Set<User> users;

    public Role() {
    }

    public Role(String name) {
        this.name = name;
    }

    public RoleDTO toDto(){
        RoleDTO roleDTO = new RoleDTO();
        roleDTO.setId(id);
        roleDTO.setName(name);
        return roleDTO;
    }
}
