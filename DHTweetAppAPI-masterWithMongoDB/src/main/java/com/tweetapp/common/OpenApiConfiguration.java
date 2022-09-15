package com.tweetapp.common;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class OpenApiConfiguration {

	public OpenAPI customOpenAPI() {
		return new OpenAPI().info(apiInfo());
	}

	private Info apiInfo() {
		return new Info().title("DHTweetApp API").description("Tweet app for FSE1 by Digital honors").version("1.0")
				.contact(apiContact());
	}

	private Contact apiContact() {
		return new Contact().name("Anki Thakur").email("Ankitthakur52143@gmail.com")
				.url("https://github.com/Ankitthakur143");
	}

}