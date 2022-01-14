package com.example.GoToTop.services;

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

    public List<MountainArea> getMountainArea() {
        return mountainAreaRepository.findAll();
    }

    public void addNewMountainArea(MountainArea mountainArea) {
        Optional<MountainArea> mountainAreaByName = mountainAreaRepository.findAreaByName(mountainArea.getName());
        if (mountainAreaByName.isPresent()) {
            throw new IllegalStateException("area with given name already exist");
        }
        mountainAreaRepository.save(mountainArea);
    }

    public void deleteMountainArea(Long id) {
        Optional<MountainArea> mountainAreaById = mountainAreaRepository.findById(id);
        if (mountainAreaById.isEmpty()) {
            throw new IllegalStateException("area does not exist");
        }
        mountainAreaRepository.delete(mountainAreaById.get());
    }

    @Transactional
    public void updateMountainArea(Long id, String name) {
        Optional<MountainArea> mountainAreaById = mountainAreaRepository.findById(id);
        if (mountainAreaById.isEmpty()) {
            throw new IllegalStateException("area does not exist");
        } else {

            MountainArea mountainAreaToUpdate = mountainAreaById.get();
            if (name != null && !name.equals(mountainAreaToUpdate.getName()) && name.length() > 0) {
                Optional<MountainArea> mountainAreaByName = mountainAreaRepository.findAreaByName(name);
                if (mountainAreaByName.isPresent()) {
                    throw new IllegalStateException("area with given name already exist");
                }
                mountainAreaToUpdate.setName(name);
            }

        }


    }


}
