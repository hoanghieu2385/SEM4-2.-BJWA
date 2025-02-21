package com.example.demo.repository;

import com.example.demo.entities.ClassRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IClassRoomRepositoty extends JpaRepository<ClassRoom, Long> {

}
