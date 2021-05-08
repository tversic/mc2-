package com.m2.cfg.repository;

import com.m2.cfg.domain.Tema;
import org.springframework.data.repository.CrudRepository;

public interface TemaRepository
    extends CrudRepository<Tema, Integer>
{
}
