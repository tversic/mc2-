package com.m2.cfg.repository;

import com.m2.cfg.domain.Tag;
import org.springframework.data.repository.CrudRepository;

public interface TagRepository
    extends CrudRepository<Tag, Integer>
{
}
