package com.example.GoToTop.repositories;

import com.example.GoToTop.model.MountainArea;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;


@DataJpaTest
class MountainAreaRepositoryTest {

    @Autowired
    private MountainAreaRepository underTest;

    @AfterEach
    void tearDown() {
        underTest.deleteAll();
    }

    @Test
    void findMountainAreaByWithExistingNameTest() {

        String name = "Tatry Wysokie";
        MountainArea mountainArea = new MountainArea(name);
        underTest.save(mountainArea);

        Optional<MountainArea> expected = underTest.findByName(name);

        assertThat(expected).isPresent();
    }

    @Test
    void findMountainAreaByWithNotExistingNameTest() {

        String name = "Tatry Wysokie";

        Optional<MountainArea> expected = underTest.findByName(name);

        assertThat(expected).isEmpty();
    }

}