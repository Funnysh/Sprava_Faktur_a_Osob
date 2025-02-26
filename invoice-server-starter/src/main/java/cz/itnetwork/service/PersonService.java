package cz.itnetwork.service;

import cz.itnetwork.dto.PersonDTO;

import java.util.List;

public interface PersonService {

    PersonDTO addPerson(PersonDTO personDTO);

    PersonDTO getPerson(long id);

    PersonDTO editPerson(long id, PersonDTO personDTO);

    void removePerson(long id);

    List<PersonDTO> getAll();

}
