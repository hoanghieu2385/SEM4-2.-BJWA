# SEM4-2.-BJWA

---
### Session 1:
- Các bước tạo project: 
    - New project -> chọn Spring Boot
    - Đặt tên, lưu ở đâu
    - type đổi sang Maven
    - JDK có thể chọn 21
    - Next 
    - chọn Spring Web, MySQL Driver, Spring Data JPA, Spring Boot DevTools
    - Create

- Thứ tự: Database -> Repository -> Service -> Controller
- kết quả: [api/v1/classroom/list](http://localhost:8080/api/v1/classroom/list)

---
### Session 2:
- Đề: Question:
    - Sử dụng Spring boot thực hiện viết các API.
    - Sử dụng ReactJS để tạo giao diện trang web, đồng thời kết hợp với API để tương tác dữ liệu và người sử dụng.
    - Đề tài là tự chọn không trùng nhau giữa các cá nhân trong lớp.
    - Yêu cầu:
        - Thiết kế database có ít nhất 3 bảng và có liên kết với nhau thông qua khoá ngoại
        - Sử dụng MySQL, SQL Server làm database.
        - Thực hiện validate dữ liệu

- Hướng dẫn các bước: tạo repository, service, controller, entities, dto, viết lại query truy vấn trong repository.