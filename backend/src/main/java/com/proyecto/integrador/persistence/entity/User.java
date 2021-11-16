package com.proyecto.integrador.persistence.entity;


import com.proyecto.integrador.DTO.UserDTO;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "user")
public class User {
    @Id
    @Column(name = "idUser", nullable = false)
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "userName", nullable = false)
    private String name;
    @Column(name = "userSurname", nullable =false)
    private String surname;
    @Column(name = "userEmail", nullable = false)
    private String email;
    @Column(name = "password", nullable = false)
    private String password;
    @ManyToOne
    @JoinColumn(name = "idRole", nullable = false)
    private Role role;

    public UserDTO toDto(){
        UserDTO userDTO = new UserDTO();
        userDTO.setId(id);
        userDTO.setName(name);
        userDTO.setSurname(surname);
        userDTO.setEmail(email);
        userDTO.setPassword(password);
        userDTO.setRole(role.toString());
        return userDTO;
    }
}
