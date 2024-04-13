package com.management.user.service;

import com.management.user.entity.Actions;
import com.management.user.model.ActionPayload;
import com.management.user.dao.ActionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActionService {

    @Autowired
    private ActionRepository actionRepository;

    public Actions addAction(ActionPayload actionPayload) {
        Actions action = new Actions(actionPayload.getActionName(), actionPayload.getAllowedRoles());
        return actionRepository.save(action);
    }

    public List<Actions> updateAction(List<Actions> actions) {
        actionRepository.deleteAll();
        return actionRepository.saveAll(actions);
    }

    public Actions getActionById(Long id) {
        Optional<Actions> optionalAction = actionRepository.findById(id);
        return optionalAction.orElse(null);
    }

    public List<Actions> getAllActions() {
        return actionRepository.findAll();
    }
}
