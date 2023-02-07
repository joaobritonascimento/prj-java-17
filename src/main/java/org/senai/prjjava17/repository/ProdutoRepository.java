package org.senai.prjjava17.repository;

import org.senai.prjjava17.entity.Produto;
import org.springframework.data.repository.CrudRepository;

public interface ProdutoRepository extends CrudRepository<Produto,Integer>{
    
}

