package com.TTT.Vegetable_API.Model;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;


@Getter
@Setter
public class Payment implements Serializable {
    private String status;
    private String message;
    private String URL;
}
