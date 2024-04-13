package com.management.user.model;

import java.util.List;

import lombok.Data;

@Data
public class ActionPayload {
    private String actionName;
    private String allowedRoles;
}