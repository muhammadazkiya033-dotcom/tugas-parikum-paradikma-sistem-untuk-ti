1. Persiapan

Sebelum menjalankan program, pastikan beberapa aplikasi sudah terpasang di laptop:

Visual Studio Code untuk menulis dan menjalankan kode.
Go untuk menjalankan server.
Python untuk menjalankan client Python.
Node.js dan npm untuk menjalankan client Node.js.
Protocol Buffers (protoc) untuk membuat kode gRPC.

Buka folder proyek grpc-polyglot-lab di Visual Studio Code.

Struktur folder proyek:

grpc-polyglot-lab/
├── go-server/
│   ├── pb/
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
2. Menjalankan Go Server

Go Server berfungsi sebagai penyedia layanan yang menerima permintaan dari client Python dan Node.js.

Langkah-langkah:

Buka Visual Studio Code.
Buka terminal melalui menu Terminal → New Terminal.
Masuk ke folder go-server dengan perintah:
cd "D:\SEMESTER 5\PARADIKMA SISTEM UNTUK IT PAK REZA\project\tugas 2\grpc-polyglot-lab\go-server"
Jalankan server menggunakan perintah:
go run main.go
Jika berhasil, terminal menampilkan:
gRPC Server (Go) berjalan di port :50051...

Artinya, server sudah aktif dan siap menerima permintaan dari client.

Catatan: Biarkan terminal server tetap terbuka selama pengujian.

3. Menjalankan Python Client

Python Client digunakan untuk meminta data pengguna dari Go Server.

Langkah-langkah:

Buka terminal baru di Visual Studio Code dengan memilih Terminal → New Terminal.
Masuk ke folder python-client:
cd "D:\SEMESTER 5\PARADIKMA SISTEM UNTUK IT PAK REZA\project\tugas 2\grpc-polyglot-lab\python-client"
Jika library gRPC belum terpasang, jalankan:
python -m pip install grpcio grpcio-tools

Tunggu sampai proses instalasi selesai.

Jalankan Python Client:
python client.py
Jika berhasil, hasilnya akan seperti berikut:
Mengirim request ke Go Server menggunakan Python...
Respon dari Server -> Nama: Budi Santoso, Email: budi@universitas.ac.id

Artinya, Python Client berhasil meminta data pengguna dari Go Server.

4. Menjalankan Node.js Client

Node.js Client juga digunakan untuk meminta data pengguna dari Go Server, tetapi menggunakan bahasa JavaScript.

Langkah-langkah:

Buka terminal baru di Visual Studio Code.
Masuk ke folder node-client:
cd "D:\SEMESTER 5\PARADIKMA SISTEM UNTUK IT PAK REZA\project\tugas 2\grpc-polyglot-lab\node-client"
Jika library belum terpasang, jalankan:
npm install @grpc/grpc-js @grpc/proto-loader
Jalankan Node.js Client:
node client.js
Jika berhasil, hasilnya akan seperti berikut:
Mengirim request ke Go Server menggunakan Node.js...
Respon dari Server -> Nama: Budi Santoso, Email: budi@universitas.ac.id

Artinya, Node.js Client berhasil berkomunikasi dengan Go Server melalui gRPC.

5. Memahami Cara Kerja Program

Program ini menggunakan tiga bahasa pemrograman, yaitu Go, Python, dan JavaScript melalui Node.js.

Urutan kerjanya sebagai berikut:

Go Server dijalankan dan menunggu permintaan pada port 50051.
Python Client atau Node.js Client mengirim permintaan untuk mendapatkan data pengguna dengan ID 1.
Go Server menerima permintaan tersebut dan memeriksa ID pengguna.
Jika ID pengguna adalah 1, server mengirimkan nama Budi Santoso dan email budi@universitas.ac.id.
Client menerima dan menampilkan data yang dikirimkan oleh server.

Komunikasi ini menggunakan gRPC dengan definisi layanan yang disimpan di file user.proto.

6. Menguji Data Pengguna

Program juga dapat digunakan untuk menguji ID pengguna yang tidak ditemukan.

Jika client mengirim ID selain 1, server akan mengembalikan:

Nama: User Tidak Ditemukan
Email: -

Hal ini terjadi karena server hanya menyediakan data untuk pengguna dengan ID 1.

7. Kesimpulan

Berdasarkan praktikum ini, komunikasi antar-service dapat dilakukan menggunakan gRPC meskipun server dan client menggunakan bahasa pemrograman yang berbeda.

Go digunakan sebagai server, sedangkan Python dan Node.js digunakan sebagai client. Ketiganya berkomunikasi menggunakan definisi layanan yang sama, yaitu user.proto.

Dengan demikian, praktikum ini menunjukkan penerapan komunikasi antar-service menggunakan pendekatan polyglot.

Catatan penting: Jalankan Go Server terlebih dahulu, kemudian jalankan Python Client dan Node.js Client melalui terminal yang berbeda. Jika server berhenti, client tidak dapat memperoleh data darinya.