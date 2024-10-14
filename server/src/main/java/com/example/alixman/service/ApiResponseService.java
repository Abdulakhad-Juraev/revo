package com.example.alixman.service;

import org.springframework.stereotype.Service;
import com.example.alixman.payload.ApiResponse;
import com.example.alixman.utils.MessageConst;

@Service
public class ApiResponseService {

    public ApiResponse errorResponse() {
        return new ApiResponse(MessageConst.ERROR_MESSAGE, false);
    }

    public ApiResponse existsResponse() {
        return new ApiResponse(MessageConst.EXISTS_MESSAGE, false);
    }

    public ApiResponse notFoundResponse() {
        return new ApiResponse(MessageConst.NOT_FOUND_MESSAGE, false);
    }

    public ApiResponse tryErrorResponse() {
        return new ApiResponse(MessageConst.TRY_ERROR_MESSAGE, false);
    }

    public ApiResponse deletedResponse() {
        return new ApiResponse(MessageConst.DELETED_MESSAGE, true);
    }

    public ApiResponse savedResponse() {
        return new ApiResponse(MessageConst.SAVED_MESSAGE, true);
    }

    public ApiResponse unEnoughData() {
        return new ApiResponse(MessageConst.ENOUGH_ERROR_MESSAGE, false);
    }

    public ApiResponse unEnoughProduct() {
        return new ApiResponse(MessageConst.ENOUGH_PRODUCT_ERROR_MESSAGE, false);
    }

    public ApiResponse updatedResponse() {
        return new ApiResponse(MessageConst.UPDATED_MESSAGE, true);
    }
}
