# LANGKAH-LANGKAH MENJALANKAN PRAKTIKUM MONOLITH VS MICROSERVICES DENGAN FLASK

## 1. Tujuan Praktikum

Praktikum ini bertujuan untuk memahami perbedaan arsitektur **Monolith**
dan **Microservices**, membuat backend sederhana menggunakan Flask,
serta membandingkan kelebihan dan kekurangannya melalui praktik
langsung.

------------------------------------------------------------------------

# 2. Struktur Folder

Struktur folder yang digunakan:

``` text
tugas 1/
├── microservis/
│   ├── book_service.py
│   └── order_service.py
│
└── monolith/
    └── monolith_app.py
```

Keterangan:

-   `microservis/` berisi program dengan arsitektur Microservices.
-   `book_service.py` merupakan layanan untuk data buku.
-   `order_service.py` merupakan layanan untuk pesanan.
-   `monolith/` berisi program dengan arsitektur Monolith.
-   `monolith_app.py` berisi fitur buku dan pesanan dalam satu aplikasi.

------------------------------------------------------------------------

# 3. Persiapan

## 3.1. Buka Terminal

Buka **PowerShell** atau terminal yang digunakan untuk menjalankan
Python.

Masuk ke folder project:

``` powershell
cd "D:\SEMESTER 5\PARADIKMA SISTEM UNTUK IT PAK REZA\project"
```

Pastikan posisi terminal sudah berada di folder project.

------------------------------------------------------------------------

## 3.2. Periksa Python

Jalankan:

``` powershell
python --version
```

Python harus sudah tersedia.

------------------------------------------------------------------------

## 3.3. Install Flask dan Requests

Install library yang digunakan dalam praktikum:

``` powershell
pip install Flask requests
```

Flask digunakan untuk membuat backend/API, sedangkan `requests`
digunakan oleh Order Service untuk berkomunikasi dengan Book Service
melalui HTTP.

------------------------------------------------------------------------

# 4. MENJALANKAN MONOLITH

Pada arsitektur Monolith, fitur buku dan pesanan berada dalam satu
aplikasi, satu codebase, dan satu proses.

File yang digunakan:

``` text
monolith/
└── monolith_app.py
```

## 4.1. Buka File Monolith

Pastikan file berikut sudah ada:

``` text
monolith/monolith_app.py
```

Isi file `monolith_app.py`:

``` python
from flask import Flask, jsonify, request

app = Flask(__name__)

# Database bohongan (In-memory)
books = [
    {
        "id": 1,
        "title": "Belajar Flask",
        "stock": 5
    }
]

orders = []

# --- FITUR BUKU ---
@app.route('/books', methods=['GET'])
def get_books():
    return jsonify(books)

# --- FITUR PESANAN ---
@app.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    book_id = data.get('book_id')

    # Logika bisnis:
    # Cek stok buku langsung dari variabel global
    for b in books:
        if b['id'] == book_id and b['stock'] > 0:
            b['stock'] -= 1
            order = {
                "id": len(orders) + 1,
                "book_id": book_id,
                "status": "berhasil"
            }
            orders.append(order)
            return jsonify(order), 201

    return jsonify({
        "error": "Buku tidak ditemukan atau stok habis"
    }), 400

if __name__ == '__main__':
    # Aplikasi berjalan di port 5000
    app.run(port=5000, debug=True)
```

------------------------------------------------------------------------

## 4.2. Jalankan Monolith

Masuk ke folder `monolith`:

``` powershell
cd "D:\SEMESTER 5\PARADIKMA SISTEM UNTUK IT PAK REZA\project\monolith"
```

Kemudian jalankan:

``` powershell
python monolith_app.py
```

Jika berhasil, aplikasi berjalan pada:

``` text
http://127.0.0.1:5000
```

**Jangan tutup terminal ini** selama proses pengujian Monolith.

------------------------------------------------------------------------

# 5. TEST GET BOOKS PADA MONOLITH

Buka **PowerShell baru**.

Jalankan:

``` powershell
curl.exe http://localhost:5000/books
```

Hasil yang diharapkan:

``` json
[
  {
    "id": 1,
    "stock": 5,
    "title": "Belajar Flask"
  }
]
```

Endpoint `/books` digunakan untuk mengambil data buku.

------------------------------------------------------------------------

# 6. TEST POST ORDERS PADA MONOLITH

Masih menggunakan PowerShell baru, jalankan:

``` powershell
Invoke-RestMethod -Uri "http://localhost:5000/orders" -Method POST -ContentType "application/json" -Body '{"book_id": 1}'
```

Jika berhasil, akan muncul data pesanan dengan status:

``` text
berhasil
```

Pada proses ini, aplikasi Monolith langsung memeriksa data buku karena
data buku dan pesanan berada dalam aplikasi yang sama.

------------------------------------------------------------------------

# 7. MENJALANKAN MICROSERVICES

