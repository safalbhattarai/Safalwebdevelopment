package com.example.quickbazar;

import com.example.quickbazar.Entity.User;
import com.example.quickbazar.Repo.UserRepo;
import com.example.quickbazar.Service.UserService;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import lombok.extern.log4j.Log4j2;
import org.junit.Assert;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@Log4j2
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class UserStepDefinitions {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepo userRepo;

    @Given("getAllData User")
    public void getAllData() {
        List<User> allUsers = userService.getAllData();
        log.info(allUsers);
        Assert.assertTrue(!allUsers.isEmpty());
    }

    @Given("getUserById User")
    public void getUserById() {
        userService.getUserById(6L);
        System.out.println("User Fetched Successfully!");
    }



}
