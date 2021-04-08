package com.m2.cfg.repository;

import com.m2.cfg.domain.Users;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository
        extends CrudRepository<Users, Integer> {
}
