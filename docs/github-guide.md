---
title: "Hướng Dẫn Đưa Lên GitHub Pages (Miễn Phí 100%)"
---

# 🚀 Hướng Dẫn Đưa Trang Học Tập Lên GitHub Pages

Dự án này đã được cấu hình sẵn file tự động hóa `.github/workflows/deploy.yml`. Bạn chỉ cần làm **3 bước duy nhất** dưới đây là trang web sẽ chạy online tại địa chỉ `https://<ten-github-cua-ban>.github.io/<ten-repo>/` để bạn học trên cả máy tính lẫn điện thoại!

---

## Bước 1: Tạo Repository mới trên GitHub

1. Truy cập [https://github.com/new](https://github.com/new).
2. Đặt tên Repository (ví dụ: `electronic-devices-floyd`).
3. Chọn **Public** (để dùng GitHub Pages miễn phí) rồi bấm **Create repository**.

---

## Bước 2: Cấp quyền cho GitHub Actions triển khai GitHub Pages

1. Trong trang Repository vừa tạo trên GitHub, bấm vào tab **Settings** (biểu tượng bánh răng trên cùng).
2. Ở menu bên trái, bấm chọn mục **Pages**.
3. Tại phần **Build and deployment** $\rightarrow$ ô **Source**, đổi từ *Deploy from a branch* sang **`GitHub Actions`**.

---

## Bước 3: Đẩy code từ máy tính của bạn lên GitHub

Lưu ý nhỏ: Nếu tên Repository của bạn là `electronic-devices-floyd`, bạn mở file `docs/.vitepress/config.mts` và thêm dòng `base: '/electronic-devices-floyd/',` ngay dưới dòng `title`. Sau đó chạy các lệnh sau trong Terminal tại thư mục dự án:

```powershell
git init
git add .
git commit -m "Initialize interactive Electronic Devices Floyd study hub"
git branch -M main
git remote add origin https://github.com/<USERNAME_CUA_BAN>/electronic-devices-floyd.git
git push -u origin main
```

Ngay sau khi `git push`, GitHub Actions sẽ tự động build trang web trong khoảng **1 phút** và xuất bản lên mạng!
