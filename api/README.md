# ===== BackEnd : Nodejs, Expressjs

# === chạy test api bằng Postman

npm i express@4.18.3
npm i bcrypt@5.1.1 : hash password
npm i prisma@5.11.0
npm i cookie-parser@1.4.6: for using cookie jwt
npm i jsonwebtoken@9.0.2 : tạo json cho cookie value

1. package.json thêm `  "type": "module",`
   ==> khi import dạng `import express from "express"`
   ==> ko có dòng type thì const express = require('express');

   ==> export `export default router`
   ==> ko có dòng type thì `module.exports = router;`

2. tại terminal chạy lệnh `console-ninja node --watch app.js` thay cho nodemon app.js

# 3. ===== Prisma

npm i prisma@5.11.0
npx prisma init --datasource-provider mongodb : tạo new folder prisma trong app

==== `vào Atlas mongoDb tạo database `

1. https://cloud.mongodb.com/v2/6774b7ce7424937470819029#/overview : dang nhap bàng trinhtan1288@gmail.com
2. click New Project -> dat tên -> next
3. tạo Create new Cluster -> free data -> Deployment
4. chổ Cluster -> COnnect -> chọn Driver -> copy Database url vào .env DATABASE_URL
   ==========`ket noi voi Prisma`
5. tạo model trong prisma/schema.prisma
6. chay npm i @prisma/client@5.11.0
7. tạo api/lib/prisma.js : export `prisma` từ `PrismaClient()` để connect với Database prisma
8. tại auth.controller.js : e.g : hàm register() muốn tạo newUser dùng ` const newUser = await prisma.user.create({...})`
9. mỗi lần thay đổi data trong Prisma phải gõ lệnh `npx prisma db push` thì data mới update trong Prisma

# == Prisma: cách create new data cho 2 Model Post và PostDetail cùng 1 lúc

-- xem hàm addPost tạo post.controller.js

# Prisma: cách Join các Model với nhau

--- xem hàm getPost tạo post.controller.js

# ==== muốn dùng file .env trong Nodejs (process.env.)

1. npm i dotenv
   -- chèn dotenv tại app.js
2. const dotenv = require('dotenv');
3. dotenv.config({
   path: './.env',
   });

# ====== tạo cookie jwt (cookie parser)

npm i cookie-parser@1.4.6 : tạo cookie
npm i jsonwebtoken : convert gia tri cookie thành dang jwt

> ---- xem auth.controller.js cho khai báo sử dụng token

# ====== kết nối từ React client và Expressjs api

`+ Express.js`
npm i cors@2.8.5
tại app.js : viết ` 2 Middleware ``res.header(...) ` và `app.use(cors({...}))`

`+ React client side`
dùng axios gởi http request đến cho backend

===============
app -> post.route ->
-----> auth.route -> auth.controller
-----> test.route -> test.controller (check login và admin trước khi thưc hien các request khác?)
