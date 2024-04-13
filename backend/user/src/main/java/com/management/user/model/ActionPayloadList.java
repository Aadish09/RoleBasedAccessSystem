package com.management.user.model;

import java.util.List;

import com.management.user.entity.Actions;

import lombok.Data;

@Data
public class ActionPayloadList {
    private List<Actions> actions;
}
