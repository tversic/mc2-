package com.m2.cfg.repository;

import com.m2.cfg.domain.Fakultet;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FakultetRepostiroy
    extends CrudRepository<Fakultet, Integer>
{
    Fakultet findByNaziv(String naziv);
    Optional<Fakultet> findById(Integer id);
}
