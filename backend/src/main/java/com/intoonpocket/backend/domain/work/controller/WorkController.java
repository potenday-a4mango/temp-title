package com.intoonpocket.backend.domain.work.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class WorkController{
    @GetMapping
    public ResponseEntity<String> infraTest() {
        return new ResponseEntity<String>("Hello World", HttpStatus.OK);
    }
}