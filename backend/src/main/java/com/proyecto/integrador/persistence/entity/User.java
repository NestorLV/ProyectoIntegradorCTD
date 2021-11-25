package com.proyecto.integrador.persistence.entity;
import com.proyecto.integrador.DTO.UserRequestDTO;
import com.proyecto.integrador.DTO.UserResponseDTO;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.*;

@Entity
@Getter
@Setter
@Table(name = "user")
public class User implements UserDetails {
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
    @Column(name = "activation", nullable = false)
    private boolean activation;

    @ManyToOne
    @JoinColumn(name = "idRole", nullable = false)
    private Role role;

    public User() {}

    public User(String name, String surname, String email, String password,boolean activation,Role role) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.activation= activation;
    }

    public User(Integer id) {
        this.id = id;
    }

    public User(String nombre, String apellido, String s, String password2, Role user) {
    }

    public UserResponseDTO toDto(){
        UserResponseDTO userResponseDTO = new UserResponseDTO();
        userResponseDTO.setId(id);
        userResponseDTO.setName(name);
        userResponseDTO.setSurname(surname);
        userResponseDTO.setEmail(email);
        userResponseDTO.setActivation(activation);
        return userResponseDTO;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority grantedAuthority = new SimpleGrantedAuthority(role.getName().name());
        return Collections.singletonList(grantedAuthority);
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        User user = (User) o;
        return getId().equals(user.getId()) && getName().equals(user.getName()) && getSurname().equals(user.getSurname()) && getEmail().equals(user.getEmail());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getSurname(), getEmail());
    }
}
