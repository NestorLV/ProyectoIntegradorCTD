package com.proyecto.integrador.persistence.entity;

import com.proyecto.integrador.DTO.RoleDTO;
import com.proyecto.integrador.persistence.entity.enums.RolesTypes;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

@Entity
@Getter
@Setter
@Table
public class Role {
    @Id
    @Column(name = "idRole", nullable = false)
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "name", nullable = false)
    private RolesTypes name;
    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
    private Set<User> users;

    public Role() {
    }

    public Role(RolesTypes name) {
        this.name = name;
    }

    public RoleDTO toDto(){
        RoleDTO roleDTO = new RoleDTO();
        roleDTO.setId(id);
        roleDTO.setName(name);
        return roleDTO;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Role)) return false;
        Role role = (Role) o;
        return getName() == role.getName();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getName());
    }
}
