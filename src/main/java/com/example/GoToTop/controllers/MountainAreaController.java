package com.example.GoToTop.controllers;

import com.example.GoToTop.model.MountainArea;
import com.example.GoToTop.model.projection.MountainAreaProjection;
import com.example.GoToTop.services.MountainAreaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/mountainArea")
@CrossOrigin("*")
public class MountainAreaController {

    private final MountainAreaService mountainAreaService;

    public MountainAreaController(MountainAreaService mountainAreaService){
        this.mountainAreaService = mountainAreaService;
    }

    @GetMapping
    public List<MountainAreaProjection> getMountainArea(){
        return mountainAreaService.getMountainArea();
    }

    @PostMapping
    public void registerNewMountainArea(@RequestBody MountainArea mountainArea){
        mountainAreaService.addNewMountainArea(mountainArea);
    }

    @DeleteMapping(path = "{mountainAreaId}")
    public void deleteMountainArea(@PathVariable("mountainAreaId") Long id){
        mountainAreaService.deleteMountainArea(id);
    }

    @PutMapping(path = {"{mountainAreaId}"})
    public void updateMountainArea(@PathVariable("mountainAreaId") Long id,
                              @RequestParam(required = false) String name)
    {
        mountainAreaService.updateMountainArea(id, name);
    }


}
