package com.example.GoToTop.services;

import com.example.GoToTop.exceptions.MountainAreaAlreadyExistsException;
import com.example.GoToTop.exceptions.MountainAreaNotFoundException;
import com.example.GoToTop.model.projection.MountainAreaProjection;
import com.example.GoToTop.repositories.MountainAreaRepository;
import com.example.GoToTop.model.MountainArea;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class MountainAreaService {

    private final MountainAreaRepository mountainAreaRepository;

    public MountainAreaService(MountainAreaRepository mountainAreaRepository) {
        this.mountainAreaRepository = mountainAreaRepository;
    }

    public List<MountainAreaProjection> getMountainArea() {
        return mountainAreaRepository.findAreas();
    }

    public void addNewMountainArea(MountainArea mountainArea) {
        Optional<MountainArea> mountainAreaByName = mountainAreaRepository.findByName(mountainArea.getName());
        if (mountainAreaByName.isPresent()) {
            throw new MountainAreaAlreadyExistsException("area with name: " + mountainArea.getName() + " already exist");
        }
        mountainAreaRepository.save(mountainArea);
    }

    public void deleteMountainArea(Long id) {
        Optional<MountainArea> mountainAreaById = mountainAreaRepository.findById(id);
        if (mountainAreaById.isEmpty()) {
            throw new MountainAreaNotFoundException("Area does not exist");
        }
        mountainAreaRepository.delete(mountainAreaById.get());
    }

    public Optional<MountainArea> getMountainAreaByName(String name) {
        return mountainAreaRepository.findByName(name);
    }


    @Transactional
    public void updateMountainArea(Long id, String name) {
        Optional<MountainArea> mountainAreaById = mountainAreaRepository.findById(id);
        if (mountainAreaById.isEmpty()) {
            throw new IllegalStateException("area does not exist");
        } else {

            MountainArea mountainAreaToUpdate = mountainAreaById.get();
            if (name != null && !name.equals(mountainAreaToUpdate.getName()) && name.length() > 0) {
                Optional<MountainArea> mountainAreaByName = mountainAreaRepository.findByName(name);
                if (mountainAreaByName.isPresent()) {
                    throw new IllegalStateException("area with given name already exist");
                }
                mountainAreaToUpdate.setName(name);
            }
        }
    }
}