Pada arsitektur Microservices, aplikasi dibagi menjadi beberapa service
yang berdiri sendiri.

Pada praktikum ini terdapat:

``` text
Book Service
    ↓
port 5001

Order Service
    ↓
port 5002
```

Order Service berkomunikasi dengan Book Service melalui HTTP/API.

------------------------------------------------------------------------

# 8. MENYIAPKAN BOOK SERVICE

File yang digunakan:

``` text
microservis/book_service.py
```

Isi file:

``` python
from flask import Flask, jsonify

app = Flask(__name__)

# Database khusus Book Service
books = [
    {
        "id": 1,
        "title": "Belajar Flask",
        "stock": 5
    }
]

@app.route('/books', methods=['GET'])
def get_books():
    return jsonify(books)

@app.route('/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    for b in books:
        if b['id'] == book_id:
            return jsonify(b)
    return jsonify({"error": "Not found"}), 404

if __name__ == '__main__':
    # Book service berjalan di port 5001
    app.run(port=5001, debug=True)
```

------------------------------------------------------------------------

# 9. MENJALANKAN BOOK SERVICE

Buka terminal baru.

Masuk ke folder `microservis`:

``` powershell
cd "D:\SEMESTER 5\PARADIKMA SISTEM UNTUK IT PAK REZA\project\microservis"
```

Jalankan:

``` powershell
python book_service.py
```

Book Service berjalan pada:

``` text
http://127.0.0.1:5001
```

**Jangan tutup terminal ini.**

------------------------------------------------------------------------

# 10. TEST BOOK SERVICE

Buka PowerShell baru.

Jalankan:

``` powershell
curl.exe http://localhost:5001/books
```

Hasil yang diharapkan:

``` json
[
  {
    "id": 1,
    "stock": 5,
    "title": "Belajar Flask"
  }
]
```

Book Service sekarang dapat memberikan data buku melalui API.

------------------------------------------------------------------------

# 11. MENYIAPKAN ORDER SERVICE

File yang digunakan:

``` text
microservis/order_service.py
```

Isi file:

``` python
from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

orders = []

BOOK_SERVICE_URL = "http://localhost:5001"

@app.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    book_id = data.get('book_id')

    try:
        response = requests.get(
            f"{BOOK_SERVICE_URL}/books/{book_id}"
        )

        if response.status_code == 200:
            book_data = response.json()

            if book_data['stock'] > 0:
                order = {
                    "id": len(orders) + 1,
                    "book_id": book_id,
                    "status": "berhasil"
                }
                orders.append(order)
                return jsonify(order), 201

        return jsonify({
            "error": "Buku tidak tersedia"
        }), 400

    except requests.exceptions.ConnectionError:
        return jsonify({
            "error": "Book Service sedang down!"
        }), 500

if __name__ == '__main__':
    # Order service berjalan di port 5002
    app.run(port=5002, debug=True)
```

------------------------------------------------------------------------

# 12. MENJALANKAN ORDER SERVICE

Buka terminal baru.

Masuk ke folder `microservis`:

``` powershell
cd "D:\SEMESTER 5\PARADIKMA SISTEM UNTUK IT PAK REZA\project\microservis"
```

Jalankan:

``` powershell
python order_service.py
```

Order Service berjalan pada:

``` text
http://127.0.0.1:5002
```

**Jangan tutup terminal ini.**

------------------------------------------------------------------------

# 13. TEST ORDER SERVICE

Pastikan:

-   Book Service masih berjalan di port `5001`.
-   Order Service masih berjalan di port `5002`.

Buka PowerShell baru.

Jalankan:

``` powershell
Invoke-RestMethod -Uri "http://localhost:5002/orders" -Method POST -ContentType "application/json" -Body '{"book_id": 1}'
```

Jika berhasil, hasilnya menunjukkan pesanan dengan:

``` text
status = berhasil
```

Alur prosesnya:

``` text
Client
   │
   │ POST /orders
   ▼
Order Service
   │
   │ GET /books/1
   ▼
Book Service
   │
   │ Data buku
   ▼
Order Service
   │
   ▼
Pesanan berhasil
```

------------------------------------------------------------------------

# 14. TEST FAULT ISOLATION

Fault Isolation digunakan untuk melihat apa yang terjadi ketika salah
satu service mengalami masalah.

## 14.1. Matikan Book Service

Pergi ke terminal yang menjalankan:

``` powershell
python book_service.py
```

Tekan:

``` text
Ctrl + C
```

Book Service sekarang berhenti.

------------------------------------------------------------------------

## 14.2. Pastikan Order Service Tetap Berjalan

Jangan matikan terminal yang menjalankan:

``` powershell
python order_service.py
```

Order Service tetap berjalan di port:

``` text
5002
```

------------------------------------------------------------------------

## 14.3. Kirim Pesanan Lagi

Buka PowerShell baru dan jalankan:

