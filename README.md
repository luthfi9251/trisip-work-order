# Project Name

## Instalasi

### Instalasi Secara Manual

1. **Import Database**  
   Import file SQL yang telah disediakan ke MySQL.
2. **Konfigurasi Environment**  
   Buat file `.env` di root proyek dan isi dengan format berikut:
    ```env
    DATABASE_URL=mysql://user:password@localhost:3306/db_name
    ```
3. **Install Dependencies**  
   Jalankan perintah berikut untuk menginstal dependensi:
    ```sh
    npm install
    ```
4. **Build Aplikasi**  
   Jalankan perintah berikut untuk membangun aplikasi:
    ```sh
    npm run build
    ```
5. **Menjalankan Aplikasi**  
   Jalankan aplikasi dengan perintah:
    ```sh
    npm run start
    ```
6. **Akses Aplikasi**  
   Aplikasi dapat diakses melalui `http://localhost:3000`

---

### Instalasi Secara Docker

1. **Sesuaikan Konfigurasi Docker Compose**  
   Pastikan file `docker-compose.yml` telah dikonfigurasi sesuai kebutuhan.
2. **Jalankan Docker Compose**  
   Jalankan perintah berikut untuk membangun dan menjalankan aplikasi:
    ```sh
    docker compose up --build -d
    ```
3. **Akses Aplikasi**  
   Aplikasi dapat diakses melalui `http://localhost:3000`

---

### Akun Pengguna

Berikut adalah daftar akun pengguna yang dapat diakses:

| Nama            | Email               | Role               | Password |
| --------------- | ------------------- | ------------------ | -------- |
| Ahmad Sukri     | ahmad@sukri.com     | Operator           | password |
| Hendrik Charger | hendrik@charger.com | Operator           | password |
| Robby Hairdryer | robby@hairdryer.com | Operator           | password |
| John Doe        | john@doe.com        | Operator           | password |
| Luthfi Irfan    | luthfi@irfan.com    | Production Manager | password |

---

### Environment yang Diuji

Sistem telah diuji dengan environment berikut:

-   **Node.js**: versi 20.18
-   **MySQL**: versi 8.0

Aplikasi telah siap digunakan! 🚀
