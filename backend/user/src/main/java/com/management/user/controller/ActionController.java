package com.management.user.controller;

import com.management.user.entity.Actions;
import com.management.user.model.ActionPayload;
import com.management.user.model.ActionPayloadList;
import com.management.user.service.ActionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/actions")
public class ActionController {

    @Autowired
    private ActionService actionService;

    @PostMapping
    public Actions addAction(@RequestBody ActionPayload action) {
        return actionService.addAction(action);
    }

    @PutMapping
    public List<Actions> updateAction(@RequestBody ActionPayloadList actions) {
        return actionService.updateAction(actions.getActions());
    }

    @GetMapping("/{id}")
    public Actions getActionById(@PathVariable Long id) {
        return actionService.getActionById(id);
    }

    @GetMapping
    public List<Actions> getAllActions() {
        return actionService.getAllActions();
    }
}
