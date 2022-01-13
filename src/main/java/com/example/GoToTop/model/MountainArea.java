package com.example.GoToTop.model;

import javax.persistence.*;

@Entity
@Table
public class MountainArea {
    @Id
    @SequenceGenerator(
            name = "mountain_area_sequence",
            sequenceName = "mountain_area_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "mountain_area_sequence"
    )
    private Long id;
    private String name;

    public MountainArea() {
    }

    public MountainArea(Long id, String name) {
        id = id;
        this.name = name;
    }

    public MountainArea(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @javax.persistence.Id
    public Long getId() {
        return id;
    }
}