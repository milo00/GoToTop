package com.example.GoToTop.services;

import com.example.GoToTop.Repositories.MountainAreaRepository;
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
        Optional<MountainArea> mountainAreaById = mountainAreaRepository.findById(mountainArea.getId());
        if (mountainAreaById.isPresent()) {
            throw new IllegalStateException("email taken");
        }
        mountainAreaRepository.save(mountainArea);
    }

    public void deleteMountainArea(Long id) {
        Optional<MountainArea> mountainAreaById = mountainAreaRepository.findById(id);
        if (mountainAreaById.isEmpty()) {
            throw new IllegalStateException("student does not exist");
        }
        mountainAreaRepository.delete(mountainAreaById.get());
    }

    @Transactional
    public void updateMountainArea(){

    }




}
