package com.proyecto.integrador.util;
import com.proyecto.integrador.persistence.entity.Role;
import com.proyecto.integrador.persistence.entity.User;
import com.proyecto.integrador.persistence.entity.enums.RolesTypes;
import com.proyecto.integrador.persistence.repository.IRoleRepository;
import com.proyecto.integrador.persistence.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class DataLoader implements ApplicationRunner {
    private final IUserRepository userRepository;
    private final IRoleRepository roleRepository;

    @Autowired
    public DataLoader(IUserRepository userRepository, IRoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String password = passwordEncoder.encode("admin");
        /*Role admin = roleRepository.save(new Role(RolesTypes.ADMIN));
        userRepository.save(new User("grupo1","admin","admin@digital.com",password,admin));*/
    }
}
