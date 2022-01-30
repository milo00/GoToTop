package com.example.GoToTop.services;

import com.example.GoToTop.exceptions.MountainAreaAlreadyExistsException;
import com.example.GoToTop.model.MountainArea;
import com.example.GoToTop.repositories.MountainAreaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class MountainAreaServiceTest {

    @Mock
    private MountainAreaRepository mountainAreaRepository;

    private MountainAreaService underTest;

    @BeforeEach
    void setUp() {
        underTest = new MountainAreaService(mountainAreaRepository);
    }

    @Test
    void getMountainAreaTest() {

        underTest.getMountainArea();
        verify(mountainAreaRepository).findAreas();

    }

    @Test
    void addNewMountainAreaTest() {

        MountainArea mountainArea = new MountainArea("Tatry Wysokie");

        underTest.addNewMountainArea(mountainArea);


        ArgumentCaptor<MountainArea> mountainAreaArgumentCaptor =
                ArgumentCaptor.forClass(MountainArea.class);

        verify(mountainAreaRepository)
                .save(mountainAreaArgumentCaptor.capture());

        MountainArea capturedStudent = mountainAreaArgumentCaptor.getValue();

        assertThat(capturedStudent).isEqualTo(mountainArea);
    }

    @Test
    void willThrowWhenNameIsTaken() {

        MountainArea mountainArea = new MountainArea("Tatry Wysokie");

        given(mountainAreaRepository.findByName(anyString())).willReturn(Optional.of(mountainArea));

        assertThatThrownBy(() -> underTest.addNewMountainArea(mountainArea))
                .isInstanceOf(MountainAreaAlreadyExistsException.class)
                .hasMessageContaining("area with name: " + mountainArea.getName() + " already exist");

        verify(mountainAreaRepository, never()).save(any());

    }

    @Test
    void getMountainAreaByName() {
        String name = "Tatry Wielkie";
        underTest.getMountainAreaByName(name);
        verify(mountainAreaRepository).findByName(name);
    }
}