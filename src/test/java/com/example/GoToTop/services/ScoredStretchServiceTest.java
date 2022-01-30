package com.example.GoToTop.services;

import com.example.GoToTop.exceptions.RoutePointAlreadyExistsException;
import com.example.GoToTop.exceptions.ScoredStretchAlreadyExistsException;
import com.example.GoToTop.exceptions.ScoredStretchConflictException;
import com.example.GoToTop.exceptions.ScoredStretchNotFoundException;
import com.example.GoToTop.model.MountainArea;
import com.example.GoToTop.model.RoutePoint;
import com.example.GoToTop.model.ScoredStretch;
import com.example.GoToTop.repositories.MountainAreaRepository;
import com.example.GoToTop.repositories.ScoredStretchRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Time;
import java.util.Optional;
import java.util.regex.Matcher;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.AdditionalMatchers.or;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ScoredStretchServiceTest {

    @Mock
    private ScoredStretchRepository scoredStretchRepository;

    private ScoredStretchService underTest;

    @BeforeEach
    void setUp() {
        underTest = new ScoredStretchService(scoredStretchRepository);
    }

    @Test
    void getScoredStretchesTest() {

        underTest.getScoredStretch();
        verify(scoredStretchRepository).findAllStretches();

    }

    @Test
    void addNewScoredStretchTest() {

        MountainArea mountainArea = new MountainArea("Tatry Wysokie");

        RoutePoint startPoint = new RoutePoint("Rusinowa Polana", 49.262862f, 20.090297f, 1210, mountainArea);
        RoutePoint endPoint = new RoutePoint("Dolina Filipka", 49.282190f, 20.087708f, 959, mountainArea);
        String middlePoint = "";

        ScoredStretch scoredStretch = new ScoredStretch(startPoint, endPoint, middlePoint, 3, 2.7f, Time.valueOf("00:55:00"));
        underTest.addNewScoredStretch(scoredStretch);


        ArgumentCaptor<ScoredStretch> scoredStretchArgumentCaptor =
                ArgumentCaptor.forClass(ScoredStretch.class);

        verify(scoredStretchRepository)
                .save(scoredStretchArgumentCaptor.capture());

        ScoredStretch capturedScoredStretch = scoredStretchArgumentCaptor.getValue();

        assertThat(capturedScoredStretch).isEqualTo(scoredStretch);
    }

/*    @Test
    void addNewScoredStretchWithNewPointsTest() {

        MountainArea mountainArea = new MountainArea("Tatry Wysokie");

        RoutePoint startPoint = new RoutePoint("new start point", 49.262822f, 20.090207f, 1200, mountainArea);
        RoutePoint endPoint = new RoutePoint("new end point", 49.282198f, 20.087600f, 919, mountainArea);
        String middlePoint = "";

        ScoredStretch scoredStretch = new ScoredStretch(startPoint,endPoint, middlePoint, 3, 2.7f, Time.valueOf("00:55:00"));
        underTest.addNewScoredStretch(scoredStretch);


        ArgumentCaptor<ScoredStretch> scoredStretchArgumentCaptor =
                ArgumentCaptor.forClass(ScoredStretch.class);

        verify(scoredStretchRepository)
                .save(scoredStretchArgumentCaptor.capture());

        ScoredStretch capturedScoredStretch = scoredStretchArgumentCaptor.getValue();

        assertThat(capturedScoredStretch).isEqualTo(scoredStretch);
    }*/

    @Test
    void willThrowAlreadyExistsExceptionTest() {

        MountainArea mountainArea = new MountainArea("Tatry Wysokie");

        RoutePoint startPoint = new RoutePoint("Rusinowa Polana", 49.262862f, 20.090297f, 1210, mountainArea);
        RoutePoint endPoint = new RoutePoint("Dolina Filipka", 49.282190f, 20.087708f, 959, mountainArea);
        String middlePoint = "";

        ScoredStretch scoredStretch = new ScoredStretch(startPoint, endPoint, middlePoint, 3, 2.7f, Time.valueOf("00:55:00"));

        given(scoredStretchRepository.findStretchByKey(any(), any(), anyString())).willReturn(Optional.of(scoredStretch));

        assertThatThrownBy(() -> underTest.addNewScoredStretch(scoredStretch))
                .isInstanceOf(ScoredStretchAlreadyExistsException.class)
                .hasMessageContaining("Stretch with given start, end and middle point already exists");

        verify(scoredStretchRepository, never()).save(any());

    }

    @Test
    void willThrowStretchConflictExceptionTest() {

        MountainArea mountainArea = new MountainArea("Tatry Wysokie");

        RoutePoint startPoint = new RoutePoint("Rusinowa Polana", 49.262862f, 20.090297f, 1210, mountainArea);
        RoutePoint endPoint = new RoutePoint("Dolina Filipka", 49.282190f, 20.087708f, 959, mountainArea);
        String middlePoint = "";

        ScoredStretch scoredStretch = new ScoredStretch(startPoint, endPoint, middlePoint, 3, 2.7f, Time.valueOf("00:55:00"));

        given(scoredStretchRepository.countScoredStretchesWithTheSameStartAndEndPoint(any(), any())).willReturn(2);

        assertThatThrownBy(() -> underTest.addNewScoredStretch(scoredStretch))
                .isInstanceOf(ScoredStretchConflictException.class)
                .hasMessageContaining("Cannot add new stretch with empty middle point if different middle point for this stretch already exists");

        verify(scoredStretchRepository, never()).save(any());

    }

    @Test
    void willThrowStretchConflictMiddlePointExceptionTest() {

        MountainArea mountainArea = new MountainArea("Tatry Wysokie");

        RoutePoint startPoint = new RoutePoint("Rusinowa Polana", 49.262862f, 20.090297f, 1210, mountainArea);
        RoutePoint endPoint = new RoutePoint("Dolina Filipka", 49.282190f, 20.087708f, 959, mountainArea);
        String middlePoint = "NEW";

        ScoredStretch conflictingScoredStretch = new ScoredStretch(startPoint, endPoint, middlePoint, 3, 2.7f, Time.valueOf("00:55:00"));


        given(scoredStretchRepository.existsScoredStretchWithEmptyMiddlePoint(any(), any())).willReturn(true);

        assertThatThrownBy(() -> underTest.addNewScoredStretch(conflictingScoredStretch))
                .isInstanceOf(ScoredStretchConflictException.class)
                .hasMessageContaining("Cannot add new stretch if the same stretch with empty middle point exists");

        verify(scoredStretchRepository, never()).save(any());

    }


    @Test
    void updateScoreOfScoredStretchTest() {

        int score_new_value = 6;

        MountainArea mountainArea = new MountainArea("Tatry Wysokie");

        RoutePoint startPoint = new RoutePoint("Rusinowa Polana", 49.262862f, 20.090297f, 1210, mountainArea);
        RoutePoint endPoint = new RoutePoint("Dolina Filipka", 49.282190f, 20.087708f, 959, mountainArea);
        String middlePoint = "";
        ScoredStretch scoredStretch = new ScoredStretch(startPoint, endPoint, middlePoint, 3, 2.7f, Time.valueOf("00:55:00"));

        given(scoredStretchRepository.findById(anyLong())).willReturn(Optional.of(scoredStretch));

        Long id = 1L;
        Optional<String> editMiddlePoint = Optional.empty();
        Optional<Integer> score = Optional.of(score_new_value);
        Optional<Float> length = Optional.empty();
        Optional<Float> highDifference = Optional.empty();
        Optional<Time> walkingTime = Optional.empty();
        underTest.updateScoredStretch(id, editMiddlePoint, score, length, highDifference, walkingTime);

        ArgumentCaptor<ScoredStretch> scoredStretchArgumentCaptor =
                ArgumentCaptor.forClass(ScoredStretch.class);

        verify(scoredStretchRepository)
                .save(scoredStretchArgumentCaptor.capture());

        ScoredStretch capturedScoredStretch = scoredStretchArgumentCaptor.getValue();

        assertThat(capturedScoredStretch.getScore()).isEqualTo(score_new_value);

    }

    @Test
    void updateMiddlePointOfScoredStretchTest() {

        String new_middle_point = "New middle point";

        MountainArea mountainArea = new MountainArea("Tatry Wysokie");

        RoutePoint startPoint = new RoutePoint("Rusinowa Polana", 49.262862f, 20.090297f, 1210, mountainArea);
        RoutePoint endPoint = new RoutePoint("Dolina Filipka", 49.282190f, 20.087708f, 959, mountainArea);
        String middlePoint = "";
        ScoredStretch scoredStretch = new ScoredStretch(startPoint, endPoint, middlePoint, 3, 2.7f, Time.valueOf("00:55:00"));

        given(scoredStretchRepository.findById(anyLong())).willReturn(Optional.of(scoredStretch));

        Long id = 1L;
        Optional<String> editMiddlePoint = Optional.of(new_middle_point);
        Optional<Integer> score = Optional.empty();
        Optional<Float> length = Optional.empty();
        Optional<Float> highDifference = Optional.empty();
        Optional<Time> walkingTime = Optional.empty();
        underTest.updateScoredStretch(id, editMiddlePoint, score, length, highDifference, walkingTime);

        ArgumentCaptor<ScoredStretch> scoredStretchArgumentCaptor =
                ArgumentCaptor.forClass(ScoredStretch.class);

        verify(scoredStretchRepository)
                .save(scoredStretchArgumentCaptor.capture());

        ScoredStretch capturedScoredStretch = scoredStretchArgumentCaptor.getValue();

        assertThat(capturedScoredStretch.getMiddlePoint()).isEqualTo(new_middle_point);

    }


    @Test
    void updateScoredStretchNotFoundThrowableTest() {


        given(scoredStretchRepository.findById(anyLong())).willReturn(Optional.empty());

        Long id = 1L;
        Optional<String> editMiddlePoint = Optional.empty();
        Optional<Integer> score = Optional.empty();
        Optional<Float> length = Optional.empty();
        Optional<Float> highDifference = Optional.empty();
        Optional<Time> walkingTime = Optional.empty();

        assertThatThrownBy(() -> underTest.updateScoredStretch(id, editMiddlePoint, score, length, highDifference, walkingTime))
                .isInstanceOf(ScoredStretchNotFoundException.class)
                .hasMessageContaining("Stretch does not exist");

        verify(scoredStretchRepository, never()).save(any());


    }

    @Test
    void updateScoredStretchAlreadyExistsThrowableTest() {

        String conflicting_middle_point = "";

        MountainArea mountainArea = new MountainArea("Tatry Wysokie");

        RoutePoint startPoint = new RoutePoint("Rusinowa Polana", 49.262862f, 20.090297f, 1210, mountainArea);
        RoutePoint endPoint = new RoutePoint("Dolina Filipka", 49.282190f, 20.087708f, 959, mountainArea);
        String middlePoint1 = "";
        String middlePoint2 = "different mp";
        ScoredStretch conflictingScoredStretch = new ScoredStretch(startPoint, endPoint, middlePoint1, 3, 2.7f, Time.valueOf("00:55:00"));
        ScoredStretch scoredStretchToEdit = new ScoredStretch(startPoint, endPoint, middlePoint2, 3, 2.7f, Time.valueOf("00:55:00"));


        given(scoredStretchRepository.findById(anyLong())).willReturn(Optional.of(scoredStretchToEdit));

        Long id = 1L;
        Optional<String> editMiddlePoint = Optional.of(conflicting_middle_point);
        Optional<Integer> score = Optional.empty();
        Optional<Float> length = Optional.empty();
        Optional<Float> highDifference = Optional.empty();
        Optional<Time> walkingTime = Optional.empty();
        //underTest.updateScoredStretch(id,editMiddlePoint,score,length, highDifference,walkingTime);

        given(scoredStretchRepository.findStretchByKey(any(), any(), anyString())).willReturn(Optional.of(conflictingScoredStretch));

        assertThatThrownBy(() -> underTest.updateScoredStretch(id, editMiddlePoint, score, length, highDifference, walkingTime))
                .isInstanceOf(ScoredStretchAlreadyExistsException.class)
                .hasMessageContaining("Stretch with given middle point already exists");

        verify(scoredStretchRepository, never()).save(any());

    }
}