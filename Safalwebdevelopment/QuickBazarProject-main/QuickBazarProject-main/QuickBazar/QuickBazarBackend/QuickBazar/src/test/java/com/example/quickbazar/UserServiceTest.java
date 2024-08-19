package com.example.quickbazar;

import com.example.quickbazar.Entity.User;
import com.example.quickbazar.Pojo.UserPojo;
import com.example.quickbazar.Repo.UserRepo;
import com.example.quickbazar.Service.Impl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class UserServiceTest {

    @Mock
    private UserRepo userRepo;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    public void testCreateUser() {
        // Prepare data
        UserPojo userPojo = new UserPojo();
        userPojo.setEmail("test@example.com");
        userPojo.setPassword("password");
        userPojo.setFullName("Test User");
        userPojo.setSecurityQuestion("What is your pet's name?");
        userPojo.setConfirmPassword("password");

        User user = new User();
        user.setId(1L);
        user.setEmail(userPojo.getEmail());
        user.setPassword(userPojo.getPassword());
        user.setFullName(userPojo.getFullName());
        user.setSecurityQuestion(userPojo.getSecurityQuestion());
        user.setRoles("USER");

        // Mock repository method
        when(userRepo.save(any(User.class))).thenReturn(user);

        // Call the service method
        User createdUser = userService.createUser(userPojo);

        // Verify interactions
        assertNotNull(createdUser);
        assertEquals(userPojo.getEmail(), createdUser.getEmail());
        assertEquals(userPojo.getPassword(), createdUser.getPassword());
        assertEquals(userPojo.getFullName(), createdUser.getFullName());
        assertEquals(userPojo.getSecurityQuestion(), createdUser.getSecurityQuestion());
        assertEquals("USER", createdUser.getRoles());
        verify(userRepo, times(1)).save(any(User.class));

        System.out.println("Test 'testCreateUser' was successful!");
    }

    @Test
    public void testLoginUser_ValidCredentials() {
        // Prepare data
        String email = "test@example.com";
        String password = "password";
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);

        // Mock repository method
        when(userRepo.findByEmail(email)).thenReturn(Optional.of(user));

        // Call the service method
        User loginUser = userService.loginUser(email, password);

        // Verify interactions
        assertNotNull(loginUser);
        assertEquals(email, loginUser.getEmail());
        assertEquals(password, loginUser.getPassword());
        verify(userRepo, times(1)).findByEmail(email);

        System.out.println("Test 'testLoginUser_ValidCredentials' was successful!");
    }

    @Test
    public void testLoginUser_InvalidCredentials() {
        // Prepare data
        String email = "test@example.com";
        String password = "password";

        // Mock repository method
        when(userRepo.findByEmail(email)).thenReturn(Optional.empty());

        // Call the service method and assert for exception
        assertThrows(IllegalArgumentException.class, () -> userService.loginUser(email, password));

        // Verify interactions
        verify(userRepo, times(1)).findByEmail(email);

        System.out.println("Test 'testLoginUser_InvalidCredentials' was successful!");
    }

}

