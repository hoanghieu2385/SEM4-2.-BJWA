# SEM4-2.-BJWA

### Session 1: Khởi tạo dự án Spring Boot

* **Các bước tạo project:**
    * New project -> chọn Spring Boot
    * Đặt tên, lưu ở đâu
    * Type đổi sang Maven
    * JDK có thể chọn 21
    * Next
    * Chọn Spring Web, MySQL Driver, Spring Data JPA, Spring Boot DevTools
    * Create
* **Thứ tự phát triển:** Database -> Repository -> Service -> Controller
* **Kết quả:** API mẫu: [api/v1/classroom/list](http://localhost:8080/api/v1/classroom/list)

### Session 2: Phát triển API và tích hợp ReactJS

* **Đề bài:**
    * Xây dựng API với Spring Boot.
    * Tạo giao diện web với ReactJS, tích hợp API.
    * Tự chọn đề tài, không trùng lặp.
    * Yêu cầu:
        * Thiết kế database ít nhất 3 bảng, có liên kết khóa ngoại.
        * Sử dụng MySQL hoặc SQL Server.
        * Validate dữ liệu.
* **Hướng dẫn:** Tạo Repository, Service, Controller, Entities, DTO, viết custom query trong Repository.

### Session 3: Bảo mật với JWT

* Tìm hiểu về các lỗ hổng an ninh, cách tấn công hệ thống và bài học kinh nghiệm.
* Nghiên cứu về JWT, ứng dụng trong phát triển phần mềm hiện đại.
* **Các bước triển khai JWT:**
    1.  Tạo RSA key pair (public key, private key)
    2.  Cấu hình Spring Security (database)
    3.  Tích hợp JWT trong Spring (OAuth 2)
    4.  Tạo API sinh token và API test

### Session 4: OAuth2 Resource Server

* **Tạo project mới:**
    * Spring Web
    * OAuth2 Resource Server
    * Dev tool
    * Spring Configuration Processor
    * springdoc-openapi-starter-webmvc-ui
* **Các bước đã thực hiện và thứ tự tạo/chỉnh sửa file/folder:**

    1.  **configs:** Tạo `RsaKeyProperties.java` (record) để định nghĩa cấu hình RSA keys.
    2.  **Tạo private key và public key:**
        * PowerShell (admin): 
            
            `choco install openssl -y`
        
        * Terminal (trong thư mục chứa key):

        ```bash
        :: Tạo private key
        openssl genrsa -out private_key.pem 2048

        :: Tạo public key từ private key
        openssl rsa -in private_key.pem -pubout -out public_key.pem
        ```
        * Tạo xong nhớ add đường dẫn trong `application.properties` (ví dụ: `rsa.public-key=/certs/public_key.pem`).
    3.  **DemoSpringSecurityApplication.java:** Enable cấu hình `RsaKeyProperties` và cấu hình Swagger.
    4.  **securities:** Tạo `SecurityConfig.java` để cấu hình Spring Security, JWT, và xác thực người dùng.
    5.  **services:** Tạo `TokenService.java` để sinh JWT token dựa trên `Authentication`.
    6.  **payloads/auth:** Tạo `Token.java` và `UserLogin.java` để chứa dữ liệu request/response.
    7.  **controllers:**
        * Tạo `AuthController.java` để xử lý đăng nhập và trả về JWT.
        * Tạo `ProductController.java` để kiểm tra bảo mật JWT.
* **Thứ tự logic (sau khi tạo):** Controllers -> Configs -> Security
* **Giải thích thứ tự logic Controllers -> Configs -> Security:**
    1.  **Controllers:** Xử lý các request từ client và gọi các service.
    2.  **Configs:** Cấu hình các beans và properties cần thiết.
    3.  **Security:** Cấu hình bảo mật, xác thực và phân quyền.

### Các session tiếp theo (Session X...)