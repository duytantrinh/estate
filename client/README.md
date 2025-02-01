# React, Vite, SASS, React router dom, React Widgets, React Quill, Zustand

npm i sass
npm install leaflet : for map

npm i axios : send HTTP reuqest from client to backend
npm i react-quill@2.0.0 : for text description
npm i dompurify@3.0.9 : di chung với react-quill đề dùng dangerouslySetInnerHTML tại SinglePage ( ko hien thi html ele ra ngoài UI )

npm i timeago.js@4.0.2 : hiển thị time cho chat box

npm i zustand@4.5.2 :

# React Router Dom(RRD)

1. dùng RRD thì các a đổi thành Link

# == dùng React Laeflet cho Map

npm install leaflet

tạo components/Map

# == Slider

xem components/Slider

# == tạo axios http request

1. lib/apiRequest
2. E.g: trang Login.jsx gọi const res = await apiRequest.post(...)

---------------> NavBar
App -> Layout -> HomePage
---------------> ListPage -> Filter
---------------------------> Card
---------------------------> Map -> SinglePage
---------------> profilePage -> NewPostPage
------------------------------> ProfileUpdatePage
---------------> SinglePage
---------------> Register
---------------> Login

> > xem file Layout.jsx và App.jsx cách chọn show những pages nào khi Login Và KHÔNG login

# ==== sau khi Login

1. 1. gởi request api đến `http://127.0.0.1:8800/api/auth/login`
2. tạo new cookie
3. lưu user Info ( trừ password) vào localStorage

# ======= Khi bấm logout trong ProfilePage

1. gởi request api đến `http://127.0.0.1:8800/api/auth/logout`
2. xóa cookie
3. xóa localStorage

# === tạo Context Api AuthContext.jsx để updateUser và show currentUSer cho toàn app

# ==== React Widget

vào https://console.cloudinary.com/settings/c-0d8a9fb0d8bc0aabb117a3a3fa46f2/upload/presets
tạo 1 cloud để upload photo
lấy đc tên cloud: `dhwc5hluu`
lấy đc tên project: `estate`

# ==== fetching data by React Router Dom

https://reactrouter.com/6.28.0/start/tutorial#loading-data

1. lib/loader.js tạo hàm singlePageLoader() đề gởi http request
2. tại App.js chèn loader: singlePageLoader, vào dưới element: <SinglePage />,
3. tại SinglePage.js gọi data đã request dc bằng `const post = useLoaderData()`

# tạo Filter tại UI

`tại client UI`

1. lib/loader.js -> viết listPageLoader() với gời ?query cho request
2. App.js : chèn loader: listPageLoader sau <ListPage/>
3. listPage.jsx : load data từ filter ra UI : const post = useLoaderData()

`tại api Express.js`

1. post.controller.js: tại getPosts() thêm diều kiện lọc where với tất cả các fields trong filter

# ==== saved post function

`tại api Express.js`

1.  schema.prisma
    tạo model Saved Post : relation with User và Post

2.  tại user.route.js
    tạo route : router.post("/save", verifyToken, savePost)

3.  tại user.controller.js
    tạo function savePost()

`tại client UI`
tại SinglePage.jsx : gọi api tại button Svae bằng handleSave()

# ===== socket.io : realtime events for chat box

- > > KHÔNG CẦN DÙNG ĐẾN DATABASE
- đưa tât cả evetns vào 1 pool và dùng listening event để đoc nó
- xem folder socket và Chat.jsx

# ==== Zustand : for notification (gần giống redux)

npm i zustand@4.5.2

1. tạo useNotificationStore cho zustand tại lib/notificationStore.js

- chứa các function action của zustand

( 2. tạo api Endpoint "/users/notification" )

- tại api/ user.route.js : tạo url
- tại api/ user.controller.js : tạo function getNotificationNumber()

2. tại client/... NavBar.jsx : gọi sử dụng các hàm trong store useNotificationStore()
