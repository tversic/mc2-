package com.m2.cfg.repository;

import com.m2.cfg.domain.Room;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRoomRepository extends CrudRepository<Room,Integer>{
}