``` powershell
Invoke-RestMethod -Uri "http://localhost:5002/orders" -Method POST -ContentType "application/json" -Body '{"book_id": 1}'
```

Hasil yang diharapkan:

``` text
Book Service sedang down!
```

Hal ini menunjukkan bahwa Order Service masih hidup, tetapi tidak dapat
mengambil data buku karena Book Service sedang berhenti.

------------------------------------------------------------------------

# 15. MENJALANKAN KEMBALI BOOK SERVICE

Setelah pengujian Fault Isolation selesai, jalankan kembali Book
Service.

Buka terminal baru:

``` powershell
cd "D:\SEMESTER 5\PARADIKMA SISTEM UNTUK IT PAK REZA\project\microservis"
```

Kemudian:

``` powershell
python book_service.py
```

Book Service kembali berjalan pada port:

``` text
5001
```

------------------------------------------------------------------------

# 16. TEST KEMBALI ORDER SERVICE

Pastikan:

``` text
Book Service  → port 5001 → berjalan
Order Service → port 5002 → berjalan
```

Kemudian jalankan:

``` powershell
Invoke-RestMethod -Uri "http://localhost:5002/orders" -Method POST -ContentType "application/json" -Body '{"book_id": 1}'
```

Jika berhasil:

``` text
status = berhasil
```

------------------------------------------------------------------------

# 17. RINGKASAN PORT

  Aplikasi        File                   Port
  --------------- -------------------- ------
  Monolith        `monolith_app.py`      5000
  Book Service    `book_service.py`      5001
  Order Service   `order_service.py`     5002

------------------------------------------------------------------------

# 18. URUTAN TERMINAL

Agar tidak tertukar, urutannya adalah:

### Monolith

**Terminal 1:**

``` powershell
cd "D:\SEMESTER 5\PARADIKMA SISTEM UNTUK IT PAK REZA\project\monolith"
python monolith_app.py
```

**Terminal 2:**

``` powershell
curl.exe http://localhost:5000/books
```

Kemudian:

``` powershell
Invoke-RestMethod -Uri "http://localhost:5000/orders" -Method POST -ContentType "application/json" -Body '{"book_id": 1}'
```

------------------------------------------------------------------------

### Microservices

**Terminal 1:**

``` powershell
cd "D:\SEMESTER 5\PARADIKMA SISTEM UNTUK IT PAK REZA\project\microservis"
python book_service.py
```

**Terminal 2:**

``` powershell
cd "D:\SEMESTER 5\PARADIKMA SISTEM UNTUK IT PAK REZA\project\microservis"
python order_service.py
```

**Terminal 3:**

``` powershell
curl.exe http://localhost:5001/books
```

Kemudian:

``` powershell
Invoke-RestMethod -Uri "http://localhost:5002/orders" -Method POST -ContentType "application/json" -Body '{"book_id": 1}'
```

------------------------------------------------------------------------

# 19. CATATAN UNTUK POWERSHELL

Pada PowerShell Windows, gunakan:

``` powershell
curl.exe
```

untuk perintah `curl`.

Untuk request POST JSON, cara yang digunakan dalam langkah praktikum ini
adalah:

``` powershell
Invoke-RestMethod -Uri "http://localhost:5002/orders" -Method POST -ContentType "application/json" -Body '{"book_id": 1}'
```

Cara tersebut digunakan agar request JSON dapat dijalankan langsung dari
PowerShell.

------------------------------------------------------------------------

# 20. HASIL AKHIR PRAKTIKUM

Setelah seluruh langkah selesai, terdapat dua bentuk arsitektur:

``` text
MONOLITH
────────

Client
  │
  ▼
Monolith :5000
  ├── Books
  └── Orders
```

dan:

``` text
MICROSERVICES
─────────────

Client
  │
  ├──────────────► Book Service :5001
  │
  └──────────────► Order Service :5002
                         │
                         │ HTTP
                         ▼
                   Book Service :5001
```

Pada Monolith, fitur Books dan Orders berada dalam satu aplikasi.

Pada Microservices, Books dan Orders dipisahkan menjadi service yang
berjalan secara terpisah dan berkomunikasi melalui HTTP/API.

------------------------------------------------------------------------

# 21. SELESAI

Praktikum selesai apabila:

-   [ ] Flask dan Requests sudah ter-install.
-   [ ] `monolith_app.py` berhasil berjalan di port `5000`.
-   [ ] `GET /books` pada Monolith berhasil.
-   [ ] `POST /orders` pada Monolith berhasil.
-   [ ] `book_service.py` berhasil berjalan di port `5001`.
-   [ ] `GET /books` pada Book Service berhasil.
-   [ ] `order_service.py` berhasil berjalan di port `5002`.
-   [ ] `POST /orders` pada Microservices berhasil.
-   [ ] Fault Isolation berhasil diuji dengan menghentikan Book Service.
-   [ ] Muncul pesan `Book Service sedang down!`.
-   [ ] Book Service dapat dijalankan kembali.
