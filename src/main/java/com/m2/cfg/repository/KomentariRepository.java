package com.m2.cfg.repository;

import com.m2.cfg.domain.Komentari;
import com.m2.cfg.domain.Tema;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface KomentariRepository
        extends CrudRepository<Komentari, Integer>
{

}
