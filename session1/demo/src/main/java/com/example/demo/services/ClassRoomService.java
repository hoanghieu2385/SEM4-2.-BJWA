package com.example.demo.services;

import com.example.demo.entities.ClassRoom;
import com.example.demo.repository.IClassRoomRepositoty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ClassRoomService implements IClassRoomService {
    @Autowired
    private IClassRoomRepositoty classRoomRepositoty;
    @Override
    public List<ClassRoom> getClassRoomList() {
        var classRoomList = classRoomRepositoty.findAll();
        return classRoomList;
    }

    @Override
    public void addClassRoom(ClassRoom classRoom) {
        classRoomRepositoty.save(classRoom);
    }

    @Override
    public void updateClassRoom(Long id, ClassRoom classRoom) {
        try {
            var existingClassRoom = classRoomRepositoty.findById(id).orElseThrow( );

            existingClassRoom.setClass_name(classRoom.getClass_name());
            existingClassRoom.setNumber_member(classRoom.getNumber_member());

            classRoomRepositoty.save(existingClassRoom);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteClassRoom(Long id) {
        try {
            classRoomRepositoty.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
