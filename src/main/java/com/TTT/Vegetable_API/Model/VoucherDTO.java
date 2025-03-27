package com.TTT.Vegetable_API.Model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VoucherDTO {
    private Long id;
    private String code;
    private double discount;

    public VoucherDTO(Long id, String code, double discount) {
        this.id = id;
        this.code = code;
        this.discount = discount;
    }


}
