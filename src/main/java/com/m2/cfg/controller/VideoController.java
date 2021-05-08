package com.m2.cfg.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class VideoController {
    @RequestMapping("/video/*")
    public String welcome() {
        return "video";
    }

}
