# Tugas 2 — Komunikasi Inter-service dengan gRPC (Polyglot)

##  Deskripsi

Praktikum ini membahas komunikasi antar-service menggunakan **gRPC** dengan pendekatan *polyglot*, yaitu penggunaan beberapa bahasa pemrograman dalam satu sistem.

Pada praktikum ini, Go digunakan sebagai server, sedangkan Python dan Node.js digunakan sebagai client. Kedua client tersebut dapat meminta data pengguna dari server yang sama melalui komunikasi gRPC.

##  Tujuan Praktikum

1. Memahami cara kerja komunikasi antar-service menggunakan gRPC.
2. Membuat server gRPC menggunakan bahasa Go.
3. Menghubungkan Python Client dengan Go Server.
4. Menghubungkan Node.js Client dengan Go Server.
5. Memahami penggunaan Protocol Buffers sebagai format definisi layanan.

##  Teknologi yang Digunakan

| Teknologi | Fungsi |
|---|---|
| Go | Menjalankan server gRPC |
| Python | Membuat client untuk mengakses server |
| Node.js | Membuat client menggunakan JavaScript |
| gRPC | Menghubungkan client dengan server |
| Protocol Buffers | Mendefinisikan pesan dan layanan komunikasi |
| Visual Studio Code | Menulis dan menjalankan program |

##  Struktur Folder

```text
tugas 2/
├── README.md
└── grpc-polyglot-lab/
    ├── go-server/
    │   ├── pb/
    │   │   ├── user.pb.go
    │   │   └── user_grpc.pb.go
    │   ├── go.mod
    │   ├── go.sum
    │   └── main.go
    ├── node-client/
    │   ├── client.js
    │   └── package.json
    ├── python-client/
    │   ├── client.py
    │   ├── user_pb2.py
    │   └── user_pb2_grpc.py
    ├── .gitignore
    └── user.proto
```

##  Persiapan

Sebelum menjalankan program, pastikan aplikasi berikut sudah terpasang:

- [Go](https://go.dev/dl/)
- [Python](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/)
- [Protocol Buffers](https://github.com/protocolbuffers/protobuf/releases)
- Visual Studio Code

Pastikan juga seluruh file proyek sudah tersedia sesuai struktur folder di atas.

##  Langkah-Langkah Menjalankan Program

### 1. Menjalankan Go Server

Go Server bertugas menerima permintaan dari Python Client dan Node.js Client, kemudian mengirimkan data pengguna sesuai permintaan.

**Langkah-langkah:**

1. Buka folder `grpc-polyglot-lab` di Visual Studio Code.
2. Buka terminal melalui menu **Terminal → New Terminal**.
3. Masuk ke folder `go-server`:

   ```powershell
   cd "D:\SEMESTER 5\PARADIKMA SISTEM UNTUK IT PAK REZA\project\tugas 2\grpc-polyglot-lab\go-server"
   ```

4. Jalankan server:

   ```powershell
   go run main.go
   ```

5. Jika berhasil, terminal menampilkan:

   ```text
   gRPC Server (Go) berjalan di port :50051...
   ```

**Penting:** Biarkan terminal ini tetap terbuka selama pengujian karena server harus terus berjalan agar client dapat terhubung.

### 2. Menjalankan Python Client

Python Client digunakan untuk meminta data pengguna dari Go Server.

**Langkah-langkah:**

1. Buka terminal baru di Visual Studio Code.
2. Masuk ke folder `python-client`:

   ```powershell
   cd "D:\SEMESTER 5\PARADIKMA SISTEM UNTUK IT PAK REZA\project\tugas 2\grpc-polyglot-lab\python-client"
   ```

3. Jika library gRPC belum terpasang, jalankan:

   ```powershell
   python -m pip install grpcio grpcio-tools
   ```

4. Jalankan client:

   ```powershell
   python client.py
   ```

5. Jika berhasil, hasilnya akan seperti berikut:

   ```text
   Mengirim request ke Go Server menggunakan Python...
   Respon dari Server -> Nama: Budi Santoso, Email: budi@universitas.ac.id
   ```

Hasil tersebut menunjukkan bahwa Python Client berhasil mengirim permintaan dan menerima data dari Go Server.

### 3. Menjalankan Node.js Client

Node.js Client memiliki fungsi yang sama dengan Python Client, tetapi menggunakan JavaScript.

**Langkah-langkah:**

1. Buka terminal baru di Visual Studio Code.
2. Masuk ke folder `node-client`:

   ```powershell
   cd "D:\SEMESTER 5\PARADIKMA SISTEM UNTUK IT PAK REZA\project\tugas 2\grpc-polyglot-lab\node-client"
   ```

3. Jika library belum terpasang, jalankan:

   ```powershell
   npm install @grpc/grpc-js @grpc/proto-loader
   ```

4. Jalankan client:

   ```powershell
   node client.js
   ```

5. Jika berhasil, hasilnya akan seperti berikut:

   ```text
   Mengirim request ke Go Server menggunakan Node.js...
   Respon dari Server -> Nama: Budi Santoso, Email: budi@universitas.ac.id
   ```

Hasil tersebut menunjukkan bahwa Node.js Client berhasil berkomunikasi dengan Go Server.

##  Cara Kerja Program

Alur komunikasi dalam praktikum ini adalah sebagai berikut:

1. Go Server dijalankan dan menunggu permintaan pada port `50051`.
2. Python Client atau Node.js Client mengirim permintaan data pengguna dengan ID `1`.
3. Permintaan dikirim melalui gRPC berdasarkan definisi layanan di `user.proto`.
4. Go Server memeriksa ID pengguna yang diterima.
5. Jika ID pengguna adalah `1`, server mengirimkan nama dan email pengguna.
6. Client menerima dan menampilkan data tersebut di terminal.

##  Hasil Pengujian

### Pengujian Python Client

| Komponen | Hasil |
|---|---|
| Client | Python |
| Server | Go |
| User ID | 1 |
| Nama | Budi Santoso |
| Email | budi@universitas.ac.id |
| Status | Berhasil |

### Pengujian Node.js Client

| Komponen | Hasil |
|---|---|
| Client | Node.js |
| Server | Go |
| User ID | 1 |
| Nama | Budi Santoso |
| Email | budi@universitas.ac.id |
| Status | Berhasil |

### Pengujian ID Pengguna yang Tidak Ditemukan

Jika client mengirimkan ID selain `1`, server akan mengembalikan respons berikut:

```text
Nama: User Tidak Ditemukan
Email: -
```

Respons tersebut muncul karena program hanya menyediakan data pengguna dengan ID `1`.

##  Kesimpulan

Berdasarkan praktikum yang dilakukan, Go Server dapat berkomunikasi dengan client yang menggunakan bahasa pemrograman berbeda melalui gRPC.

Python dan Node.js dapat mengirim permintaan ke server yang sama dan menerima respons berdasarkan ID pengguna. Hal ini menunjukkan bahwa gRPC dapat digunakan untuk membangun komunikasi antar-service dalam sistem yang menggunakan beberapa bahasa pemrograman.

Pendekatan tersebut disebut *polyglot*, yaitu penggunaan beberapa bahasa pemrograman dalam satu sistem.

---

