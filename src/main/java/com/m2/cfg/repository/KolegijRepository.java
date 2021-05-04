package com.m2.cfg.repository;

import com.m2.cfg.domain.Kolegij;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KolegijRepository
    extends CrudRepository<Kolegij, Integer>
{
}
