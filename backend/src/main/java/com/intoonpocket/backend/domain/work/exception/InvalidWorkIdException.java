package com.intoonpocket.backend.domain.work.exception;

import com.intoonpocket.backend.common.exception.errorcode.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class InvalidWorkIdException extends Exception { }
