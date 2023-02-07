package org.senai.prjjava17.repository;

import org.senai.prjjava17.entity.Usuario;
import org.springframework.data.repository.CrudRepository;

public interface UsuarioRepository extends CrudRepository<Usuario, Integer> {
    
}
