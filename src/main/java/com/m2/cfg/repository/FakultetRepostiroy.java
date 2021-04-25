package com.m2.cfg.repository;

import com.m2.cfg.domain.Fakultet;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FakultetRepostiroy
    extends CrudRepository<Fakultet, Integer>
{
}
