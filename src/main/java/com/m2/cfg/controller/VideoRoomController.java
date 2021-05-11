package com.m2.cfg.controller;

import com.m2.cfg.domain.Kolegij;
import com.m2.cfg.domain.Room;
import com.m2.cfg.repository.VideoRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VideoRoomController {

    @Autowired
    VideoRoomRepository VideoRooms;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/rooms")
    public ResponseEntity<?> getVideoRooms() throws Exception {
        Iterable<Room> VideoRooms = this.VideoRooms.findAll();
        return ResponseEntity.ok(VideoRooms);
    }
}
