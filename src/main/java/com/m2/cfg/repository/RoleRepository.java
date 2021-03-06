package com.m2.cfg.repository;

import com.m2.cfg.domain.Authorities;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository
    extends CrudRepository<Authorities, String>
{
}
