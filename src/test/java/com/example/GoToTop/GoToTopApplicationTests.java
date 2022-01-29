package com.example.GoToTop;

import com.example.GoToTop.controllers.ScoredStretchController;
import com.example.GoToTop.exceptions.GlobalExceptionHandler;
import com.example.GoToTop.model.ScoredStretch;
import com.example.GoToTop.repositories.ScoredStretchRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.*;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.sql.Time;
import java.util.ArrayList;
import java.util.Arrays;

import static org.assertj.core.internal.bytebuddy.matcher.ElementMatchers.is;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(ScoredStretchController.class)
class GoToTopApplicationTests {

	@Autowired
	MockMvc mockMvc;

	@Autowired
	ObjectMapper mapper;

	@MockBean
	private ScoredStretchRepository scoredStretchRepository;


	@Test
	public void getScoredStretchListTest() throws Exception {
		//List<ScoredStretch> records = new ArrayList<>(Arrays.asList(RECORD_1, RECORD_2, RECORD_3));

		//Mockito.when(patientRecordRepository.findAll()).thenReturn(records);

			mockMvc.perform(MockMvcRequestBuilders
					.get("/scoredStretch")
					.contentType(MediaType.APPLICATION_JSON))
					.andExpect(status().isOk());
	}


}
