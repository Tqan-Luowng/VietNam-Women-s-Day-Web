# 🌸 Món Quà Yêu Thương 20/10 — Đại Gia Đình
> **Một sản phẩm tâm huyết được thiết kế & phát triển bởi [Trung Quân](https://github.com/)**  
> *Dành tặng những người phụ nữ tuyệt vời nhất trong đại gia đình nhân Ngày Phụ nữ Việt Nam 20/10/2026.*

---

## 📖 Giới Thiệu Dự Án (Project Overview)

**Món Quà Yêu Thương 20/10** là ứng dụng web thiệp mừng đa phương tiện kết hợp công nghệ **3D Depth Carousel** và **Scroll-linked Hero Sequence** hiện đại. 

Khác với những tấm thiệp điện tử đơn điệu, trang web được xây dựng như một hành trình cảm xúc:
- Người xem mở cánh cửa bí mật bằng mật khẩu thân thuộc của gia đình (`2010`).
- Cuộn chuột để xem chiếc thiệp bay ra từ vòm hoa ngập tràn ánh nắng và sắc hồng dịu dàng.
- Ghé thăm trạm trưng bày 3D chiều sâu với những bức ảnh chân thực, danh hiệu đáng yêu và lời chúc riêng biệt gửi đến từng người phụ nữ thân yêu.
- Gửi lại những lời nhắn gửi, lời cảm ơn ngọt ngào vào hòm thư kỷ niệm.

---

## 👩‍👧‍👧 Danh Sách 11 Người Phụ Nữ Tuyệt Vời (Honored Members)

Bộ thẻ thiệp 3D được thiết kế riêng theo thứ tự trang trọng và đầm ấm:

| STT | Người Thương | Cách Gọi Thân Thương | Danh Hiệu Danh Dự (Badge) | Tông Màu Chủ Đạo |
| :---: | :--- | :--- | :--- | :---: |
| 1 | **Bà Ngoại** | Bà Ngoại kính yêu | 🏆 Cây Cao Bóng Cả & Trái Tim Vàng Của Gia Đình | Hổ phách `#D97706` |
| 2 | **Bá Phương** | Bá Phương kính mến | 🌹 Người Bá Chu Đáo & Đại Sứ Yêu Thương | Hồng cánh sen `#DB2777` |
| 3 | **Bá Phong** | Bá Phong kính quý | 💜 Người Bá Đôn Hậu & Điểm Tựa Ấm Áp | Tím trang nhã `#9333EA` |
| 4 | **Mẹ** | Mẹ yêu thương | 👑 Nữ Hoàng Du Lịch & Bếp Trưởng Trái Tim | Hồng ấm `#E8799A` |
| 5 | **Mợ Lan** | Mợ Lan thân thương | 📚 Nữ Thần Tri Thức & Tinh Hoa Bếp Ấm | San hô san sát `#FB7185` |
| 6 | **Mợ Chanh** | Mợ Lemon | 🍋 Nữ Hoàng Sắc Sảo & Đại Sứ Tiếng Cười | Ngọc bích tươi `#10B981` |
| 7 | **Chị Trang** | Chị Giáo Phong Cách | 🎓 Chị Giáo Tài Ba & Quý Cô Dịu Dàng | Hồng sen `#EC4899` |
| 8 | **Chị Ngọc** | Chị Ọc Duyên Dáng | 💃 Nàng Ọc Điệu Đà & Bông Hoa Tài Sắc | Mận thời thượng `#BB2E91` |
| 9 | **Chị Ánh** | Chị Cả Á | 🌟 Chị Đại Khéo Léo & Chị Cả Phong Cách | Xanh ngọc biển `#06B6D4` |
| 10 | **Bảo An** | Bảo An đáng yêu | 👶 Bảo An Thối Thối Đáng Yêu & Cục Cưng | Vàng mật ong `#F59E0B` |
| 11 | **Ngọc Anh** | Ngọc Anh ngọt ngào | 🎀 Công Chúa Dễ Thương & Nụ Cười Thiên Thần | Dâu tây rạng rỡ `#F43F5E` |

---

## ✨ Tính Năng Nổi Bật (Key Features)

- 🔒 **Cánh Cửa Mở Quà (Passcode Gate)**:
  - Giao diện hộp quà bí mật, yêu cầu nhập mật khẩu gia đình (`2010`) để mở thiệp.
  - Hiệu ứng rung lắc khi gõ sai, sticker nổi bồng bềnh và huy hiệu *Made by Trung Quân*.
- 🎬 **Hero Tương Tác Cuộn Chuột (Scroll-linked Motion)**:
  - Video/GIF tua tiến khi cuộn xuống và tua lùi khi cuộn ngược lại.
  - Tự động nhận diện thiết bị: định dạng video ngang 16:9 sắc nét trên máy tính, và tỷ lệ dọc tối ưu trên điện thoại.
- 🎴 **3D Depth Card Carousel (React Bits + GSAP)**:
  - Hệ thống thẻ 3D xếp lớp theo chiều sâu không gian (Z-axis, perspective 1350px, tilt 16 độ).
  - Tương tác kéo thả chuột (drag), cuộn bánh xe (wheel), vuốt cảm ứng trên di động hoặc bấm nút điều hướng.
  - Thẻ kích thước lớn (`400x560px`), viền bóng nổi 3D, nền dải màu kem hồng sang trọng.
- 🖼️ **Ảnh Chân Dung Thực Tế Của Từng Người**:
  - Tích hợp 11 bức ảnh chân thực từ gia đình với tỷ lệ chuẩn `object-cover object-top`, giữ trọn vẹn nụ cười rạng ngời.
  - Khung trưng bày đồng bộ (Showcase panel) hiển thị avatar ảnh thật kèm lời chúc và danh hiệu.
- 💌 **Hộp Thoại Thiệp Phóng To (Modal) & Pháo Hoa Giấy (Confetti)**:
  - Bấm **"Mở Thiệp Yêu Thương"** để mở modal toàn màn hình xem ảnh to và đọc lời nhắn chi tiết.
  - Bấm **"Gửi Trọn Yêu Thương ❤️"** kích hoạt hiệu ứng pháo hoa giấy rực rỡ nhiều màu.
- 🎶 **Hộp Nhạc Du Dương & Hiệu Ứng Cánh Hoa**:
  - Nhạc nền Web Audio API êm dịu, nhẹ nhàng, có nút bật/tắt tiện lợi ở góc màn hình.
  - Hiệu ứng phát hoa rơi / lấp lánh nở rộ tại mỗi điểm chạm hoặc click chuột.
- 📬 **Hòm Thư Kỷ Niệm (Guestbook / Reply Box)**:
  - Cho phép người thân nhập lời chúc, cảm nghĩ gửi lại cho Trung Quân và tự động lưu giữ trong `localStorage`.
- 🧭 **Mini-Map Navigation Rail**:
  - Thanh điều hướng thông minh bên mép phải, cho phép nhảy nhanh đến từng khu vực: *Hộp Quà*, *Lời Chúc Chung*, *Trạm Thẻ 3D*, *Hòm Thư*.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

| Công nghệ | Mục đích sử dụng |
| :--- | :--- |
| **React 19** | Thư viện giao diện chính, quản lý state và component |
| **TypeScript** | Đảm bảo tính chặt chẽ, type-safe cho dữ liệu 11 thành viên |
| **Vite 8** | Công cụ build siêu tốc, HMR cực nhanh |
| **Tailwind CSS 3** | Thiết kế hệ thống màu sắc HSL cao cấp, glassmorphism, responsive |
| **GSAP (GreenSock)** | Xử lý hoạt họa biến đổi 3D Depth Card Carousel mượt mà 60fps |
| **Framer Motion** | Xử lý hiệu ứng xuất hiện, chuyển cảnh modal và nút bấm |
| **Canvas Confetti** | Hiệu ứng pháo hoa giấy rực rỡ khi tương tác |
| **Lucide React** | Bộ icon vector thanh lịch, đồng bộ |
| **Google Fonts** | Bộ font tiếng Việt tuyệt đẹp: `Be Vietnam Pro`, `Dancing Script`, `Nunito` |

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Cục Bộ (Local Setup)

### Yêu cầu môi trường:
- Node.js (phiên bản 18 trở lên)
- Trình quản lý gói `npm` hoặc `pnpm` / `yarn`

### Các bước thực hiện:

1. **Clone hoặc tải mã nguồn**:
   ```bash
   git clone <URL_REPO_CUA_BAN>
   cd web2010
   ```

2. **Cài đặt các gói phụ thuộc**:
   ```bash
   npm install
   ```

3. **Khởi chạy môi trường phát triển (Dev Server)**:
   ```bash
   npm run dev
   ```
   Mở trình duyệt truy cập: `http://localhost:5173/` (Mật khẩu mở thiệp: `2010`).

4. **Đóng gói bản sản xuất (Production Build)**:
   ```bash
   npm run build
   ```
   Thư mục thành phẩm tối ưu sẽ được tạo tại `dist/`.

---

## 🌐 Hướng Dẫn Triển Khai Lên Mạng (Deployment)

### Cách 1: Netlify Drop (Đơn giản nhất, chỉ mất 30 giây)
1. Truy cập: [app.netlify.com/drop](https://app.netlify.com/drop) (đăng nhập bằng Google hoặc GitHub).
2. Kéo thả cả thư mục `dist` trong dự án vào vòng tròn tải lên.
3. Nhận ngay liên kết công khai miễn phí (dạng `https://ten-tuy-chon.netlify.app`) để gửi cho gia đình.

### Cách 2: Vercel CLI
1. Chạy lệnh:
   ```bash
   npx vercel
   ```
2. Làm theo hướng dẫn trên màn hình để liên kết tài khoản và deploy tự động.

---

## 📂 Cấu Trúc Thư Mục (Project Structure)

```text
web2010/
├── public/                     # Tài nguyên tĩnh công khai
│   ├── photos/                 # Ảnh chụp thực tế của 11 thành viên (JPG)
│   ├── pics/                   # Ảnh/GIF nền tương tác cho máy tính & điện thoại
│   ├── private/photos/         # File ảnh vector dự phòng (SVG)
│   └── favicon.svg             # Icon tab trình duyệt hình bông hoa đào 🌸
├── src/
│   ├── assets/                 # Sticker minh họa và icon
│   ├── components/             # Các component giao diện chính
│   │   ├── DepthCarousel/      # Component thẻ 3D xếp lớp (React Bits + GSAP)
│   │   ├── Gate.tsx            # Màn hình mở khóa hộp quà bí mật (Passcode)
│   │   ├── HeroSequence.tsx    # Hero cuộn video / ảnh thích ứng thiết bị
│   │   ├── MembersDepthSection.tsx # Trạm 3D trưng bày 11 thành viên + Modal
│   │   ├── AmbientBackground.tsx   # Hiệu ứng ánh sáng nền mờ ảo
│   │   ├── ClickSparkleEffect.tsx  # Hiệu ứng tia sáng lấp lánh khi click
│   │   └── navigation/         # Thanh điều hướng MiniMapNav
│   ├── data/
│   │   └── mockData.ts         # Dữ liệu 11 thành viên: lời chúc, danh hiệu, ảnh
│   ├── types/                  # Định nghĩa TypeScript interface
│   ├── App.tsx                 # Trang ứng dụng chính (Header, Letter, Carousel, Footer)
│   └── main.tsx                # Điểm khởi chạy React
├── package.json                # Cấu hình dự án & thư viện phụ thuộc
└── vite.config.ts              # Cấu hình Vite
```

---

## 💖 Tác Giả & Lời Tri Ân (Author & Credits)

- **Người tạo & Biên soạn**: **Trung Quân** (`Made with ❤️ by Trung Quân`)
- **Dành tặng**: Bà Ngoại, Bá Phương, Bá Phong, Mẹ, Mợ Lan, Mợ Chanh, Chị Trang, Chị Ngọc, Chị Ánh, Bảo An, Ngọc Anh cùng toàn thể những người phụ nữ yêu quý trong gia đình.
- **Lời chúc**: *Chúc một nửa dịu dàng của thế giới luôn rạng ngời, dồi dào sức khỏe, an yên và ngập tràn hạnh phúc mỗi ngày! 🌸*
