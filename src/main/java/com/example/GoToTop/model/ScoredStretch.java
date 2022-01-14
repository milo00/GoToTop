package com.example.GoToTop.model;

import javax.persistence.*;

@Entity
@Table
@Access(AccessType.PROPERTY)
public class ScoredStretch {
    private Long id;


    public void setId(Long id) {
        this.id = id;
    }

    @Id
    @SequenceGenerator(
            name = "scored_stretch_sequence",
            sequenceName = "scored_stretch_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "scored_stretch_sequence"
    )
    public Long getId() {
        return id;
    }
}
