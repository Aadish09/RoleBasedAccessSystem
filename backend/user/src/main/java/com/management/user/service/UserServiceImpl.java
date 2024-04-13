package com.management.user.service;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.management.user.dao.RoleRepository;
import com.management.user.dao.UserRepository;
import com.management.user.entity.Role;
import com.management.user.entity.User;
import com.management.user.exception.CustomException;
import com.management.user.exception.ResourceNotFoundException;
import com.management.user.model.UserPayload;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    } 

    @Override
    public User getUserById(Long id) {
        Optional<User> res = this.userRepository.findById(id);
        if(res.isPresent()) {
            return res.get();
        }
        throw new ResourceNotFoundException("User not found with id " + id);
    } 

    @Override
    public Long addUser(UserPayload userPayload) {
        try {
            validatePayload(userPayload);
            User user  = User.builder().firstName(userPayload.getFirstName())
                            .lastName(userPayload.getLastName())
                            .dob(userPayload.getDob())
                            .password(encrytpedPass(userPayload.getPassword()))
                            .username(userPayload.getUsername())
                            .build();
            Set<Role> roles = new HashSet<>();
            for (String roleName : userPayload.getRoles()) {
                Role role = roleRepository.findByName(roleName);
                roles.add(role);
            }
            user.setRoles(roles);
            user.setCreationDate(new Date().toString());  
            User createdUser  = this.userRepository.save(user);
            return createdUser.getId();
        } catch(Exception e) {
            if(e instanceof DataIntegrityViolationException) {
                throw new CustomException(userPayload.getUsername() + " already exists. Please try something else.");
            }
            if(e instanceof CustomException) {
                throw e;
            }
        }
        return null;
    } 

    @Override
    public Long updateUser(UserPayload userPayload) {
        validatePayload(userPayload);
        Optional<User> userPresent = this.userRepository.findByUsername(userPayload.getUsername());
        if(userPresent.isPresent()) {
            User user = userPresent.get();
            user.setDob(userPayload.getDob());
            user.setFirstName(userPayload.getFirstName());
            user.setLastName(userPayload.getLastName());
            Set<Role> roles = new HashSet<>();
            for (String roleName : userPayload.getRoles()) {
                Role role = roleRepository.findByName(roleName);
                roles.add(role);
            }
            user.setRoles(roles);  
            User createdUser  = this.userRepository.save(user);
            return createdUser.getId();
        }
        return null;
    } 

    private String encrytpedPass(String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.encode(password);
    }

    private void validatePayload(UserPayload userPayload) throws CustomException{
        if(userPayload.getUsername().length()<3) {
            throw new CustomException("UserName too short.");
        }
        if(userPayload.getPassword()!=null && userPayload.getPassword().length()<5) {
            throw new CustomException("Password too short.");
        }
    }

    @Override
    public User getUserByUsername(String username) {
        Optional<User> res = this.userRepository.findByUsername(username);
        if(res.isPresent()) {
            return res.get();
        }
        throw new ResourceNotFoundException("User not found with username " + username);
    }

    public Long deleteUser(Long id) {
        userRepository.deleteById(id);
        return id;
    }

}
