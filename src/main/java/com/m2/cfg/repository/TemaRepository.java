package com.m2.cfg.repository;

import com.m2.cfg.domain.Tema;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface TemaRepository
    extends CrudRepository<Tema, Integer>
{
    Tema findByNaslov(String naslov);
    Optional<Tema> findById(Integer kolegij_id);
}
